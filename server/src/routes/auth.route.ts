import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import authenticate from "../middlewares/authenticate.middleware";
import validate from "../middlewares/validate.middleware";
import * as authValidators from "../validators/auth.validator";

const authRouter = Router();

authRouter.post(
  "/register",
  authValidators.postRegister,
  validate,
  authController.postRegister
);
authRouter.post(
  "/login",
  authValidators.postLogin,
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
