import createHttpError from "http-errors";
import { AuthLogin, AuthPayload, AuthRegister } from "../types/auth.type";
import * as profileService from "./profile";
import * as userService from "./user";

export const register = async ({
  email,
  firstName,
  lastName,
  password,
  username,
}: AuthRegister) => {
  const user = await userService.createUser({ email, password, username });
  const profile = await profileService.createProfile({
    firstName,
    lastName,
    user: user.id,
  });
  const { token, payload } = await user.generateToken();

  return { token, user, profile, payload };
};

export const loginWithEmail = async ({ email, password }: AuthLogin) => {
  // find user
  const user = await userService
    .getUserByProperty("email", email)
    .select("+password");
  if (!user) throw createHttpError(404, "requested user not found");

  // compare password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw createHttpError(401, "Invalid credentials");

  // generate token
  const { token, payload } = await user.generateToken();

  return { token, payload, user };
};

export const getAuthPayload = async (id: string) => {
  const user = await userService.getUserByProperty("_id", id);
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
  };

  return payload;
};
