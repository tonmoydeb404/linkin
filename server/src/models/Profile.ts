import mongoose from "mongoose";
import { IProfile } from "../types/profile.type";
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
    default: null,
  },
  bio: {
    type: String,
    default: null,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: User.modelName,
    unique: true,
  },
});

const Profile = mongoose.model("profile", ProfileSchema);

export default Profile;
