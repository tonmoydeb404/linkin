import { Router } from "express";
import * as userController from "../controllers/user";

const userRouter = Router();

userRouter
  .route("/")
  .get(userController.getUsers)
  .post(userController.postUser);
userRouter
  .route("/:user_id")
  .get(userController.getUser)
  .patch(userController.patchUser)
  .delete(userController.deleteUser);

export default userRouter;
