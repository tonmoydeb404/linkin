import { ClientSession } from "mongoose";
import Profile from "../models/Profile";
import { IProfile, ProfileUpdates } from "../types/profile.type";

// create a profile
export const create = (data: IProfile, session: ClientSession = undefined) => {
  return new Profile(data).save({ session });
};

// get all profiles
export const getAll = () => Profile.find({});

// filter by property and get a profile
export const getByProperty = (key: keyof IProfile, value: string) => {
  if (key === "_id") return Profile.findById(value);
  return Profile.findOne({ [key]: value });
};

// update profile using id
export const updateById = async (id: string, updates: ProfileUpdates) => {
  return Profile.findByIdAndUpdate(id, { ...updates }, { new: true });
};

// update profile using user id
export const updateByUser = async (user: string, updates: ProfileUpdates) => {
  return Profile.findOneAndUpdate({ user }, { ...updates }, { new: true });
};

// delete profile using id
export const deleteById = async (id: string) => {
  return Profile.findByIdAndDelete(id);
};

// filter by property and delete a profile
export const deleteByProperty = (key: keyof IProfile, value: string) => {
  if (key === "_id") return Profile.findByIdAndDelete(value);
  return Profile.findOneAndDelete({ [key]: value });
};
