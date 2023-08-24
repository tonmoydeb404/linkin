import User from "../models/User";
import { IUser } from "../types/user.type";

export const createUser = ({
  email,
  password,
  username,
}: Omit<IUser, "status">) => {
  const user = new User({ email, password, username });
  return user.save();
};

export const getUserByProperty = (property: keyof IUser, value: string) => {
  if (property === "_id") {
    return User.findById(value);
  }
  return User.findOne({ [property]: value });
};

export const getAllUsers = () => {
  return User.find({});
};

export const updateUserById = (id: string, updates: Partial<IUser>) =>
  User.findByIdAndUpdate(
    id,
    { ...updates },
    { new: true, runValidators: true }
  );

export const deleteUserById = (id: string) => {
  return User.findByIdAndDelete(id);
};
