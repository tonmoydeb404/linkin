import createHttpError from "http-errors";
import Profile from "../models/Profile";
import { IProfile } from "../types/profile.type";
import * as userService from "./user";

export const createProfile = (data: IProfile) => {
  return new Profile(data).save();
};

export const getAllProfiles = () => Profile.find({});

export const getProfileByProperty = (key: keyof IProfile, value: string) => {
  if (key === "_id") return Profile.findById(value);
  return Profile.findOne({ [key]: value });
};

type Updates = Pick<IProfile, "avatar" | "firstName" | "lastName" | "bio">;
export const updateProfileById = async (
  id: string,
  updates: Partial<Updates>
) => {
  return Profile.findByIdAndUpdate(id, { ...updates }, { new: true });
};

export const updateProfileByUser = async (
  user: string,
  updates: Partial<Updates>
) => {
  return Profile.findOneAndUpdate({ user }, { ...updates }, { new: true });
};

export const deleteProfileById = async (id: string) => {
  return Profile.findByIdAndDelete(id);
};

export const getProfileByUsername = async (username: string) => {
  const user = await userService.getUserByProperty("username", username);
  if (!user) throw createHttpError(404, "Requested user not found");
  return getProfileByProperty("user", user.id);
};
