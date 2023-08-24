import { matchedData } from "express-validator";
import createHttpError from "http-errors";
import { authCookieOptions } from "../config/cookieOptions";
import { passwordResetMail } from "../config/nodemailer";
import asyncWrapper from "../helpers/asyncWrapper";
import loadEnv from "../helpers/loadEnv";
import * as authService from "../services/auth";
import * as userService from "../services/user";

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

  res.cookie("token", token, { ...authCookieOptions, httpOnly: true });
  res.cookie("logged_in", true, authCookieOptions);

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

  res.cookie("token", token, { ...authCookieOptions, httpOnly: true });
  res.cookie("logged_in", true, authCookieOptions);

  return res.status(200).json({ token, payload });
});

export const getRefresh = asyncWrapper(async (req, res) => {
  const user = await userService
    .getUserByProperty("_id", req.user.id)
    .select("password");
  const { token, payload } = await user.generateRefreshToken();
  res.cookie("token", token, { ...authCookieOptions, httpOnly: true });
  res.cookie("logged_in", true, authCookieOptions);

  return res.status(200).json({ token, payload });
});

export const getLogout = asyncWrapper(async (req, res) => {
  res.clearCookie("token");
  res.cookie("logged_in", false, authCookieOptions);

  return res.sendStatus(200);
});

// request for password reset
export const postPasswordResetRequest = asyncWrapper(async (req, res) => {
  const { email } = matchedData(req);

  let user = await userService.getUserByProperty("email", email);
  if (!user) throw createHttpError(404, "Requested user not found");

  const token = user.generatePasswordResetToken();
  const requestURL = `${loadEnv.PASSWORD_RESET_URL}?token=${token}`;

  // send mail to the user
  const response = await passwordResetMail(
    user.email,
    user.username,
    requestURL
  );

  return res.status(200).json({
    results: {
      payload: user.id,
      mailResponse: {
        accepted: response.accepted,
        rejected: response.rejected,
      },
    },
  });
});
// reset password
export const postPasswordReset = asyncWrapper(async (req, res) => {
  const { password } = matchedData(req);

  let user = await userService.updateUserById(req.body.id, {
    password: password,
  });

  return res.status(200).json({ results: { user } });
});
