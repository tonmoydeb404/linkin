import createHttpError from "http-errors";
import asyncWrapper from "../helpers/asyncWrapper";
import * as authService from "../services/auth";
import userService from "../services/user";

export const postRegister = asyncWrapper(async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username)
    throw createHttpError(400, "please provide valid input");

  const user = await userService.createUser({
    email,
    password,
    username,
  });
  const token = await user.generateToken();

  return res
    .status(201)
    .json({ user: { email: user.email, username: user.username }, token });
});

export const postLogin = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw createHttpError(400, "email and password is required");

  const user = await authService.loginWithEmail({ email, password });
  const token = await user.generateToken();

  return res
    .status(200)
    .json({ user: { email: user.email, username: user.username }, token });
});
