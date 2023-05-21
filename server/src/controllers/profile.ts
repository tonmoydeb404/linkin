import createHttpError from "http-errors";
import asyncWrapper from "../helpers/asyncWrapper";
import * as profileService from "../services/profile";
import { IProfile } from "../types/profile.type";

export const getProfiles = asyncWrapper(async (_req, res) => {
  const profiles = await profileService.getAllProfiles().populate("user");

  res.status(200).json({ profiles, count: profiles.length });
});

export const getProfile = asyncWrapper(async (req, res) => {
  const { profile_id } = req.params;

  const profile = await profileService
    .getProfileByProperty("_id", profile_id)
    .populate("user");

  if (!profile) throw createHttpError(404, "Requested profile not found");

  res.status(200).json({ results: profile });
});

export const postProfile = asyncWrapper(async (req, res) => {
  const { firstName, lastName, avatar, bio } = req.body as IProfile;
  const { id: userId } = req.user;

  if (!firstName || !lastName)
    throw createHttpError(400, "Please provide valid inputs");

  let profile = await profileService.createProfile({
    firstName,
    lastName,
    avatar,
    bio,
    user: userId,
  });

  profile = await profile.populate("user");

  return res.status(201).json({ results: profile });
});

export const patchProfile = asyncWrapper(async (req, res) => {
  const { profile_id } = req.params;
  const { firstName, lastName, avatar, bio } = req.body as IProfile;

  if (!firstName && !lastName && !avatar && !bio)
    throw createHttpError(400, "You have to update at least one propery");

  const updates: Record<string, any> = {};
  if (firstName) updates.firstName = firstName;
  if (lastName) updates.lastName = lastName;
  if (avatar) updates.avatar = avatar;
  if (bio) updates.bio = bio;

  const profile = await profileService.updateProfileById(profile_id, updates);

  if (!profile) throw createHttpError(404, "Requested profile not found");

  return res.status(200).json({ results: profile });
});

export const deleteProfile = asyncWrapper(async (req, res) => {
  const { profile_id } = req.params;

  const profile = await profileService.deleteProfileById(profile_id);

  if (!profile) throw createHttpError(404, "Requested profile not found");

  res.status(200).json({ results: profile._id });
});

export const getUserProfile = asyncWrapper(async (req, res) => {
  const { username } = req.params;
  const profile = await (
    await profileService.getProfileByUsername(username)
  ).populate(["links", "socials", "user"]);

  if (!profile) throw createHttpError(404, "Requested profile not found");

  res.status(200).json({ results: profile.toObject({ virtuals: true }) });
});

export const getAuthorizedProfile = asyncWrapper(async (req, res) => {
  const { id } = req.user;

  const profile = await profileService
    .getProfileByProperty("user", id)
    .populate("user");

  if (!profile) throw createHttpError(404, "Requested profile not found");

  res.status(200).json({ results: profile });
});
export const patchAuthorizedProfile = asyncWrapper(async (req, res) => {
  const { id } = req.user;
  const { firstName, lastName, avatar, bio } = req.body as IProfile;

  if (!firstName && !lastName && !avatar && !bio)
    throw createHttpError(400, "You have to update at least one propery");

  const updates: Record<string, any> = {};
  if (firstName) updates.firstName = firstName;
  if (lastName) updates.lastName = lastName;
  if (avatar) updates.avatar = avatar;
  if (bio) updates.bio = bio;

  const profile = await profileService.updateProfileByUser(id, updates);

  if (!profile) throw createHttpError(404, "Requested profile not found");

  return res.status(200).json({ results: profile });
});
