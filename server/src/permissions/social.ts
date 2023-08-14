import { AuthPayload } from "../types/auth.type";
import { ISocial } from "../types/social.type";

export const canDelete = (authUser: AuthPayload, social: ISocial) => {
  return authUser.id === social.user.toString();
};

export const canUpdate = (authUser: AuthPayload, social: ISocial) => {
  return authUser.id === social.user.toString();
};

export const canGetAll = (authUser: AuthPayload) => {
  return authUser.role === "ADMIN";
};

export const canBan = (authUser: AuthPayload) => {
  return authUser.role === "ADMIN";
};
