import { Router } from "express";
import * as linkController from "../controllers/link.controller";
import authenticate from "../middlewares/authenticate.middleware";
import authorize from "../middlewares/authorize.middleware";
import validate from "../middlewares/validate.middleware";
import * as linkValidator from "../validators/link.validator";

const linkRouter = Router();

linkRouter.put(
  "/ban/:link_id",
  authenticate,
  authorize(["ADMIN"]),
  linkController.putBanLink
);
linkRouter.put(
  "/unban/:link_id",
  authenticate,
  authorize(["ADMIN"]),
  linkController.putUnbanLink
);
linkRouter.get(
  "/get-all",
  authenticate,
  authorize(["ADMIN"]),
  linkController.getAllLinks
);

linkRouter
  .route("/")
  .get(authenticate, linkController.getLinks)
  .post(
    authenticate,
    linkValidator.postLink,
    validate,
    linkController.postLink
  );
linkRouter
  .route("/:link_id")
  .get(linkValidator.getLink, validate, linkController.getLink)
  .patch(
    authenticate,
    linkValidator.getLink,
    linkValidator.patchLink,
    validate,
    linkController.patchLink
  )
  .delete(
    authenticate,
    linkValidator.getLink,
    validate,
    linkController.deleteLink
  );
linkRouter.get("/s/:link_slug", linkController.getLinkBySlug);

export default linkRouter;
