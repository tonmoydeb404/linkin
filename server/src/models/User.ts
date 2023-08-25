import mongoose from "mongoose";
import { compareHash, generateHash } from "../helpers/hash";
import { generateToken } from "../helpers/token";
import * as authService from "../services/auth.service";
import { AuthPayload } from "../types/auth.type";
import {
  EmailVerificationPayload,
  PasswordResetPayload,
} from "../types/common.type";
import { IUser, UserRole, UserStatus } from "../types/user.type";

export const userStatus: UserStatus[] = ["ACTIVE", "BANNED"];
export const userRoles: UserRole[] = ["ADMIN", "USER"];

export interface IUserMethods {
  comparePassword: (password: string) => Promise<boolean>;
  generateRefreshToken(): Promise<{ token: string; payload: AuthPayload }>;
  generatePasswordResetToken(): {
    token: string;
    payload: PasswordResetPayload;
  };
  generateEmailVerificationToken(): {
    token: string;
    payload: EmailVerificationPayload;
  };
}

const UserSchema = new mongoose.Schema<IUser, {}, IUserMethods>(
  {
    email: { type: String, required: true, unique: true },
    emailVerified: { type: Boolean, required: true, default: false },
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

// password hashing on save
UserSchema.pre("save", async function (next) {
  // avoid hashing if password is not modified
  if (!this.isModified("password")) return next();
  // continue hashing
  const hashedPassword = await generateHash(this.password);
  this.password = hashedPassword;
});

// password hash on update
UserSchema.pre("findOneAndUpdate", async function () {
  const data: Record<string, any> = this.getUpdate();
  if (data?.password) {
    const hashedPassword = await generateHash(data.password);
    data.password = hashedPassword;
  }
});

// compare password with hash
UserSchema.methods.comparePassword = function (password: string) {
  return compareHash(password, this.password);
};

// generating refresh token
UserSchema.methods.generateRefreshToken = async function () {
  const payload = await authService.getAuthPayload(this._id);
  const token = generateToken(payload, "1d", this.password);
  return { token, payload };
};

// generate password reset token
UserSchema.methods.generatePasswordResetToken = function () {
  const payload: PasswordResetPayload = { id: this._id };
  const token = generateToken(payload, "1h", this.password);

  return { token, payload };
};

// generate email verification token
UserSchema.methods.generateEmailVerificationToken = function () {
  const payload: EmailVerificationPayload = { id: this._id, email: this.email };
  const token = generateToken(payload, "1h");
  return { token, payload };
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
