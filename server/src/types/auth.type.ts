import { IProfile } from "./profile.type";
import { IUser } from "./user.type";

export type AuthPayload = Pick<
  IUser,
  "email" | "emailVerified" | "role" | "status" | "username" | "verifiedStatus"
> &
  Pick<IProfile, "firstName" | "lastName" | "avatar"> & {
    id: string;
  };

export type AuthRegister = Pick<IUser, "email" | "password" | "username"> &
  Pick<IProfile, "firstName" | "lastName">;

export type AuthLogin = Pick<IUser, "email" | "password">;
