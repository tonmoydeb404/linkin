import { matchedData } from "express-validator";
import createHttpError from "http-errors";
import asyncWrapper from "../helpers/asyncWrapper";
import * as userPermission from "../permissions/user";
import * as userService from "../services/user";

export const getUsers = asyncWrapper(async (req, res) => {
  const users = await userService.getAllUsers();

  if (!userPermission.canGetAll(req.user))
    throw createHttpError(401, "You don't have access to this resource");

  res.status(200).json({ results: users, count: users.length });
});

export const getUser = asyncWrapper(async (req, res) => {
  const { user_id } = req.params;

  const user = await userService.getUserByProperty("_id", user_id);
  if (!user) throw createHttpError(404, "Requested user not found");

  if (!userPermission.canGet(req.user, user))
    throw createHttpError(401, "You don't have access to this resource");

  return res.status(200).json({ results: user.toObject() });
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
    role,
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
