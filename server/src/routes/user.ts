import { Router } from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  patchUser,
  postUser,
} from "../controllers/user";

const userRouter = Router();

userRouter.route("/").get(getUsers).post(postUser);
userRouter.route("/:user_id").get(getUser).patch(patchUser).delete(deleteUser);

export default userRouter;
