import createHttpError from "http-errors";
import userService from "./user";

export const loginWithEmail = async (data: {
  email: string;
  password: string;
}) => {
  // find user
  const user = await userService
    .getUserByProperty("email", data.email)
    .select("+password");
  if (!user) throw createHttpError(404, "requested user not found");

  // compare password
  const isMatch = await user.comparePassword(data.password);
  if (!isMatch) throw createHttpError(401, "Invalid credentials");

  return user;
};
