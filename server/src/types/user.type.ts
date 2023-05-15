export type UserRole = "ADMIN" | "EDITOR" | "USER";

export interface IUser {
  email: string;
  password: string;
  roles?: UserRole[];
  username: string;
}
