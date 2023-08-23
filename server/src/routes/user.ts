import { Router } from "express";
import * as userController from "../controllers/user";
import authorize from "../middlewares/authorize";
import validate from "../middlewares/validate";
import * as userValidator from "../validators/user.validator";

const userRouter = Router();

userRouter.put(
  "/ban/:user_id",
  authorize(["ADMIN"]),
  userController.putBanUser
);
userRouter.put(
  "/unban/:user_id",
  authorize(["ADMIN"]),
  userController.putUnbanUser
);
userRouter.put(
  "/change-role/:user_id",
  authorize(["ADMIN"]),
  userValidator.putUserRole,
  validate,
  userController.putUserRole
);
userRouter.put(
  "/change-password",
  userValidator.putPassword,
  validate,
  userController.putPassword
);
userRouter.put(
  "/change-username",
  userValidator.putUsername,
  validate,
  userController.putUsername
);

userRouter
  .route("/")
  .get(authorize(["ADMIN"]), userController.getUsers)
  .post(userValidator.postUser, validate, userController.postUser);
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
