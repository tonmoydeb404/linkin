import { Router } from "express";
import authenticate from "../middlewares/authenticate";
import authRouter from "../routes/auth";
import linkRouter from "../routes/link";
import profileRouter from "../routes/profile";
import userRouter from "../routes/user";

const router = Router();

router.use("/api/v1/user", authenticate, userRouter);
router.use("/api/v1/profile", profileRouter);
router.use("/api/v1/link", authenticate, linkRouter);
router.use("/api/v1/auth", authRouter);

export default router;
