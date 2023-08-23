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
};

export type AuthRegister = Pick<IUser, "email" | "username"> &
  Pick<IProfile, "firstName" | "lastName"> & { password: string };

export type AuthLogin = Pick<IUser, "email"> & { password: string };

export type AuthResponse = {
  payload: AuthPayload;
  token: string;
};

export type AuthError = Partial<Record<keyof AuthRegister, string>>;

export type AuthPasswordReset = {
  password: string;
  token: string;
};

export type AuthPasswordResetRequest = {
  email: string;
};
