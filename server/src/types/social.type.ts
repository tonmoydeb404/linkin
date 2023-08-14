import { IUser } from "./user.type";

export type SocialStatus = "ACTIVE" | "BANNED";

export interface ISocial {
  _id: string;
  site: string;
  url: string;
  user: string | IUser;
  status: SocialStatus;
}

export type SocialCreate = Pick<ISocial, "site" | "url" | "user">;

export type SocialUpdate = Partial<Pick<ISocial, "site" | "url" | "status">>;
