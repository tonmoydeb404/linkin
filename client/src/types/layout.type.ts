import { LinkinApiResponse } from "./linkinApi.type";
import { IUser } from "./user.type";

export enum LayoutThemeEnum {
  DARK = "DARK",
  LIGHT = "LIGHT",
  SYSTEM = "SYSTEM",
}
export enum LayoutStyleEnum {
  SQUARE = "SQUARE",
  ROUNDED = "ROUNDED",
  CIRCULAR = "CIRCULAR",
}

export type LayoutTheme = keyof typeof LayoutThemeEnum;
export type LayoutStyle = keyof typeof LayoutStyleEnum;

export interface ILayout<T = IUser | string> {
  _id: string;
  defaultTheme: LayoutTheme;
  style: LayoutStyle;
  color: string | null;
  user: T;
}

export type LayoutResponse = LinkinApiResponse<ILayout<string>>;
export type LayoutUpdate = Partial<
  Pick<ILayout, "defaultTheme" | "style" | "color">
>;
