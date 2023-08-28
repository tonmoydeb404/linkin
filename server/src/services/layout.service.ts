import { ClientSession } from "mongoose";
import Layout from "../models/Layout";
import { ILayout, LayoutCreate } from "../types/layout.type";

export const getByProperty = (key: keyof ILayout, value: string) => {
  if (key === "_id") return Layout.findById(value);
  return Layout.findOne({ [key]: value });
};

export const create = (
  data: LayoutCreate,
  session: ClientSession = undefined
) => {
  return new Layout(data).save({ session });
};

// filter by property and delete a layout
export const deleteByProperty = (key: keyof ILayout, value: string) => {
  if (key === "_id") return Layout.findByIdAndDelete(value);
  return Layout.findOneAndDelete({ [key]: value });
};
