import { Types } from "mongoose";

export type UserRole = "ADMIN" | "USER";

export interface IUser {
  _id?: string | Types.ObjectId;
  email: string;
  password: string;
  role?: UserRole;
  username: string;
}
