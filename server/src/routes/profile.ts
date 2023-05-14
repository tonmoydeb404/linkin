import { Router } from "express";
import * as profileController from "../controllers/profile";

const profileRouter = Router();

profileRouter
  .route("/")
  .get(profileController.getProfiles)
  .post(profileController.postProfile);
profileRouter
  .route("/:profile_id")
  .get(profileController.getProfile)
  .patch(profileController.patchProfile)
  .delete(profileController.deleteProfile);

export default profileRouter;
