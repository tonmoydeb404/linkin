import createHttpError from "http-errors";
import User from "../models/User";
import { IUser } from "../types/user.type";

export const createUser = ({ email, password, username }: IUser) => {
  const user = new User({ email, password, username });
  return user.save();
};

export const getUserById = (id: string) => {
  return User.findById(id);
};

export const getUserByProperty = (property: string, value: string) => {
  return User.findOne({ [property]: value });
};

export const getAllUsers = () => {
  return User.find({});
};

export const updateUserById = async (id: string, updates: Partial<IUser>) => {
  // find the user
  let user = await getUserById(id);
  if (!user) throw createHttpError(404, "requested user not found");
  // update user
  return User.findByIdAndUpdate(
    id,
    { ...updates },
    { new: true, runValidators: true }
  );
};

export const deleteUserById = async (id: string) => {
  // find the user
  let user = await getUserById(id);
  if (!user) throw createHttpError(404, "requested user not found");
  // delete user
  return User.findByIdAndDelete(id);
};

const userService = {
  createUser,
  getUserById,
  getAllUsers,
  updateUserById,
  deleteUserById,
  getUserByProperty,
};

export default userService;
