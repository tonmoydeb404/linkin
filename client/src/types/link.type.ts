import {
  LinkinApiCollectionResponse,
  LinkinApiResponse,
} from "./linkinApi.type";
import { IUser } from "./user.type";

export interface ILink<T = string | IUser> {
  _id: string;
  title: string;
  url: string;
  icon?: string;
  slug: string;
  user: T;
  clicks?: number;
}

export type LinkCollectionResponse = LinkinApiCollectionResponse<ILink>;
export type LinkResponse = LinkinApiResponse<ILink<IUser>>;

export type LinkCreate = Pick<ILink, "title" | "url" | "icon"> & {
  slug?: string;
};
export type LinkUpdate = Partial<Pick<ILink, "title" | "url" | "icon">>;
