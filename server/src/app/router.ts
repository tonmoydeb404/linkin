import { Router } from "express";
import { getHealth } from "../controllers/health.controller";
import authenticate from "../middlewares/authenticate.middleware";
import authRouter from "../routes/auth.route";
import layoutRouter from "../routes/layout.route";
import linkRouter from "../routes/link.route";
import profileRouter from "../routes/profile.route";
import socialRouter from "../routes/social.route";
import userRouter from "../routes/user.route";

const router = Router();

router.use("/api/v1/users", authenticate, userRouter);
router.use("/api/v1/layout", authenticate, layoutRouter);
router.use("/api/v1/profile", profileRouter);
router.use("/api/v1/links", linkRouter);
router.use("/api/v1/socials", authenticate, socialRouter);
router.use("/api/v1/auth", authRouter);
// health route
router.all("/api/v1/health", getHealth);

export default router;
