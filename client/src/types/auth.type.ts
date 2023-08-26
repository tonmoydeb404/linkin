import { LinkinApiResponse } from "./linkinApi.type";
import { IProfile } from "./profile.type";
import { IUser, UserRole, UserStatus } from "./user.type";

export type AuthPayload = {
  id: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  username: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  emailVerified: boolean;
};

// Auth Argument Types
export type AuthRegister = Pick<IUser, "email" | "username"> &
  Pick<IProfile, "firstName" | "lastName"> & { password: string };

export type AuthLogin = Pick<IUser, "email"> & { password: string };

export type AuthPasswordReset = {
  password: string;
  token: string;
};

export type AuthPasswordResetRequest = {
  email: string;
};

export type AuthVerifyEmail = {
  token: string;
};

// Auth Response Types
export type AuthResponse = LinkinApiResponse<{
  payload: AuthPayload;
  token: string;
}>;

export type AuthError = Partial<Record<keyof AuthRegister, string>>;

export type AuthPasswordResetResponse = LinkinApiResponse<IUser>;

export type AuthPasswordResetRequestResponse = LinkinApiResponse<{
  payload: {
    id: string;
  };
  mailSent: boolean;
}>;

export type AuthVerifyEmailResponse = LinkinApiResponse<IUser>;

export type AuthVerifyEmailRequestResponse = LinkinApiResponse<{
  payload: {
    id: string;
    email: string;
  };
  mailSent: boolean;
}>;

// Auth Slice Types
export type AuthSlice = {
  user: AuthPayload | null;
  status: "LOADING" | "AUTHORIZED" | "UNAUTHORIZED";
};

export type AuthSliceUpdate = Partial<
  Pick<
    AuthPayload,
    "firstName" | "lastName" | "avatar" | "username" | "emailVerified"
  >
>;
