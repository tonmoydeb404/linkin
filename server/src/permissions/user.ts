import { AuthPayload } from "../types/auth.type";
import { IUser } from "../types/user.type";

export const canDelete = (authUser: AuthPayload, user: IUser) => {
  return authUser.id === user._id.toString();
};

export const canChangeStatus = (authUser: AuthPayload, userId: string) => {
  return authUser.role === "ADMIN" && authUser.id !== userId;
};

export const canChangeRole = (authUser: AuthPayload) => {
  return authUser.role === "ADMIN";
};

export const canUpdate = (authUser: AuthPayload, user: IUser) => {
  return authUser.id === user._id.toString();
};

export const canGetAll = (authUser: AuthPayload) => {
  return authUser.role === "ADMIN";
};

export const canGet = (authUser: AuthPayload, user: IUser) => {
  return authUser.role === "ADMIN" || authUser.id === user._id.toString();
};

export const canCreate = (authUser: AuthPayload) => {
  return authUser.role === "ADMIN";
};
