import { Router } from "express";
import * as linkController from "../controllers/link";
import authorize from "../middlewares/authorize";
import validate from "../middlewares/validate";
import * as linkValidator from "../validators/link.validator";

const linkRouter = Router();

linkRouter.put(
  "/ban/:link_id",
  authorize(["ADMIN"]),
  linkController.putBanLink
);
linkRouter.put(
  "/unban/:link_id",
  authorize(["ADMIN"]),
  linkController.putUnbanLink
);
linkRouter.get("/get-all", authorize(["ADMIN"]), linkController.getAllLinks);

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
