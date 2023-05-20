import { Types } from "mongoose";
import { IUser } from "./user.type";

export interface IProfile {
  _id?: string | Types.ObjectId;
  firstName: string;
  lastName: string;
  avatar?: string;
  bio?: string | null;
  user: IUser | string;
}
