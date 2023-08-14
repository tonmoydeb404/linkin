import { AuthPayload } from "../types/auth.type";
import { ILink } from "../types/link.type";

export const canDelete = (authUser: AuthPayload, link: ILink) => {
  return authUser.role === "ADMIN" || authUser.id === link.user.toString();
};

export const canUpdate = (authUser: AuthPayload, link: ILink) => {
  return authUser.id === link.user.toString();
};

export const canGetAll = (authUser: AuthPayload) => {
  return authUser.role === "ADMIN";
};

export const canBan = (authUser: AuthPayload) => {
  return authUser.role === "ADMIN";
};
