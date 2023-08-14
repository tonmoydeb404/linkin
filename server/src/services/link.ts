import Link from "../models/Link";
import { ILink, LinkCreate, LinkUpdate } from "../types/link.type";

export const getAll = () => {
  return Link.find({});
};

export const getLinksByProperty = (key: keyof ILink, value: string) => {
  return Link.find({ [key]: value });
};

export const getLinkByProperty = (key: keyof ILink, value: string) => {
  if (key === "_id") return Link.findById(value);
  return Link.findOne({ [key]: value });
};

export const createLink = (data: LinkCreate) => {
  return new Link(data).save();
};

export const updateLinkById = async (id: string, updates: LinkUpdate) => {
  return Link.findByIdAndUpdate(id, { ...updates }, { new: true });
};

export const deleteLinkById = async (id: string) => {
  return Link.findByIdAndDelete(id);
};
