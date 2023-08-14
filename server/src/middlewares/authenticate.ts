import createHttpError from "http-errors";
import asyncWrapper from "../helpers/asyncWrapper";
import { getToken, verifyToken } from "../helpers/token";
import * as authService from "../services/auth";
import { AuthPayload } from "../types/auth.type";

const authenticate = asyncWrapper(async (req, _res, next) => {
  let token = getToken(req);

  if (!token) throw createHttpError(401, "Authentication failed");

  try {
    // validate this token
    const payload = verifyToken(token);
    if (typeof payload === "string") throw new Error("Invalid payload");

    // refresh payload from database
    const userPayload: AuthPayload = await authService.getAuthPayload(
      payload.id
    );

    // check user banned or not
    if (userPayload.status === "BANNED")
      throw createHttpError(410, "Account is banned!");

    req.user = userPayload;
    next();
  } catch (error) {
    next(createHttpError(401, "Authentication Failed"));
  }
});

export default authenticate;
