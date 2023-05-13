import createHttpError from "http-errors";
import asyncWrapper from "../helpers/asyncWrapper";
import userService from "../services/user";

export const getUsers = asyncWrapper(async (_req, res) => {
  const users = await userService.getAllUsers();

  res.status(200).json({ users, count: users.length });
});

export const getUser = asyncWrapper(async (req, res) => {
  const { user_id } = req.params;

  const user = await userService.getUserById(user_id);

  if (!user) throw createHttpError(404, "requested user not found");

  return res.status(200).json({ user: user.toObject() });
});

export const postUser = asyncWrapper(async (req, res) => {
  const { email, password, username, roles } = req.body;

  if (!email || !password || !username)
    throw createHttpError(400, "please provide valid input");

  const user = await userService.createUser({
    email,
    password,
    username,
    roles,
  });

  return res
    .status(201)
    .json({ user: { email: user.email, username: user.username } });
});

export const patchUser = asyncWrapper(async (req, res) => {
  const { user_id } = req.params;
  const { email, username, roles } = req.body;
  if (!email && !username && !roles)
    throw createHttpError(400, "you have to update at least one property");

  // update user
  const user = await userService.updateUserById(user_id, {
    email,
    username,
    roles,
  });

  return res.status(200).json({ user: user.toObject() });
});

export const deleteUser = asyncWrapper(async (req, res) => {
  const { user_id } = req.params;
  await userService.deleteUserById(user_id);
  return res.status(200).json({ userId: user_id });
});
