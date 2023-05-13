import { JwtPayload, sign, verify } from "jsonwebtoken";
import loadEnv from "./loadEnv";

export const generateToken = async (
  payload: string | object,
  expire: string | number
) => {
  return sign(payload, loadEnv.JWT_SECRET, { expiresIn: expire });
};

export const verifyToken = (token: string) => {
  return verify(token, loadEnv.JWT_SECRET);
};

export const verifyPayloadObject = <T>(
  payload: string | JwtPayload,
  keys: (keyof T)[]
) => {
  if (typeof payload === "string") return false;

  const objKeys = Object.keys(payload);

  return keys.every((key) => objKeys.includes(key as string));
};
