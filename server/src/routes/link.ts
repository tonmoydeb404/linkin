import { Router } from "express";
import * as linkController from "../controllers/link";

const linkRouter = Router();

linkRouter
  .route("/")
  .get(linkController.getLinks)
  .post(linkController.postLink);
linkRouter
  .route("/:link_id")
  .get(linkController.getLink)
  .patch(linkController.patchLink)
  .delete(linkController.deleteLink);

export default linkRouter;
