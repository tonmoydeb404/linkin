import Social from "../models/Social";
import { ISocial, SocialCreate, SocialUpdate } from "../types/social.type";

export const getAll = () => {
  return Social.find();
};

export const getSocialsByProperty = (key: keyof ISocial, value: string) => {
  return Social.find({ [key]: value });
};

export const getSocialByProperty = (key: keyof ISocial, value: string) => {
  if (key === "_id") return Social.findById(value);
  return Social.findOne({ [key]: value });
};

export const createSocial = (data: SocialCreate) => {
  return new Social(data).save();
};

export const updateSocialById = async (id: string, updates: SocialUpdate) => {
  return Social.findByIdAndUpdate(id, { ...updates }, { new: true });
};

export const deleteSocialById = async (id: string) => {
  return Social.findByIdAndDelete(id);
};
