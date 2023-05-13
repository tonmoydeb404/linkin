import cors from "cors";
import { json } from "express";
import morgan from "morgan";

const middlewares = [cors(), morgan("dev"), json()];

export default middlewares;
