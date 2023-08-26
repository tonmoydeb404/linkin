import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import authenticate from "../middlewares/authenticate.middleware";
import validate from "../middlewares/validate.middleware";
import * as authValidators from "../validators/auth.validator";

const authRouter = Router();

// REGISTER A NEW ACCOUNT
authRouter.post(
  "/register",
  authValidators.postRegister,
  validate,
  authController.postRegister
);

// LOGIN WITH EXISTING ACCOUNT
authRouter.post(
  "/login",
  authValidators.postLogin,
  validate,
  authController.postLogin
);

// LOGOUT FROM USER ACCOUNT
authRouter.get("/logout", authController.getLogout);

// GET REFRESH TOKEN
authRouter.get("/refresh", authenticate, authController.getRefresh);

// PASSWORD RESET
authRouter
  .route("/password-reset")
  .post(
    authValidators.postPasswordReset,
    validate,
    authController.postPasswordReset
  )
  .put(
    authValidators.putPasswordReset,
    validate,
    authController.putPasswordReset
  );

// EMAIL VERIFICATION
authRouter
  .route("/verify-email")
  .all(authenticate)
  .get(authController.getEmailVerification)
  .put(
    authValidators.putEmailVerification,
    validate,
    authController.putEmailVerification
  );

export default authRouter;
