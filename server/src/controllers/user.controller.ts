import { matchedData } from "express-validator";
import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";
import { authCookieOptions } from "../config/cookieOptions";
import { emailVerificationMail } from "../config/nodemailer";
import asyncWrapper from "../helpers/asyncWrapper";
import loadEnv from "../helpers/loadEnv";
import { verifyToken } from "../helpers/token";
import * as userPermission from "../permissions/user";
import * as userService from "../services/user.service";
import { EmailVerificationPayload } from "../types/common.type";

// get all users
export const getUsers = asyncWrapper(async (req, res) => {
  let users = await userService.getAll().populate("profile");

  users = users.map((user) => user.toObject({ virtuals: true }));

  res.status(200).json({ results: users, count: users.length });
});

// get a single user
export const getUser = asyncWrapper(async (req, res) => {
  const { user_id } = req.params;

  const user = await userService
    .getOneByProperty("_id", user_id)
    .populate("profile");

  if (!user) throw createHttpError(404, "Requested user not found");

  if (!userPermission.canGet(req.user, user))
    throw createHttpError(401, "You don't have access to this resource");

  return res.status(200).json({ results: user.toObject({ virtuals: true }) });
});

// create a user
export const postUser = asyncWrapper(async (req, res) => {
  if (!userPermission.canCreate(req.user))
    throw createHttpError(401, "You don't have access to create this resource");

  const { email, password, username, role } = matchedData(req);

  if (!email || !password || !username)
    throw createHttpError(400, "Please provide valid input");

  const user = await userService.create({
    email,
    password,
    username,
    role: userPermission.canChangeRole(req.user) ? role : "USER",
  });

  return res
    .status(201)
    .json({ results: { email: user.email, username: user.username } });
});

// update a user
export const patchUser = asyncWrapper(async (req, res) => {
  const { user_id } = req.params;
  const { email, username } = matchedData(req);

  let user = await userService.getOneByProperty("_id", user_id);
  if (!user) throw createHttpError(404, "Requested user not found");

  if (!userPermission.canUpdate(req.user, user))
    throw createHttpError(401, "You don't have access to update this resource");

  if (!email && !username)
    throw createHttpError(400, "You have to update at least one property");

  const updates: Record<string, any> = {};
  if (email) updates.email = email;
  if (username) updates.username = username;

  // update user
  user = await userService.updateById(user_id, updates);

  return res.status(200).json({ results: user.toObject() });
});

// delete a user
export const deleteUser = asyncWrapper(async (req, res) => {
  const { user_id } = req.params;

  let user = await userService.getOneByProperty("_id", user_id);
  if (!user) throw createHttpError(404, "requested user not found");

  if (!userPermission.canDelete(req.user, user))
    throw createHttpError(
      401,
      "You don't have any access to Delete this resource"
    );

  user = await userService.deleteById(user_id);

  return res.status(200).json({ results: user_id });
});

// ban a user
export const putBanUser = asyncWrapper(async (req, res) => {
  const { user_id } = req.params;

  if (!userPermission.canChangeStatus(req.user, user_id))
    throw createHttpError(
      400,
      "You don't have the permission to perform this task"
    );

  let user = await userService.getOneByProperty("_id", user_id);
  if (!user) throw createHttpError(404, "Requested user not found");

  // update user
  user = await userService.updateById(user_id, { status: "BANNED" });

  return res.status(200).json({ results: user.toObject() });
});

// unban a user
export const putUnbanUser = asyncWrapper(async (req, res) => {
  const { user_id } = req.params;

  if (!userPermission.canChangeStatus(req.user, user_id))
    throw createHttpError(
      400,
      "You don't have the permission to perform this task"
    );

  let user = await userService.getOneByProperty("_id", user_id);
  if (!user) throw createHttpError(404, "Requested user not found");

  // update user
  user = await userService.updateById(user_id, { status: "ACTIVE" });

  return res.status(200).json({ results: user.toObject() });
});

// change user role
export const putUserRole = asyncWrapper(async (req, res) => {
  const { user_id } = req.params;
  const { role } = matchedData(req);

  let user = await userService.getOneByProperty("_id", user_id);
  if (!user) throw createHttpError(404, "Requested user not found");

  // update user
  user = await userService.updateById(user_id, { role });

  return res.status(200).json({ results: user.toObject() });
});

// change user password
export const putPassword = asyncWrapper(async (req, res) => {
  const { id } = req.user;
  const { old_password, new_password } = matchedData(req);

  let user = await userService.getOneByProperty("_id", id).select("password");
  if (!user) throw createHttpError(404, "Requested user not found");
  const passwordMatched = await user.comparePassword(old_password);

  if (!passwordMatched) throw createHttpError(401, "Old password not matched");

  // update user
  const updatedUser = await userService
    .updateById(id, { password: new_password })
    .select({ password: 1 });

  // generate new token for updated password
  const { payload, token } = await updatedUser.generateRefreshToken();

  // set updated token in cookies
  res.cookie("token", token, { ...authCookieOptions, httpOnly: true });
  res.cookie("logged_in", true, authCookieOptions);

  return res.status(201).json({ token, payload });
});

// change user username
export const putUsername = asyncWrapper(async (req, res) => {
  const { id } = req.user;
  const { username, password } = matchedData(req);

  let user = await userService.getOneByProperty("_id", id).select("password");
  if (!user) throw createHttpError(404, "Requested user not found");
  const passwordMatched = await user.comparePassword(password);

  if (!passwordMatched) throw createHttpError(401, "Password not matched");

  // update user
  await userService.updateById(id, { username });

  return res.status(202).json({
    results: {
      username,
    },
  });
});

// verify a user email
export const postEmailVerification = asyncWrapper(async (req, res) => {
  const { token } = matchedData(req);

  // verify the token
  const payload = verifyToken(token) as EmailVerificationPayload | null;

  // check payload has a valid object id or not
  if (!payload?.id || !isValidObjectId(payload.id) || payload.id != req.user.id)
    throw createHttpError(400, "Invalid token!");

  // check for the user
  const user = await userService.getOneByProperty("_id", payload.id);
  if (!user) throw createHttpError(404, "User not exists!");

  if (user.email !== payload.email)
    throw createHttpError(400, "Invalid token!");

  // check email already verified or not
  if (user.emailVerified) throw createHttpError(400, "Email already verified");

  // update email verification status
  user.emailVerified = true;
  await user.save();

  return res.status(200).json({ results: { user } });
});

// request for a email verification token
export const getEmailVerification = asyncWrapper(async (req, res) => {
  let user = await userService.getOneByProperty("email", req.user.email);
  if (!user) throw createHttpError(404, "Requested user not found");

  const { token, payload } = user.generateEmailVerificationToken();
  const requestURL = `${loadEnv.EMAIL_VERFICATION_URL}?token=${token}`;

  // send mail to the user
  const response = await emailVerificationMail(
    user.email,
    user.username,
    requestURL
  );

  if (response.rejected.includes(req.user.email))
    throw createHttpError(500, "Cannot send the email verification mail.");

  return res.status(200).json({
    results: {
      payload,
      mailSent: true,
    },
  });
});

// change user verified status
export const putVerifiedStatus = asyncWrapper(async (req, res) => {
  const { user_id } = req.params;
  const { verified_status } = matchedData(req);

  let user = await userService.getOneByProperty("_id", user_id);
  if (!user) throw createHttpError(404, "Requested user not found");

  if (user.verifiedStatus !== verified_status) {
    // update user verified status
    user.verifiedStatus = verified_status;
    await user.save();
  }

  return res.status(200).json({ results: user.toObject() });
});
