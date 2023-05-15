import createHttpError from "http-errors";
import asyncWrapper from "../helpers/asyncWrapper";
import * as authService from "../services/auth";

export const postRegister = asyncWrapper(async (req, res) => {
  const { firstName, lastName, email, password, username } = req.body;

  if (!email || !password || !username || !firstName || !lastName)
    throw createHttpError(400, "Please provide valid input");

  const { token, payload } = await authService.register({
    email,
    password,
    username,
    firstName,
    lastName,
  });

  return res.status(201).json({ payload, token });
});

export const postLogin = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw createHttpError(400, "email and password is required");

  const { payload, token } = await authService.loginWithEmail({
    email,
    password,
  });

  return res.status(200).json({ token, payload });
});
