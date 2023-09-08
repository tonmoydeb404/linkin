import { Router } from "express";
import * as layoutController from "../controllers/layout.controller";
import validate from "../middlewares/validate.middleware";
import * as layoutValidator from "../validators/layout.validator";

const layoutRouter = Router();

layoutRouter
  .route("/")
  .get(layoutController.getLayout)
  .post(layoutValidator.postLayout, validate, layoutController.postLayout)
  .patch(layoutValidator.patchLayout, validate, layoutController.patchLayout);

export default layoutRouter;
