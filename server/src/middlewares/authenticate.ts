import createHttpError from "http-errors";
import asyncWrapper from "../helpers/asyncWrapper";
import { verifyPayloadObject, verifyToken } from "../helpers/token";
import { AuthPayload } from "../types/auth.type";

const authenticate = asyncWrapper(async (req, _res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer "))
    throw createHttpError(401, "Authentication failed");

  const token = authorization.split(" ")[1];
  try {
    const payload = verifyToken(token);
    const isValidPayload = verifyPayloadObject<AuthPayload>(payload, [
      "username",
      "roles",
      "email",
    ]);
    // verify that token have all properties
    if (!isValidPayload) throw new Error("Invalid payload");
    req.user = payload as AuthPayload;
    next();
  } catch (error) {
    next(createHttpError(401, "Authentication Failed"));
  }
});

export default authenticate;
