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
    username: { type: String, required: true, unique: true },
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
    username: this.username,
    email: this.email,
    roles: this.roles,
  };
  return generateToken(payload, 30);
};

// compare password
UserSchema.methods.comparePassword = function (password: string) {
  return compareHash(password, this.password);
};

const User = mongoose.model("User", UserSchema);

export default User;
