import { IUser } from "./user.type";

export interface ISocial {
  _id?: string;
  site: string;
  url: string;
  user: string | IUser;
}

export type SocialCreate = Pick<ISocial, "site" | "url" | "user">;

export type SocialUpdate = Partial<Pick<ISocial, "site" | "url">>;
