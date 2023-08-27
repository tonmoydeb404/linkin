import { Router } from "express";
import * as profileController from "../controllers/profile.controller";
import authenticate from "../middlewares/authenticate.middleware";
import validate from "../middlewares/validate.middleware";
import * as profileValidator from "../validators/profile.validator";

const profileRouter = Router();

profileRouter
  .route("/")
  .get(authenticate, profileController.getProfile)
  .patch(
    authenticate,
    profileValidator.patchProfile,
    validate,
    profileController.patchProfile
  );

profileRouter.get("/:username", profileController.getUserProfile);

export default profileRouter;
