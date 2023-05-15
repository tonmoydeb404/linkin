import { Schema, Types, model } from "mongoose";
import { ILink } from "../types/link.type";
import User from "./User";

const LinkSchema = new Schema<ILink>({
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  icon: {
    type: String,
    default: null,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
  },
  user: {
    type: Types.ObjectId,
    required: true,
    ref: User.modelName,
  },
});

const Link = model("link", LinkSchema);

export default Link;
