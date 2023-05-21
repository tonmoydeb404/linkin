import { Schema, Types, model } from "mongoose";
import socialSites from "../config/social-sites";
import { ISocial } from "../types/social.type";
import User from "./User";

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
  user: {
    type: Types.ObjectId,
    required: true,
    ref: User.modelName,
  },
});

const Social = model("social", SocialSchema);

export default Social;
