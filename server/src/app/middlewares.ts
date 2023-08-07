import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import cors from "cors";
import { json } from "express";
import morgan from "morgan";
import corsOptions from "../config/corsOptions";
import loadEnv from "../helpers/loadEnv";

const middlewares = [
  cors(corsOptions),
  morgan("dev"),
  json(),
  cookieParser(),
  cookieSession({
    secret: loadEnv.COOKIE_SECRET,
    httpOnly: true,
    sameSite: loadEnv.NODE_ENV === "production" ? "none" : "lax",
    secure: loadEnv.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
  }),
];

export default middlewares;
