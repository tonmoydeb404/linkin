import { matchedData } from "express-validator";
import createHttpError from "http-errors";
import { authCookieOptions } from "../config/cookieOptions";
import { connection } from "../db/connectDB";
import asyncWrapper from "../helpers/asyncWrapper";
import * as userPermission from "../permissions/user";
import * as layoutService from "../services/layout.service";
import * as linkService from "../services/link.service";
import * as profileService from "../services/profile.service";
import * as socialService from "../services/social.service";
import * as userService from "../services/user.service";

// get all users
export const getUsers = asyncWrapper(async (req, res) => {
  let users = await userService.getAll().populate("profile");

  users = users.map((user) => user.toObject({ virtuals: true }));

  res.status(200).json({ result: users, count: users.length });
});

// get a single user
export const getUser = asyncWrapper(async (req, res) => {
  const { user_id } = req.params;

  const user = await userService
    .getByProperty("_id", user_id)
    .populate("profile");

  if (!user) throw createHttpError(404, "Requested user not found");

  if (!userPermission.canGet(req.user, user))
    throw createHttpError(401, "You don't have access to this resource");

  return res.status(200).json({ result: user.toObject({ virtuals: true }) });
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

  return res.status(201).json({ result: user.toObject() });
});

// update a user
export const patchUser = asyncWrapper(async (req, res) => {
  const { user_id } = req.params;
  const { email, username } = matchedData(req);

  let user = await userService.getByProperty("_id", user_id);
  if (!user) throw createHttpError(404, "Requested user not found");

  if (!userPermission.canUpdate(req.user, user))
    throw createHttpError(401, "You don't have access to update this resource");

  if (!email && !username)
    throw createHttpError(400, "You have to update at least one property");

  if (email) user.email = email;
  if (username) user.username = username;

  // update user
  await user.save();

  return res.status(200).json({ result: user.toObject() });
});

// delete a user
export const deleteUser = asyncWrapper(async (req, res) => {
  const session = await connection.startSession();
  try {
    session.startTransaction();

    const { id: user_id } = req.user;

    let user = await userService.getByProperty("_id", user_id).session(session);
    if (!user) throw createHttpError(404, "requested user not found");

    // delete all links
    await linkService.deleteAllByProperty("user", user_id).session(session);
    // delete all social links
    await socialService.deleteAllByProperty("user", user_id).session(session);
    // delete profile
    await profileService.deleteByProperty("user", user_id).session(session);
    // delete layout
    await layoutService.deleteByProperty("user", user_id).session(session);

    // delete user
    await user.deleteOne({ session });

    await session.commitTransaction();

    res.status(200).json({ result: user_id });
  } catch (error) {
    console.log(error);
    // undo all actions
    await session.abortTransaction();
    throw createHttpError(500, "Cannot delete user account");
  } finally {
    session.endSession();
  }
});

// ban a user
export const putBanUser = asyncWrapper(async (req, res) => {
  const { user_id } = req.params;

  if (!userPermission.canChangeStatus(req.user, user_id))
    throw createHttpError(
      400,
      "You don't have the permission to perform this task"
    );

  let user = await userService.getByProperty("_id", user_id);
  if (!user) throw createHttpError(404, "Requested user not found");

  // ban user
  user.status = "BANNED";
  await user.save();

  return res.status(200).json({ result: user.toObject() });
});

// unban a user
export const putUnbanUser = asyncWrapper(async (req, res) => {
  const { user_id } = req.params;

  if (!userPermission.canChangeStatus(req.user, user_id))
    throw createHttpError(
      400,
      "You don't have the permission to perform this task"
    );

  let user = await userService.getByProperty("_id", user_id);
  if (!user) throw createHttpError(404, "Requested user not found");

  // unban user
  user.status = "ACTIVE";
  await user.save();

  return res.status(200).json({ result: user.toObject() });
});

// change user role
export const putUserRole = asyncWrapper(async (req, res) => {
  const { user_id } = req.params;
  const { role } = matchedData(req);

  let user = await userService.getByProperty("_id", user_id);
  if (!user) throw createHttpError(404, "Requested user not found");

  // update user role
  user.role = role;
  await user.save();

  return res.status(200).json({ result: user.toObject() });
});

// change user password
export const putPassword = asyncWrapper(async (req, res) => {
  const { id } = req.user;
  const { old_password, new_password } = matchedData(req);

  let user = await userService.getByProperty("_id", id).select("password");
  if (!user) throw createHttpError(404, "Requested user not found");
  const passwordMatched = await user.comparePassword(old_password);

  if (!passwordMatched) throw createHttpError(401, "Old password not matched");

  // update user password
  user.password = new_password;
  await user.save();

  // generate new token for updated password
  const { payload, token } = await user.generateRefreshToken();

  // set updated token in cookies
  res.cookie("token", token, { ...authCookieOptions, httpOnly: true });
  res.cookie("logged_in", true, authCookieOptions);

  return res.status(201).json({ result: { token, payload } });
});

// change user username
export const putUsername = asyncWrapper(async (req, res) => {
  const { id } = req.user;
  const { username, password } = matchedData(req);

  let user = await userService.getByProperty("_id", id).select("password");
  if (!user) throw createHttpError(404, "Requested user not found");
  const passwordMatched = await user.comparePassword(password);

  if (!passwordMatched) throw createHttpError(401, "Password not matched");

  // update user username
  user.username = username;
  await user.save();

  return res.status(202).json({ result: user.toObject() });
});

// change user verified status
export const putVerifiedStatus = asyncWrapper(async (req, res) => {
  const { user_id } = req.params;
  const { verified_status } = matchedData(req);

  let user = await userService.getByProperty("_id", user_id);
  if (!user) throw createHttpError(404, "Requested user not found");

  if (user.verifiedStatus !== verified_status) {
    // update user verified status
    user.verifiedStatus = verified_status;
    await user.save();
  }

  return res.status(200).json({ result: user.toObject() });
});
