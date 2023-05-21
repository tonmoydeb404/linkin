import socialSites from "../data/social-sites";
import {
  LinkinApiCollectionResponse,
  LinkinApiResponse,
} from "./linkinApi.type";
import { IUser } from "./user.type";

export interface ISocial<T = string | IUser> {
  _id: string;
  site: (typeof socialSites)[number];
  url: string;
  user: T;
}

export type SocialCollectionResponse = LinkinApiCollectionResponse<ISocial>;
export type SocialResponse = LinkinApiResponse<ISocial<IUser>>;

export type SocialCreate = Pick<ISocial, "site" | "url">;
export type SocialUpdate = Partial<Pick<ISocial, "site" | "url">>;
