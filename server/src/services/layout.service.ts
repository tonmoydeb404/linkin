import Layout from "../models/Layout";
import { ILayout, LayoutCreate } from "../types/layout.type";

export const getByProperty = (key: keyof ILayout, value: string) => {
  if (key === "_id") return Layout.findById(value);
  return Layout.findOne({ [key]: value });
};

export const create = (data: LayoutCreate) => {
  return new Layout(data).save();
};
