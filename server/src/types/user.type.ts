import { Types } from "mongoose";

export type UserRole = "ADMIN" | "USER";
export type UserStatus = "ACTIVE" | "BANNED";
export type UserVerifiedStatus = "NONE" | "DEVELOPER" | "CELEBRITY";

export interface IUser {
  _id: string | Types.ObjectId;
  email: string;
  emailVerified: boolean;
  password: string;
  role: UserRole;
  username: string;
  status: UserStatus;
  verifiedStatus: UserVerifiedStatus;
}

// services types
export type CreateUser = Pick<
  IUser,
  "email" | "password" | "username" | "role"
>;
export type UpdateUser = Partial<IUser>;
