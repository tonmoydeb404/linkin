import { ILink } from "./link.type";
import { LinkinApiResponse } from "./linkinApi.type";
import { ISocial } from "./social.type";
import { IUser } from "./user.type";

export interface IProfile<T = IUser | string> {
  _id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  bio: string;
  user: T;
  links?: ILink[];
  socials?: ISocial[];
}

export type ProfileResponse = LinkinApiResponse<IProfile<IUser>>;

export type ProfileUpdate = Partial<
  Pick<IProfile, "firstName" | "lastName" | "avatar" | "bio">
>;
