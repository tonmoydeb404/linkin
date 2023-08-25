import { matchedData } from "express-validator";
import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";
import { authCookieOptions } from "../config/cookieOptions";
import { passwordResetMail } from "../config/nodemailer";
import asyncWrapper from "../helpers/asyncWrapper";
import loadEnv from "../helpers/loadEnv";
import { getTokenValue, verifyToken } from "../helpers/token";
import * as authService from "../services/auth.service";
import * as userService from "../services/user.service";
import { PasswordResetPayload } from "../types/common.type";
import { UserResponse } from "../types/user.type";

// create a new account
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

// login using existing account
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

// get a refresh token
export const getRefresh = asyncWrapper(async (req, res) => {
  const user = await userService
    .getOneByProperty("_id", req.user.id)
    .select("password");
  const { token, payload } = await user.generateRefreshToken();
  res.cookie("token", token, { ...authCookieOptions, httpOnly: true });
  res.cookie("logged_in", true, authCookieOptions);

  return res.status(200).json({ token, payload });
});

// logout user account
export const getLogout = asyncWrapper(async (req, res) => {
  res.clearCookie("token");
  res.cookie("logged_in", false, authCookieOptions);

  return res.sendStatus(200);
});

// request for password reset
export const postPasswordResetRequest = asyncWrapper(async (req, res) => {
  const { email } = matchedData(req);

  let user = await userService
    .getOneByProperty("email", email)
    .select("+password");
  if (!user) throw createHttpError(404, "Requested user not found");

  const { token, payload } = user.generatePasswordResetToken();
  const requestURL = `${loadEnv.PASSWORD_RESET_URL}?token=${token}`;

  // send mail to the user
  const response = await passwordResetMail(
    user.email,
    user.username,
    requestURL
  );

  // check email sent or not
  if (response.rejected.includes(user.email))
    throw createHttpError(500, "Cannot send the email verification mail.");

  return res.status(200).json({
    results: {
      payload: payload,
      mailSent: true,
    },
  });
});

// reset password
export const postPasswordReset = asyncWrapper(async (req, res) => {
  const { password, token } = matchedData(req);

  // get token data with out any validation
  let payload = getTokenValue(token) as PasswordResetPayload | null;
  // check payload has a valid object id or not
  if (!payload?.id || !isValidObjectId(payload?.id))
    throw createHttpError(400, "Invalid token");

  // get user
  const user = await userService
    .getOneByProperty("_id", payload.id)
    .select("+password");
  // check user exist or not
  if (!user) throw createHttpError(400, "User account not found");

  // validate the token
  payload = verifyToken(token, user.password) as PasswordResetPayload | null;
  // check valid token or not
  if (!payload) throw createHttpError(400, "Invalid token!");

  user.password = password;
  await user.save();

  // prepare user response object
  const uResponse: UserResponse = {
    _id: user.id,
    email: user.email,
    emailVerified: user.emailVerified,
    role: user.role,
    status: user.status,
    username: user.username,
  };

  return res.status(200).json({ results: { user: uResponse } });
});
