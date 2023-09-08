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

// services types
export type ProfileUpdates = Partial<
  Pick<IProfile, "avatar" | "firstName" | "lastName" | "bio">
>;
export type ProfileCreate = Pick<
  IProfile,
  "avatar" | "firstName" | "lastName" | "bio"
>;
