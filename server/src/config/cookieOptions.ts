import { CookieOptions } from "express";
import loadEnv from "../helpers/loadEnv";

export const authCookieOptions: CookieOptions = {
  httpOnly: false,
  sameSite: loadEnv.NODE_ENV === "production" ? "none" : "lax",
  secure: loadEnv.NODE_ENV === "production",
  maxAge: 24 * 60 * 60 * 1000,
  domain: loadEnv.DOMAIN,
};
