import { Router } from "express";
import * as authController from "../controllers/auth";
import authenticate from "../middlewares/authenticate";
import validate from "../middlewares/validate";
import * as authValidators from "../validators/auth.validator";

const authRouter = Router();

authRouter.post(
  "/register",
  authValidators.register,
  validate,
  authController.postRegister
);
authRouter.post(
  "/login",
  authValidators.login,
  validate,
  authController.postLogin
);

authRouter.get("/refresh", authenticate, authController.getRefresh);
authRouter.get("/logout", authController.getLogout);

authRouter.post(
  "/password-reset-request",
  authValidators.postPasswordResetRequest,
  validate,
  authController.postPasswordResetRequest
);
authRouter.post(
  "/password-reset",
  authValidators.postPasswordReset,
  validate,
  authController.postPasswordReset
);

export default authRouter;
