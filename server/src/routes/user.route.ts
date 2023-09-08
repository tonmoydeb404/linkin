import { Router } from "express";
import * as userController from "../controllers/user.controller";
import authorize from "../middlewares/authorize.middleware";
import confirmPassword from "../middlewares/confirmPassword.middleware";
import validate from "../middlewares/validate.middleware";
import { confirmPasswordValidator } from "../validators/common.validator";
import * as userValidator from "../validators/user.validator";

const userRouter = Router();

// GET, CREATE USER (ADMIN ONLY)
userRouter
  .route("/")
  .get(authorize(["ADMIN"]), userController.getUsers)
  .post(
    authorize(["ADMIN"]),
    userValidator.postUser,
    validate,
    userController.postUser
  );

// VERIFY USER (ADMIN ONLY)
userRouter.put(
  "/verify/:user_id",
  authorize(["ADMIN"]),
  userValidator.putVerifiedStatus,
  validate,
  userController.putVerifiedStatus
);

// BAN USER (ADMIN ONLY)
userRouter.put(
  "/ban/:user_id",
  authorize(["ADMIN"]),
  userController.putBanUser
);

// UNBAN USER (ADMIN ONLY)
userRouter.put(
  "/unban/:user_id",
  authorize(["ADMIN"]),
  userController.putUnbanUser
);

// UPDATE USER ROLE (ADMIN ONLY)
userRouter.put(
  "/change-role/:user_id",
  authorize(["ADMIN"]),
  userValidator.putUserRole,
  validate,
  userController.putUserRole
);

// UPDATE USER PASSWORD
userRouter.put(
  "/change-password",
  userValidator.putPassword,
  validate,
  userController.putPassword
);

// USER SPECIFIC GET, UPDATE & DELETE (AUTHORIZED USER ONLY)
userRouter
  .route("/:user_id")
  .get(userValidator.getUser, validate, userController.getUser)
  .patch(
    userValidator.getUser,
    confirmPasswordValidator,
    userValidator.patchUser,
    validate,
    confirmPassword,
    userController.patchUser
  )
  .delete(
    userValidator.getUser,
    confirmPasswordValidator,
    validate,
    confirmPassword,
    userController.deleteUser
  );

export default userRouter;
