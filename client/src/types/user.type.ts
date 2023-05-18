export type UserRole = "ADMIN" | "USER";

export interface IUser {
  _id: string;
  email: string;
  password: string;
  role?: UserRole;
  username: string;
}
