import { Router } from "express";
import * as userController from "../controllers/user.controller";
import authorize from "../middlewares/authorize.middleware";
import validate from "../middlewares/validate.middleware";
import * as userValidator from "../validators/user.validator";

const userRouter = Router();

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

// UPDATE USERNAME
userRouter.put(
  "/change-username",
  userValidator.putUsername,
  validate,
  userController.putUsername
);

// GET & CREATE USER (ADMIN ONLY)
userRouter
  .route("/")
  .get(authorize(["ADMIN"]), userController.getUsers)
  .post(
    authorize(["ADMIN"]),
    userValidator.postUser,
    validate,
    userController.postUser
  );

// USER SPECIFIC GET, UPDATE, DELETE
userRouter
  .route("/:user_id")
  .get(userValidator.getUser, validate, userController.getUser)
  .patch(
    userValidator.getUser,
    userValidator.patchUser,
    validate,
    userController.patchUser
  )
  .delete(userValidator.getUser, validate, userController.deleteUser);

export default userRouter;
