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
  return User.findByIdAndUpdate(
    id,
    { ...updates },
    { new: true, runValidators: true }
  );
};

export const deleteUserById = async (id: string) => {
  return User.findByIdAndDelete(id);
};
