import createHttpError from "http-errors";
import asyncWrapper from "../helpers/asyncWrapper";
import * as linkService from "../services/link";
import { ILink } from "../types/link.type";

export const getLinks = asyncWrapper(async (req, res) => {
  const { id } = req.user;
  const links = await linkService.getLinksByProperty("user", id);

  res.status(200).json({ links, count: links.length });
});

export const getLink = asyncWrapper(async (req, res) => {
  const { link_id } = req.params;

  const link = await linkService
    .getLinkByProperty("_id", link_id)
    .populate("user");

  if (!link) throw createHttpError(404, "Requested profile not found");

  res.status(200).json({ link });
});

export const postLink = asyncWrapper(async (req, res) => {
  const { title, slug, url, icon } = req.body as ILink;
  const { id: userId } = req.user;

  if (!title || !slug || !url)
    throw createHttpError(400, "Please provide valid inputs");

  let link = await linkService.createLink({
    title,
    slug,
    url,
    icon,
    user: userId,
  });

  link = await link.populate("user");

  return res.status(201).json({ link });
});

export const patchLink = asyncWrapper(async (req, res) => {
  const { link_id } = req.params;
  const { title, url, icon } = req.body as ILink;

  if (!title && !url && !icon)
    throw createHttpError(400, "You have to update at least one propery");

  const updates: Record<string, any> = {};
  if (title !== undefined) updates.title = title;
  if (url !== undefined) updates.url = url;
  if (icon !== undefined) updates.icon = icon;

  const link = await linkService.updateLinkById(link_id, updates);

  if (!link) throw createHttpError(404, "Requested profile not found");

  return res.status(200).json({ link });
});

export const deleteLink = asyncWrapper(async (req, res) => {
  const { link_id } = req.params;

  const link = await linkService.deleteLinkById(link_id);

  if (!link) throw createHttpError(404, "Requested profile not found");

  res.status(200).json({ link: link._id });
});
