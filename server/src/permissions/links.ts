import { AuthPayload } from "../types/auth.type";
import { ILink } from "../types/link.type";

export const canDelete = (user: AuthPayload, link: ILink) => {
  return user.role === "ADMIN" || user.id === link.user.toString();
};

export const canUpdate = (user: AuthPayload, link: ILink) => {
  return user.id === link.user.toString();
};

export const canGetAll = (user: AuthPayload) => {
  return user.role === "ADMIN";
};
