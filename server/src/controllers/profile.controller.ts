import { matchedData } from "express-validator";
import createHttpError from "http-errors";
import asyncWrapper from "../helpers/asyncWrapper";
import * as linkServices from "../services/link.service";
import * as profileService from "../services/profile.service";
import * as socialServices from "../services/social.service";
import * as userServices from "../services/user.service";
import { ProfileUpdates } from "../types/profile.type";

export const getProfile = asyncWrapper(async (req, res) => {
  const { id } = req.user;

  const profile = await profileService
    .getByProperty("user", id)
    .populate("user");

  if (!profile) throw createHttpError(404, "Requested profile not found");

  res.status(200).json({ result: profile.toObject() });
});

export const getProfileStats = asyncWrapper(async (req, res) => {
  const { id } = req.user;

  const totalLinks = (await linkServices.getAllByProperty("user", id)).length;
  const totalSocials = (await socialServices.getAllByProperty("user", id))
    .length;

  res.status(200).json({
    result: {
      totalLinks,
      totalSocials,
    },
  });
});

export const patchProfile = asyncWrapper(async (req, res) => {
  const { id } = req.user;
  const { firstName, lastName, avatar, bio } = matchedData(
    req
  ) as ProfileUpdates;

  if (!firstName && !lastName && !avatar && !bio)
    throw createHttpError(400, "You have to update at least one propery");

  const updates: ProfileUpdates = {};
  if (firstName) updates.firstName = firstName;
  if (lastName) updates.lastName = lastName;
  if (avatar) updates.avatar = avatar;
  if (bio) updates.bio = bio;

  const profile = await profileService.updateByUser(id, updates);

  if (!profile) throw createHttpError(404, "Requested profile not found");

  return res.status(200).json({ result: profile.toObject() });
});

export const getUserProfile = asyncWrapper(async (req, res) => {
  const { username } = req.params;
  const user = await userServices.getByProperty("username", username);
  if (!user) throw createHttpError(404, "Requested user not found");
  // send error if user is banned
  if (user.status === "BANNED")
    throw createHttpError(410, "Requested Profile is banned!");

  const profile = await profileService
    .getByProperty("user", user.id)
    .populate(["links", "socials", "user", "layout"]);
  if (!profile) throw createHttpError(404, "Requested profile not found");

  res.status(200).json({ result: profile.toObject({ virtuals: true }) });
});
