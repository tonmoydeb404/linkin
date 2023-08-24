import { matchedData } from "express-validator";
import createHttpError from "http-errors";
import { authCookieOptions } from "../config/cookieOptions";
import asyncWrapper from "../helpers/asyncWrapper";
import * as userPermission from "../permissions/user";
import * as userService from "../services/user";

export const getUsers = asyncWrapper(async (req, res) => {
  let users = await userService.getAllUsers().populate("profile");

  users = users.map((user) => user.toObject({ virtuals: true }));

  res.status(200).json({ results: users, count: users.length });
});

export const getUser = asyncWrapper(async (req, res) => {
  const { user_id } = req.params;

  const user = await userService
    .getUserByProperty("_id", user_id)
    .populate("profile");

  if (!user) throw createHttpError(404, "Requested user not found");

  if (!userPermission.canGet(req.user, user))
    throw createHttpError(401, "You don't have access to this resource");

  return res.status(200).json({ results: user.toObject({ virtuals: true }) });
});

export const postUser = asyncWrapper(async (req, res) => {
  if (!userPermission.canCreate(req.user))
    throw createHttpError(401, "You don't have access to create this resource");

  const { email, password, username, role } = matchedData(req);

  if (!email || !password || !username)
    throw createHttpError(400, "Please provide valid input");

  const user = await userService.createUser({
    email,
    password,
    username,
    role: userPermission.canChangeRole(req.user) ? role : "USER",
  });

  return res
    .status(201)
    .json({ results: { email: user.email, username: user.username } });
});

export const patchUser = asyncWrapper(async (req, res) => {
  const { user_id } = req.params;
  const { email, username } = matchedData(req);

  let user = await userService.getUserByProperty("_id", user_id);
  if (!user) throw createHttpError(404, "Requested user not found");

  if (!userPermission.canUpdate(req.user, user))
    throw createHttpError(401, "You don't have access to update this resource");

  if (!email && !username)
    throw createHttpError(400, "You have to update at least one property");

  const updates: Record<string, any> = {};
  if (email) updates.email = email;
  if (username) updates.username = username;

  // update user
  user = await userService.updateUserById(user_id, updates);

  return res.status(200).json({ results: user.toObject() });
});

export const deleteUser = asyncWrapper(async (req, res) => {
  const { user_id } = req.params;

  let user = await userService.getUserByProperty("_id", user_id);
  if (!user) throw createHttpError(404, "requested user not found");

  if (!userPermission.canDelete(req.user, user))
    throw createHttpError(
      401,
      "You don't have any access to Delete this resource"
    );

  user = await userService.deleteUserById(user_id);

  return res.status(200).json({ results: user_id });
});

export const putBanUser = asyncWrapper(async (req, res) => {
  const { user_id } = req.params;

  if (!userPermission.canChangeStatus(req.user, user_id))
    throw createHttpError(
      400,
      "You don't have the permission to perform this task"
    );

  let user = await userService.getUserByProperty("_id", user_id);
  if (!user) throw createHttpError(404, "Requested user not found");

  // update user
  user = await userService.updateUserById(user_id, { status: "BANNED" });

  return res.status(200).json({ results: user.toObject() });
});

export const putUnbanUser = asyncWrapper(async (req, res) => {
  const { user_id } = req.params;

  if (!userPermission.canChangeStatus(req.user, user_id))
    throw createHttpError(
      400,
      "You don't have the permission to perform this task"
    );

  let user = await userService.getUserByProperty("_id", user_id);
  if (!user) throw createHttpError(404, "Requested user not found");

  // update user
  user = await userService.updateUserById(user_id, { status: "ACTIVE" });

  return res.status(200).json({ results: user.toObject() });
});

export const putUserRole = asyncWrapper(async (req, res) => {
  const { user_id } = req.params;
  const { role } = matchedData(req);

  let user = await userService.getUserByProperty("_id", user_id);
  if (!user) throw createHttpError(404, "Requested user not found");

  // update user
  user = await userService.updateUserById(user_id, { role });

  return res.status(200).json({ results: user.toObject() });
});

// change user password
export const putPassword = asyncWrapper(async (req, res) => {
  const { id } = req.user;
  const { old_password, new_password } = matchedData(req);

  let user = await userService.getUserByProperty("_id", id).select("password");
  if (!user) throw createHttpError(404, "Requested user not found");
  const passwordMatched = await user.comparePassword(old_password);

  if (!passwordMatched) throw createHttpError(401, "Old password not matched");

  // update user
  const updatedUser = await userService
    .updateUserById(id, { password: new_password })
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

  let user = await userService.getUserByProperty("_id", id).select("password");
  if (!user) throw createHttpError(404, "Requested user not found");
  const passwordMatched = await user.comparePassword(password);

  if (!passwordMatched) throw createHttpError(401, "Password not matched");

  // update user
  await userService.updateUserById(id, { username });

  return res.status(202).json({
    results: {
      username,
    },
  });
});
