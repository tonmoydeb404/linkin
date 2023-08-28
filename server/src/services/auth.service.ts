import createHttpError from "http-errors";
import { connection } from "../db/connectDB";
import { AuthLogin, AuthPayload, AuthRegister } from "../types/auth.type";
import * as layoutService from "./layout.service";
import * as profileService from "./profile.service";
import * as userService from "./user.service";

// registe a new account
export const register = async ({
  email,
  firstName,
  lastName,
  password,
  username,
}: AuthRegister) => {
  const session = await connection.startSession();
  try {
    session.startTransaction();

    const user = await userService.create(
      {
        email,
        password,
        username,
        role: "USER",
      },
      session
    );
    // create profile for user
    const profile = await profileService.create(
      {
        firstName,
        lastName,
        user: user.id,
      },
      session
    );
    // create layout for user
    const layout = await layoutService.create({ user: user.id }, session);

    await session.commitTransaction();
    await session.endSession();

    const { token, payload } = await user.generateRefreshToken();

    return { token, user, profile, payload, layout };
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    await session.endSession();
    return false;
  }
};

// login using email
export const loginWithEmail = async ({ email, password }: AuthLogin) => {
  // find user
  const user = await userService
    .getByProperty("email", email)
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

// generate auth payload form USER & PROFILE
export const getAuthPayload = async (id: string) => {
  const user = await userService.getByProperty("_id", id);
  const profile = await profileService.getByProperty("user", id);

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
    emailVerified: user.emailVerified,
    verifiedStatus: user.verifiedStatus,
  };

  return payload;
};
