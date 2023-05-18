import { Router } from "express";
import * as userController from "../controllers/user";
import validate from "../middlewares/validate";
import * as userValidator from "../validators/user.validator";

const userRouter = Router();

userRouter
  .route("/")
  .get(userController.getUsers)
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
