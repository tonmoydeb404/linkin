import User from "../models/User";
import { CreateUser, IUser, UpdateUser } from "../types/user.type";

export const getOneByProperty = (property: keyof IUser, value: string) => {
  if (property === "_id") {
    return User.findById(value);
  }
  return User.findOne({ [property]: value });
};

export const getAll = () => {
  return User.find({});
};

export const create = ({ email, password, username, role }: CreateUser) => {
  const user = new User({ email, password, username, role });
  return user.save();
};

export const updateById = (id: string, updates: UpdateUser) => {
  return User.findByIdAndUpdate(
    id,
    { ...updates },
    { new: true, runValidators: true }
  );
};

export const deleteById = (id: string) => {
  return User.findByIdAndDelete(id);
};
