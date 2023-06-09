import { matchedData } from "express-validator";
import createHttpError from "http-errors";
import asyncWrapper from "../helpers/asyncWrapper";
import * as authService from "../services/auth";

export const postRegister = asyncWrapper(async (req, res) => {
  const { firstName, lastName, email, password, username } = matchedData(req);

  if (!email || !password || !username || !firstName || !lastName)
    throw createHttpError(400, "Please provide valid input");

  const { token, payload } = await authService.register({
    email,
    password,
    username,
    firstName,
    lastName,
  });

  res.cookie("token", token, { httpOnly: true });
  res.cookie("logged_in", true, { httpOnly: false });

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

  res.cookie("token", token, { httpOnly: true });
  res.cookie("logged_in", true, { httpOnly: false });

  return res.status(200).json({ token, payload });
});

export const getRefresh = asyncWrapper(async (req, res) => {
  return res.status(200).json({ payload: req.user });
});

export const getLogout = asyncWrapper(async (req, res) => {
  res.clearCookie("token");
  res.cookie("logged_in", false, { httpOnly: false });

  return res.sendStatus(200);
});
