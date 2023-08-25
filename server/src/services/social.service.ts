import Social from "../models/Social";
import { ISocial, SocialCreate, SocialUpdate } from "../types/social.type";

// get all social links
export const getAll = () => {
  return Social.find();
};

// fiter by social link property and get multiple social links
export const getAllByProperty = (key: keyof ISocial, value: string) => {
  return Social.find({ [key]: value });
};

// get a social link by propery
export const getByProperty = (key: keyof ISocial, value: string) => {
  if (key === "_id") return Social.findById(value);
  return Social.findOne({ [key]: value });
};

// create a social link
export const create = (data: SocialCreate) => {
  return new Social(data).save();
};

// update social using id
export const updateById = async (id: string, updates: SocialUpdate) => {
  return Social.findByIdAndUpdate(id, { ...updates }, { new: true });
};

// delete social link using id
export const deleteById = async (id: string) => {
  return Social.findByIdAndDelete(id);
};
