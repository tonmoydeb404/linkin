import Link from "../models/Link";
import { ILink, LinkCreate, LinkUpdate } from "../types/link.type";

// get all links
export const getAll = () => {
  return Link.find({});
};

// filter by property and get multiple links
export const getAllByProperty = (key: keyof ILink, value: string) => {
  return Link.find({ [key]: value });
};

// filter by propety and get a single link
export const getByProperty = (key: keyof ILink, value: string) => {
  if (key === "_id") return Link.findById(value);
  return Link.findOne({ [key]: value });
};

// create a link
export const create = (data: LinkCreate) => {
  return new Link(data).save();
};

// update link using id
export const updateById = async (id: string, updates: LinkUpdate) => {
  return Link.findByIdAndUpdate(id, { ...updates }, { new: true });
};

// delete link using id
export const deleteById = async (id: string) => {
  return Link.findByIdAndDelete(id);
};

// filter link by property and delete
export const deleteAllByProperty = (key: keyof ILink, value: string) => {
  return Link.deleteMany({ [key]: value });
};
