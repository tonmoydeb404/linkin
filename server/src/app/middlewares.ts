import cookieParser from "cookie-parser";
import cors from "cors";
import { json } from "express";
import morgan from "morgan";
import corsOptions from "../config/corsOptions";

const middlewares = [cors(corsOptions), morgan("dev"), json(), cookieParser()];

export default middlewares;
