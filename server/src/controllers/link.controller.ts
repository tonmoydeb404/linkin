import { matchedData } from "express-validator";
import createHttpError from "http-errors";
import asyncWrapper from "../helpers/asyncWrapper";
import * as linkPermission from "../permissions/link";
import * as linkService from "../services/link.service";

export const getLinks = asyncWrapper(async (req, res) => {
  const { id } = req.user;

  const links = await linkService.getAllByProperty("user", id);

  res.status(200).json({ results: links, count: links.length });
});

export const getLink = asyncWrapper(async (req, res) => {
  const { link_id } = req.params;

  const link = await linkService.getByProperty("_id", link_id);

  if (!link) throw createHttpError(404, "Requested link not found");

  res.status(200).json({ results: link });
});

export const postLink = asyncWrapper(async (req, res) => {
  const { title, slug, url, icon } = matchedData(req);
  const { id: userId } = req.user;

  if (!title || !url) throw createHttpError(400, "Please provide valid inputs");

  let link = await linkService.create({
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
  const { title, url, icon } = matchedData(req);

  let link = await linkService.getByProperty("_id", link_id);
  if (!link) throw createHttpError(404, "Requested Link not found");

  if (!linkPermission.canUpdate(req.user, link))
    throw createHttpError(401, "You have no access to Update this content");

  if (!title && !url && !icon)
    throw createHttpError(400, "You have to update at least one propery");

  if (title !== undefined) link.title = title;
  if (url !== undefined) link.url = url;
  if (icon !== undefined) link.icon = icon;

  await link.save();

  return res.status(200).json({ results: link });
});

export const deleteLink = asyncWrapper(async (req, res) => {
  const { link_id } = req.params;

  let link = await linkService.getByProperty("_id", link_id);
  if (!link) throw createHttpError(404, "Requested Link not found");

  if (!linkPermission.canDelete(req.user, link))
    throw createHttpError(401, "You have no access to Delete this content");

  await link.deleteOne();

  res.status(200).json({ results: link._id });
});

export const getLinkBySlug = asyncWrapper(async (req, res) => {
  const { link_slug } = req.params;

  const link = await linkService
    .getByProperty("slug", link_slug)
    .populate("user");
  if (!link) throw createHttpError(404, "Requested profile not found");

  if (link.status === "BANNED")
    throw createHttpError(410, "Requested link is banned");

  if (typeof link.user !== "string" && link.user.status === "BANNED")
    throw createHttpError(410, "Requested link user is banned");

  link.$inc("clicks", 1);
  await link.save();

  res.status(200).json({ results: link });
});

export const putBanLink = asyncWrapper(async (req, res) => {
  const { link_id } = req.params;

  if (!linkPermission.canBan(req.user))
    throw createHttpError(
      400,
      "You don't have the permission to perform this task"
    );

  let link = await linkService.getByProperty("_id", link_id);
  if (!link) throw createHttpError(404, "Requested link not found");

  // ban link
  link.status = "BANNED";
  await link.save();

  return res.status(200).json({ results: link.toObject() });
});

export const putUnbanLink = asyncWrapper(async (req, res) => {
  const { link_id } = req.params;

  if (!linkPermission.canBan(req.user))
    throw createHttpError(
      400,
      "You don't have the permission to perform this task"
    );

  let link = await linkService.getByProperty("_id", link_id);
  if (!link) throw createHttpError(404, "Requested link not found");

  // unban link
  link.status = "ACTIVE";
  await link.save();

  return res.status(200).json({ results: link.toObject() });
});

export const getAllLinks = asyncWrapper(async (_req, res) => {
  const links = await linkService.getAll();

  res.status(200).json({ results: links, count: links.length });
});
