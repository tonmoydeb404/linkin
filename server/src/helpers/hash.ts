import { compare, genSalt, hash } from "bcryptjs";

export const generateHash = async (context: string) => {
  const salt = await genSalt(10);
  return hash(context, salt);
};

export const compareHash = (context: string, hash: string) => {
  return compare(context, hash);
};
