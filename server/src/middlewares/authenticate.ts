import createHttpError from "http-errors";
import asyncWrapper from "../helpers/asyncWrapper";
import { verifyPayloadObject, verifyToken } from "../helpers/token";
import { IUserToken } from "../types/user.type";

const authenticate = asyncWrapper(async (req, _res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer "))
    throw createHttpError(401, "Authentication failed");

  const token = authorization.split(" ")[1];
  try {
    const payload = verifyToken(token);
    // verify that token have all properties
    if (
      !verifyPayloadObject<IUserToken>(payload, ["username", "roles", "email"])
    )
      throw new Error();
    req.user = payload as IUserToken;
    next();
  } catch (error) {
    next(createHttpError(401, "Authentication Failed"));
  }
});

export default authenticate;
