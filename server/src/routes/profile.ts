import { Router } from "express";
import * as profileController from "../controllers/profile";
import authenticate from "../middlewares/authenticate";

const profileRouter = Router();

profileRouter
  .route("/")
  .get(authenticate, profileController.getProfiles)
  .post(authenticate, profileController.postProfile);

profileRouter
  .route("/:profile_id")
  .get(profileController.getProfile)
  .patch(authenticate, profileController.patchProfile)
  .delete(authenticate, profileController.deleteProfile);

export default profileRouter;
