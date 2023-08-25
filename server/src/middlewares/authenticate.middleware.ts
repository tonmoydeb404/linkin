import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";
import asyncWrapper from "../helpers/asyncWrapper";
import { getToken, getTokenValue, verifyToken } from "../helpers/token";
import * as authService from "../services/auth.service";
import * as userService from "../services/user.service";
import { AuthPayload } from "../types/auth.type";

const authenticate = asyncWrapper(async (req, _res, next) => {
  let token = getToken(req);

  if (!token) throw createHttpError(401, "Authentication failed");

  try {
    let payload = getTokenValue(token) as AuthPayload | null;
    if (!payload?.id || !isValidObjectId(payload?.id))
      throw new Error("Invalid payload");

    // get user
    const user = await userService
      .getOneByProperty("_id", payload.id)
      .select("+password");
    // check user exist or not
    if (!user) throw new Error("User account not found");

    // validate this token
    payload = verifyToken(token, user.password) as AuthPayload | null;
    if (!payload) throw new Error("Invalid token");

    // get latest auth payload
    const userPayload = await authService.getAuthPayload(user.id);

    // check user banned or not
    if (userPayload.status === "BANNED") throw new Error("Account is banned!");

    req.user = userPayload;
    next();
  } catch (error) {
    console.log(error);
    next(createHttpError(401, "Authentication Failed"));
  }
});

export default authenticate;
