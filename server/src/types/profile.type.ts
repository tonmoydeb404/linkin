import { Types } from "mongoose";
import { IUser } from "./user.type";

export interface IProfile {
  _id?: Types.ObjectId;
  firstName: string;
  lastName: string;
  avatar?: string;
  bio?: string;
  user: IUser | string;
}
