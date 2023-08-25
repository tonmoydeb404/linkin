import { Router } from "express";
import * as socialController from "../controllers/social.controller";
import authorize from "../middlewares/authorize.middleware";
import validate from "../middlewares/validate.middleware";
import * as socialValidator from "../validators/social.validator";

const socialRouter = Router();

socialRouter.put(
  "/ban/:link_id",
  authorize(["ADMIN"]),
  socialController.putBanSocial
);
socialRouter.put(
  "/unban/:link_id",
  authorize(["ADMIN"]),
  socialController.putUnbanSocial
);
socialRouter.get(
  "/get-all",
  authorize(["ADMIN"]),
  socialController.getAllSocials
);

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
