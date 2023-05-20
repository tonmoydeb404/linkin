import { Router } from "express";
import * as linkController from "../controllers/link";
import validate from "../middlewares/validate";
import * as linkValidator from "../validators/link.validator";

const linkRouter = Router();

linkRouter
  .route("/")
  .get(linkController.getLinks)
  .post(linkValidator.postLink, validate, linkController.postLink);
linkRouter
  .route("/:link_id")
  .get(linkValidator.getLink, validate, linkController.getLink)
  .patch(
    linkValidator.getLink,
    linkValidator.patchLink,
    validate,
    linkController.patchLink
  )
  .delete(linkValidator.getLink, validate, linkController.deleteLink);
linkRouter.get("/s/:link_slug", linkController.getLinkBySlug);

export default linkRouter;
