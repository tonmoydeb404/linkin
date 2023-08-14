import mongoose from "mongoose";
import { compareHash, generateHash } from "../helpers/hash";
import { generateToken } from "../helpers/token";
import * as authService from "../services/auth";
import { AuthPayload } from "../types/auth.type";
import { IUser, UserRole, UserStatus } from "../types/user.type";

export const userStatus: UserStatus[] = ["ACTIVE", "BANNED"];
export const userRoles: UserRole[] = ["ADMIN", "USER"];

export interface IUserMethods {
  generateToken(): Promise<{ token: string; payload: AuthPayload }>;
  comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema = new mongoose.Schema<IUser, {}, IUserMethods>(
  {
    _id: mongoose.Types.ObjectId,
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: userRoles,
      default: "USER",
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: userStatus,
      default: "ACTIVE",
    },
  },
  { timestamps: true }
);

// password hashing
UserSchema.pre("save", async function () {
  const hashedPassword = await generateHash(this.password);
  this.password = hashedPassword;
});

// generating token
UserSchema.methods.generateToken = async function () {
  const payload = await authService.getAuthPayload(this._id);
  const token = await generateToken(payload, "1d");
  return { token, payload };
};

// compare password
UserSchema.methods.comparePassword = function (password: string) {
  return compareHash(password, this.password);
};

// Virtual Profile
UserSchema.virtual("profile", {
  ref: "profile",
  localField: "_id",
  foreignField: "user",
  justOne: true,
});

const User = mongoose.model("user", UserSchema);

export default User;
