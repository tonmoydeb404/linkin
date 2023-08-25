import { Types } from "mongoose";
import { IUser } from "./user.type";

export type LayoutTheme = "DARK" | "LIGHT" | "SYSTEM";
export type LayoutStyle = "SQUARE" | "ROUNDED" | "CIRCULAR";

export interface ILayout {
  _id: string | Types.ObjectId;
  defaultTheme: LayoutTheme;
  style: LayoutStyle;
  color: string | null;
  user: string | IUser;
}

// services types
export type LayoutCreate = Partial<Omit<ILayout, "_id">>;
