import { Router } from "express";
import { getHealth } from "../controllers/health";
import authenticate from "../middlewares/authenticate";
import authRouter from "../routes/auth";
import linkRouter from "../routes/link";
import profileRouter from "../routes/profile";
import socialRouter from "../routes/social";
import userRouter from "../routes/user";

const router = Router();

router.use("/api/v1/users", authenticate, userRouter);
router.use("/api/v1/profiles", profileRouter);
router.use("/api/v1/links", linkRouter);
router.use("/api/v1/socials", authenticate, socialRouter);
router.use("/api/v1/auth", authRouter);
// health route
router.all("/api/v1/health", getHealth);

export default router;
