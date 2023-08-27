import { Schema, Types, model } from "mongoose";
import { ILayout, LayoutStyle, LayoutTheme } from "../types/layout.type";
import User from "./User";

export const layoutThemes: LayoutTheme[] = ["DARK", "LIGHT", "SYSTEM"];
export const layoutStyles: LayoutStyle[] = ["CIRCULAR", "ROUNDED", "SQUARE"];

const layoutSchema = new Schema<ILayout>({
  theme: {
    type: String,
    enum: layoutThemes,
    default: "SYSTEM",
    required: true,
  },
  style: {
    type: String,
    enum: layoutStyles,
    default: "ROUNDED",
    required: true,
  },
  primaryColor: {
    type: String,
    default: null,
  },
  contentColor: {
    type: String,
    default: null,
  },
  user: {
    type: Types.ObjectId,
    ref: User.modelName,
    required: true,
    unique: true,
  },
});

const Layout = model("layout", layoutSchema);

export default Layout;
