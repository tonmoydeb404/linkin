import { Request } from "express";
import { JwtPayload, decode, sign, verify } from "jsonwebtoken";
import loadEnv from "./loadEnv";

export const generateToken = (
  payload: string | object,
  expire: string | number,
  additonalSecret: string | undefined = ""
) => {
  let secret = loadEnv.JWT_SECRET;
  if (additonalSecret && additonalSecret.length) secret += additonalSecret;
  return sign(payload, secret, { expiresIn: expire });
};

export const verifyToken = (
  token: string,
  additonalSecret: string | undefined = ""
): JwtPayload | string | null => {
  try {
    let secret = loadEnv.JWT_SECRET;
    if (additonalSecret && additonalSecret.length) secret += additonalSecret;
    const payload = verify(token, secret);
    return payload;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const getTokenValue = (token: string) => decode(token);

export const verifyPayloadObject = <T>(
  payload: string | JwtPayload,
  keys: (keyof T)[]
) => {
  if (typeof payload === "string") return false;

  const objKeys = Object.keys(payload);

  return keys.every((key) => objKeys.includes(key as string));
};

export const getToken = (req: Request) => {
  const { authorization } = req.headers;
  const { token } = req.cookies;

  if (token) return token;
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.split(" ")[1];
  }
  return false;
};
