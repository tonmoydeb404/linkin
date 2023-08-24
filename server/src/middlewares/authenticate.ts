import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";
import asyncWrapper from "../helpers/asyncWrapper";
import { getToken, getTokenValue, verifyToken } from "../helpers/token";
import * as authService from "../services/auth";
import * as userService from "../services/user";

const authenticate = asyncWrapper(async (req, _res, next) => {
  let token = getToken(req);

  if (!token) throw createHttpError(401, "Authentication failed");

  try {
    let payload = getTokenValue(token);
    if (typeof payload === "string" || !isValidObjectId(payload?.id))
      throw new Error("Invalid payload");

    // get user
    const user = await userService
      .getUserByProperty("_id", payload.id)
      .select("password");
    // check user exist or not
    if (!user) throw createHttpError(401, "User account not found");

    console.log({ token, pass: user.password });

    // validate this token
    payload = verifyToken(token, user.password);

    // get auth payload
    const userPayload = await authService.getAuthPayload(user.id);
    // check user banned or not
    if (userPayload.status === "BANNED")
      throw createHttpError(410, "Account is banned!");

    req.user = userPayload;
    next();
  } catch (error) {
    console.log(error);

    next(createHttpError(401, "Authentication Failed"));
  }
});

export default authenticate;
