import { Router } from "express";
import * as socialController from "../controllers/social";
import validate from "../middlewares/validate";
import * as socialValidator from "../validators/social.validator";

const socialRouter = Router();

socialRouter
  .route("/")
  .get(socialController.getSocials)
  .post(socialValidator.postSocial, validate, socialController.postSocial);
socialRouter
  .route("/:social_id")
  .get(socialValidator.getSocial, validate, socialController.getSocial)
  .patch(
    socialValidator.getSocial,
    socialValidator.patchSocial,
    validate,
    socialController.patchSocial
  )
  .delete(socialValidator.getSocial, validate, socialController.deleteSocial);

export default socialRouter;
