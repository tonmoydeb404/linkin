import mongoose from "mongoose";
import { compareHash, generateHash } from "../helpers/hash";
import { generateToken } from "../helpers/token";
import { IUser, IUserToken } from "../types/user.type";

export interface IUserMethods {
  generateToken: () => Promise<string>;
  comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema = new mongoose.Schema<IUser, {}, IUserMethods>(
  {
    email: { type: String, required: true, unique: true },
    roles: {
      type: [
        {
          type: String,
          enum: ["ADMIN", "EDITOR", "USER"],
        },
      ],
      default: ["USER"],
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
UserSchema.methods.generateToken = function () {
  const payload: IUserToken = {
    id: this._id,
    email: this.email,
    roles: this.roles,
    username: this.username,
  };
  return generateToken(payload, "1d");
};

// compare password
UserSchema.methods.comparePassword = function (password: string) {
  return compareHash(password, this.password);
};

const User = mongoose.model("user", UserSchema);

export default User;
