export type UserRole = "ADMIN" | "EDITOR" | "USER";

export interface IUser {
  email: string;
  username: string;
  password: string;
  roles?: UserRole[];
}

export interface IUserToken {
  email: string;
  username: string;
  roles: UserRole[];
}
