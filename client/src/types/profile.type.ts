import { IUser } from "./user.type";

export interface IProfile {
  _id: string;
  firstName: string;
  lastName: string;
  avatar?: string | null;
  bio?: string | null;
  user: IUser | string;
}
