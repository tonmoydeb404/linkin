import createHttpError from "http-errors";
import asyncWrapper from "../helpers/asyncWrapper";
import { getToken, verifyToken } from "../helpers/token";
import * as authService from "../services/auth";
import { AuthPayload } from "../types/auth.type";

const authenticate = asyncWrapper(async (req, _res, next) => {
  let token = getToken(req);

  if (!token) throw createHttpError(401, "Authentication failed");

  try {
    const payload = verifyToken(token);
    if (typeof payload === "string") throw new Error("Invalid payload");

    const userPayload: AuthPayload = await authService.getAuthPayload(
      payload.id
    );

    req.user = userPayload;
    next();
  } catch (error) {
    next(createHttpError(401, "Authentication Failed"));
  }
});

export default authenticate;
