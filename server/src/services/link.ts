import Link from "../models/Link";
import { ILink } from "../types/link.type";

export const getAllLinks = () => {
  return Link.find({});
};

export const getLinksByProperty = (key: keyof ILink, value: string) => {
  return Link.find({ [key]: value });
};

export const getLinkByProperty = (key: keyof ILink, value: string) => {
  if (key === "_id") return Link.findById(value);
  return Link.findOne({ [key]: value });
};

export const createLink = (data: ILink) => {
  return new Link(data).save();
};

type Updates = Pick<ILink, "icon" | "slug" | "title" | "url">;
export const updateLinkById = async (id: string, updates: Partial<Updates>) => {
  return Link.findByIdAndUpdate(id, { ...updates }, { new: true });
};

export const deleteLinkById = async (id: string) => {
  return Link.findByIdAndDelete(id);
};
