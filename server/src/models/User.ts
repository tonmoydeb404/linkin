import mongoose from "mongoose";
import roles from "../config/roles";
import { compareHash, generateHash } from "../helpers/hash";
import { generateToken } from "../helpers/token";
import * as authService from "../services/auth";
import { AuthPayload } from "../types/auth.type";
import { IUser } from "../types/user.type";

export interface IUserMethods {
  generateToken(): Promise<{ token: string; payload: AuthPayload }>;
  comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema = new mongoose.Schema<IUser, {}, IUserMethods>(
  {
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: roles,
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

const User = mongoose.model("user", UserSchema);

export default User;
