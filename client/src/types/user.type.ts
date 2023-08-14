import { LinkinApiResponse } from "./linkinApi.type";

export type UserRole = "ADMIN" | "USER";
export type UserStatus = "ACTIVE" | "BANNED";

export interface IUser {
  _id: string;
  email: string;
  role: UserRole;
  username: string;
  status: UserStatus;
}

export type UsersResponse = LinkinApiResponse<IUser[]>;
export type UserResponse = LinkinApiResponse<IUser>;
export type UpdateUserRole = {
  user_id: string;
  role: UserRole;
};
