import Profile from "../models/Profile";
import { IProfile } from "../types/profile.type";

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

export const deleteProfileById = async (id: string) => {
  return Profile.findByIdAndDelete(id);
};
