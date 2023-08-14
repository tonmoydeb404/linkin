import mongoose from "mongoose";
import { PROFILE_AVATAR } from "../config/default";
import { IProfile } from "../types/profile.type";
import Link from "./Link";
import Social from "./Social";
import User from "./User";

const ProfileSchema = new mongoose.Schema<IProfile>({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
  },
  avatar: {
    type: String,
    default: PROFILE_AVATAR,
    required: true,
  },
  bio: {
    type: String,
    default: null,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User.modelName,
    unique: true,
  },
});

ProfileSchema.virtual("links", {
  ref: Link.modelName,
  localField: "user",
  foreignField: "user",
  match: { status: "ACTIVE" },
});

ProfileSchema.virtual("socials", {
  ref: Social.modelName,
  localField: "user",
  foreignField: "user",
  match: { status: "ACTIVE" },
});

const Profile = mongoose.model("profile", ProfileSchema);

export default Profile;
