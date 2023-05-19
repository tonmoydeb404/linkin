import {
  LinkinApiCollectionResponse,
  LinkinApiResponse,
} from "./linkinApi.type";
import { IUser } from "./user.type";

export interface ILink {
  _id: string;
  title: string;
  url: string;
  icon: string | null;
  slug: string;
  user: string | IUser;
  clicks?: number;
}

export type LinkCollectionResponse = LinkinApiCollectionResponse<ILink>;
export type LinkResponse = LinkinApiResponse<ILink>;

export type LinkCreate = Pick<ILink, "slug" | "title" | "url"> & {
  icon: string;
};
export type LinkUpdate = Partial<
  Pick<ILink, "title" | "url"> & {
    icon: string;
  }
>;
