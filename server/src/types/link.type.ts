import { Types } from "mongoose";
import { IUser } from "./user.type";

export interface ILink {
  _id?: string | Types.ObjectId;
  title: string;
  url: string;
  icon?: string;
  slug: string;
  user: string | IUser;
  clicks?: number;
}
