import { IUser } from "./user.type";

export interface ILink {
  _id: string;
  title: string;
  url: string;
  icon?: string | null;
  slug: string;
  user: string | IUser;
  clicks?: number;
}
