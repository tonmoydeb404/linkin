import { matchedData } from "express-validator";
import createHttpError from "http-errors";
import asyncWrapper from "../helpers/asyncWrapper";
import * as socialPermission from "../permissions/social";
import * as socialService from "../services/social.service";

export const getSocials = asyncWrapper(async (req, res) => {
  const { id } = req.user;

  const socials = await socialService.getAllByProperty("user", id);
  res.status(200).json({ result: socials, count: socials.length });
});

export const getSocial = asyncWrapper(async (req, res) => {
  const { social_id } = req.params;

  const social = await socialService.getByProperty("_id", social_id);
  if (!social) throw createHttpError(404, "Requested social not found");

  res.status(200).json({ result: social });
});

export const postSocial = asyncWrapper(async (req, res) => {
  const { site, url } = matchedData(req);
  const { id } = req.user;

  const social = await socialService.create({ site, url, user: id });
  res.status(200).json({ result: social });
});

export const patchSocial = asyncWrapper(async (req, res) => {
  const { social_id } = req.params;
  const { site, url } = matchedData(req);

  let social = await socialService.getByProperty("_id", social_id);
  if (!social) throw createHttpError(404, "Requested social not found");

  if (!socialPermission.canUpdate(req.user, social))
    throw createHttpError(
      400,
      "You don't have the permission to perform this task"
    );

  if (site) social.site = site;
  if (url) social.url = url;
  // perform update task
  await social.save();

  res.status(200).json({ result: social });
});

export const deleteSocial = asyncWrapper(async (req, res) => {
  const { social_id } = req.params;

  let social = await socialService.getByProperty("_id", social_id);
  if (!social) throw createHttpError(404, "Requested social not found");

  if (!socialPermission.canDelete(req.user, social))
    throw createHttpError(
      400,
      "You don't have the permission to perform this task"
    );

  // perform delete social link task
  await social.deleteOne();

  res.status(200).json({ result: social });
});

export const putBanSocial = asyncWrapper(async (req, res) => {
  const { social_id } = req.params;

  if (!socialPermission.canBan(req.user))
    throw createHttpError(
      400,
      "You don't have the permission to perform this task"
    );

  let social = await socialService.getByProperty("_id", social_id);
  if (!social) throw createHttpError(404, "Requested link not found");

  // ban social link
  social.status = "BANNED";
  await social.save();

  return res.status(200).json({ result: social.toObject() });
});

export const putUnbanSocial = asyncWrapper(async (req, res) => {
  const { social_id } = req.params;

  if (!socialPermission.canBan(req.user))
    throw createHttpError(
      400,
      "You don't have the permission to perform this task"
    );

  let social = await socialService.getByProperty("_id", social_id);
  if (!social) throw createHttpError(404, "Requested link not found");

  // unban social link
  social.status = "ACTIVE";
  await social.save();

  return res.status(200).json({ result: social.toObject() });
});

export const getAllSocials = asyncWrapper(async (req, res) => {
  const socials = await socialService.getAll();
  res.status(200).json({ result: socials, count: socials.length });
});
