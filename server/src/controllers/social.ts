import { matchedData } from "express-validator";
import createHttpError from "http-errors";
import asyncWrapper from "../helpers/asyncWrapper";
import * as socialService from "../services/social";

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

  const social = await socialService.updateSocialById(social_id, { site, url });
  if (!social) throw createHttpError(404, "Requested social not found");
  res.status(200).json({ results: social });
});

export const deleteSocial = asyncWrapper(async (req, res) => {
  const { social_id } = req.params;

  const social = await socialService.deleteSocialById(social_id);
  if (!social) throw createHttpError(404, "Requested social not found");
  res.status(200).json({ results: social });
});
