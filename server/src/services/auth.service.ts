import createHttpError from "http-errors";
import { AuthLogin, AuthPayload, AuthRegister } from "../types/auth.type";
import * as profileService from "./profile.service";
import * as userService from "./user.service";

export const register = async ({
  email,
  firstName,
  lastName,
  password,
  username,
}: AuthRegister) => {
  const user = await userService.create({
    email,
    password,
    username,
    role: "USER",
  });
  const profile = await profileService.createProfile({
    firstName,
    lastName,
    user: user.id,
  });
  const { token, payload } = await user.generateRefreshToken();

  return { token, user, profile, payload };
};

export const loginWithEmail = async ({ email, password }: AuthLogin) => {
  // find user
  const user = await userService
    .getOneByProperty("email", email)
    .select("+password");

  if (!user) throw createHttpError(404, "requested user not found");

  // compare password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw createHttpError(401, "Invalid credentials");

  if (user.status === "BANNED")
    throw createHttpError(410, "Account is banned!");

  // generate token
  const { token, payload } = await user.generateRefreshToken();

  return { token, payload, user };
};

export const getAuthPayload = async (id: string) => {
  const user = await userService.getOneByProperty("_id", id);
  const profile = await profileService.getProfileByProperty("user", id);

  if (!user || !profile) throw createHttpError(400, "User not found");

  const payload: AuthPayload = {
    avatar: profile.avatar,
    email: user.email,
    firstName: profile.firstName,
    id: user.id,
    lastName: profile.lastName,
    role: user.role,
    username: user.username,
    status: user.status,
    emailVerfied: user.emailVerified,
  };

  return payload;
};
