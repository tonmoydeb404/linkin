import { Router } from "express";
import authenticate from "../middlewares/authenticate";
import authRouter from "../routes/auth";
import linkRouter from "../routes/link";
import profileRouter from "../routes/profile";
import userRouter from "../routes/user";

const router = Router();

router.use("/api/v1/users", authenticate, userRouter);
router.use("/api/v1/profiles", profileRouter);
router.use("/api/v1/links", authenticate, linkRouter);
router.use("/api/v1/auth", authRouter);

export default router;
