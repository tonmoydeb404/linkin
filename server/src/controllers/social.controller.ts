import { matchedData } from "express-validator";
import createHttpError from "http-errors";
import asyncWrapper from "../helpers/asyncWrapper";
import * as socialPermission from "../permissions/social";
import * as socialService from "../services/social.service";

export const getSocials = asyncWrapper(async (req, res) => {
  const { id } = req.user;

  const socials = await socialService.getSocialsByProperty("user", id);
  res.status(200).json({ results: socials, count: socials.length });
});

export const getSocial = asyncWrapper(async (req, res) => {
  const { social_id } = req.params;

  const social = await socialService.getSocialByProperty("_id", social_id);
  if (!social) throw createHttpError(404, "Requested social not found");

  res.status(200).json({ results: social });
});

export const postSocial = asyncWrapper(async (req, res) => {
  const { site, url } = matchedData(req);
  const { id } = req.user;

  const social = await socialService.createSocial({ site, url, user: id });
  res.status(200).json({ results: social });
});

export const patchSocial = asyncWrapper(async (req, res) => {
  const { social_id } = req.params;
  const { site, url } = matchedData(req);

  let social = await socialService.getSocialByProperty("_id", social_id);

  if (!social) throw createHttpError(404, "Requested social not found");
  if (!socialPermission.canUpdate(req.user, social))
    throw createHttpError(
      400,
      "You don't have the permission to perform this task"
    );

  social = await socialService.updateSocialById(social_id, { site, url });

  res.status(200).json({ results: social });
});

export const deleteSocial = asyncWrapper(async (req, res) => {
  const { social_id } = req.params;

  let social = await socialService.getSocialByProperty("_id", social_id);

  if (!social) throw createHttpError(404, "Requested social not found");
  if (!socialPermission.canDelete(req.user, social))
    throw createHttpError(
      400,
      "You don't have the permission to perform this task"
    );

  social = await socialService.deleteSocialById(social_id);
  res.status(200).json({ results: social });
});

export const putBanSocial = asyncWrapper(async (req, res) => {
  const { link_id } = req.params;

  if (!socialPermission.canBan(req.user))
    throw createHttpError(
      400,
      "You don't have the permission to perform this task"
    );

  let link = await socialService.getSocialByProperty("_id", link_id);
  if (!link) throw createHttpError(404, "Requested link not found");

  // update user
  link = await socialService.updateSocialById(link_id, { status: "BANNED" });

  return res.status(200).json({ results: link.toObject() });
});

export const putUnbanSocial = asyncWrapper(async (req, res) => {
  const { link_id } = req.params;

  if (!socialPermission.canBan(req.user))
    throw createHttpError(
      400,
      "You don't have the permission to perform this task"
    );

  let link = await socialService.getSocialByProperty("_id", link_id);
  if (!link) throw createHttpError(404, "Requested link not found");

  // update user
  link = await socialService.updateSocialById(link_id, { status: "ACTIVE" });

  return res.status(200).json({ results: link.toObject() });
});

export const getAllSocials = asyncWrapper(async (req, res) => {
  const socials = await socialService.getAll();
  res.status(200).json({ results: socials, count: socials.length });
});
