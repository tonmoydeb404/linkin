import { Schema, Types, model } from "mongoose";
import socialSites from "../config/social-sites";
import { ISocial, SocialStatus } from "../types/social.type";
import User from "./User";

const socialStatuses: SocialStatus[] = ["ACTIVE", "BANNED"];

const SocialSchema = new Schema<ISocial>({
  site: {
    type: String,
    required: true,
    enum: socialSites,
  },
  url: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: socialStatuses,
    default: "ACTIVE",
  },
  user: {
    type: Types.ObjectId,
    required: true,
    ref: User.modelName,
  },
});

const Social = model("social", SocialSchema);

export default Social;
