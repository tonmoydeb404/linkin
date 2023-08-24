import mongoose from "mongoose";
import { compareHash, generateHash } from "../helpers/hash";
import { generateToken } from "../helpers/token";
import * as authService from "../services/auth";
import { AuthPayload } from "../types/auth.type";
import { IUser, UserRole, UserStatus } from "../types/user.type";

export const userStatus: UserStatus[] = ["ACTIVE", "BANNED"];
export const userRoles: UserRole[] = ["ADMIN", "USER"];

export interface IUserMethods {
  comparePassword: (password: string) => Promise<boolean>;
  generateRefreshToken(): Promise<{ token: string; payload: AuthPayload }>;
  generatePasswordResetToken(): string;
}

const UserSchema = new mongoose.Schema<IUser, {}, IUserMethods>(
  {
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
UserSchema.pre("findOneAndUpdate", async function () {
  const data: Record<string, any> = this.getUpdate();
  if (data?.password) {
    const hashedPassword = await generateHash(data.password);
    data.password = hashedPassword;
  }
});

// generating token
UserSchema.methods.generateRefreshToken = async function () {
  const payload = await authService.getAuthPayload(this._id);
  const token = generateToken(payload, "1d", this.password);
  return { token, payload };
};

// compare password
UserSchema.methods.comparePassword = function (password: string) {
  return compareHash(password, this.password);
};

// generate password reset token
UserSchema.methods.generatePasswordResetToken = function (): string {
  return generateToken({ id: this._id }, "1h");
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
