import { Router } from "express";
import * as profileController from "../controllers/profile";
import authenticate from "../middlewares/authenticate";

const profileRouter = Router();

profileRouter
  .route("/")
  .get(authenticate, profileController.getProfile)
  .patch(authenticate, profileController.patchProfile);

profileRouter.get("/:username", profileController.getUserProfile);

export default profileRouter;
