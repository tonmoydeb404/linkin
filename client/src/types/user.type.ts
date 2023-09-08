import { LinkinApiResponse } from "./linkinApi.type";

export type UserRole = "ADMIN" | "USER";
export type UserStatus = "ACTIVE" | "BANNED";
export type UserVerifiedStatus = "NONE" | "DEVELOPER" | "CELEBRITY";

export interface IUser {
  _id: string;
  email: string;
  role: UserRole;
  username: string;
  status: UserStatus;
  emailVerified: boolean;
  verifiedStatus: UserVerifiedStatus;
}

export type UsersResponse = LinkinApiResponse<IUser[]>;
export type UserResponse = LinkinApiResponse<IUser>;
export type UpdateUserRole = {
  user_id: string;
  role: UserRole;
};
export type UpdateUsername = {
  username: string;
  confirmPassword: string;
  user_id: string;
};
export type UpdatePassword = {
  old_password: string;
  new_password: string;
};
export type UpdateVerifiedStatus = {
  user_id: string;
  verified_status: UserVerifiedStatus;
};
export type DeleteUser = {
  user_id: string;
  confirmPassword: string;
};
