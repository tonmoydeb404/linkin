import createHttpError from "http-errors";
import asyncWrapper from "../helpers/asyncWrapper";
import * as linkPermission from "../permissions/links";
import * as linkService from "../services/link";
import { ILink } from "../types/link.type";

export const getLinks = asyncWrapper(async (req, res) => {
  const { id } = req.user;
  const { user_id } = req.query;

  let links = [];

  if (typeof user_id === "string") {
    // get requested user links
    if (!linkPermission.canGetAll(req.user))
      throw createHttpError(401, "You have no access to this links");
    links = links = await linkService.getLinksByProperty("user", user_id);
  } else {
    // get loggedin user links
    links = await linkService.getLinksByProperty("user", id);
  }

  res.status(200).json({ results: links, count: links.length });
});

export const getLink = asyncWrapper(async (req, res) => {
  const { link_id } = req.params;

  const link = await linkService
    .getLinkByProperty("_id", link_id)
    .populate("user");

  if (!link) throw createHttpError(404, "Requested profile not found");

  res.status(200).json({ results: link });
});

export const postLink = asyncWrapper(async (req, res) => {
  const { title, slug, url, icon } = req.body as ILink;
  const { id: userId } = req.user;

  if (!title || !url) throw createHttpError(400, "Please provide valid inputs");

  let link = await linkService.createLink({
    title,
    slug,
    url,
    icon,
    user: userId,
  });

  link = await link.populate("user");

  return res.status(201).json({ results: link });
});

export const patchLink = asyncWrapper(async (req, res) => {
  const { link_id } = req.params;
  const { title, url, icon } = req.body as ILink;

  let link = await linkService.getLinkByProperty("_id", link_id);
  if (!link) throw createHttpError(404, "Requested Link not found");

  if (!linkPermission.canUpdate(req.user, link))
    throw createHttpError(401, "You have no access to Update this content");

  if (!title && !url && !icon)
    throw createHttpError(400, "You have to update at least one propery");

  const updates: Record<string, any> = {};
  if (title !== undefined) updates.title = title;
  if (url !== undefined) updates.url = url;
  if (icon !== undefined) updates.icon = icon;

  link = await linkService.updateLinkById(link_id, updates);

  return res.status(200).json({ results: link });
});

export const deleteLink = asyncWrapper(async (req, res) => {
  const { link_id } = req.params;

  let link = await linkService.getLinkByProperty("_id", link_id);
  if (!link) throw createHttpError(404, "Requested Link not found");

  if (!linkPermission.canDelete(req.user, link))
    throw createHttpError(401, "You have no access to Delete this content");

  link = await linkService.deleteLinkById(link_id);

  res.status(200).json({ results: link._id });
});
