import { IProfile } from "./profile.type";
import { IUser, UserRole } from "./user.type";

export type AuthPayload = {
  id: string;
  email: string;
  role: UserRole;
  username: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
};

export type AuthRegister = Pick<IUser, "email" | "password" | "username"> &
  Pick<IProfile, "firstName" | "lastName">;

export type AuthLogin = Pick<IUser, "email" | "password">;
