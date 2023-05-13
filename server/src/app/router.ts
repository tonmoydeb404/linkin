import { Router } from "express";
import allowAuth from "../middlewares/allowAuth";
import authenticate from "../middlewares/authenticate";
import authRouter from "../routes/auth";
import userRouter from "../routes/user";

const router = Router();

router.use(
  "/api/v1/users",
  authenticate,
  allowAuth(["ADMIN", "EDITOR"]),
  userRouter
);
router.use("/api/v1/auth", authRouter);

export default router;
