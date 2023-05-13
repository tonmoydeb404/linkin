import { Router } from "express";
import { postLogin, postRegister } from "../controllers/auth";

const authRouter = Router();

authRouter.post("/register", postRegister);
authRouter.post("/login", postLogin);

export default authRouter;
