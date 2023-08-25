import User from "../models/User";
import { CreateUser, IUser, UpdateUser } from "../types/user.type";

// filter by user property & get a single user
export const getByProperty = (property: keyof IUser, value: string) => {
  if (property === "_id") {
    return User.findById(value);
  }
  return User.findOne({ [property]: value });
};

// get all user
export const getAll = () => {
  return User.find({});
};

// create a user
export const create = ({ email, password, username, role }: CreateUser) => {
  const user = new User({ email, password, username, role });
  return user.save();
};

// update user by id
export const updateById = (id: string, updates: UpdateUser) => {
  return User.findByIdAndUpdate(
    id,
    { ...updates },
    { new: true, runValidators: true }
  );
};

// delete user by id
export const deleteById = (id: string) => {
  return User.findByIdAndDelete(id);
};
