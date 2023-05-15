import { Types } from "mongoose";
import { IUser } from "./user.type";

export interface ILink {
  _id?: Types.ObjectId;
  title: string;
  url: string;
  icon?: string | null;
  slug: string;
  user: string | IUser;
  clicks?: number;
}
