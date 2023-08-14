import { Types } from "mongoose";
import { IUser } from "./user.type";

export type LinkStatus = "ACTIVE" | "BANNED";

export interface ILink {
  _id: string | Types.ObjectId;
  title: string;
  url: string;
  icon: string;
  slug: string;
  user: string | IUser;
  clicks: number;
  status: LinkStatus;
}

export type LinkCreate = Omit<ILink, "status" | "_id" | "clicks">;

export type LinkUpdate = Partial<
  Pick<ILink, "icon" | "slug" | "title" | "url" | "status">
>;
