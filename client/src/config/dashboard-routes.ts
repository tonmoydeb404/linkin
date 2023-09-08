import { IconType } from "react-icons";
import {
  HiAtSymbol,
  HiBriefcase,
  HiExternalLink,
  HiLockClosed,
  HiRefresh,
  HiTrash,
  HiUser,
  HiUsers,
  HiViewGridAdd,
} from "react-icons/hi";

type DashboardRoute = { title: string; path: string; Icon: IconType };

export const userRoutes: DashboardRoute[] = [
  { title: "Edit Profile", path: "/dashboard/edit-profile", Icon: HiUser },
  {
    title: "Edit Layout",
    path: "/dashboard/edit-layout",
    Icon: HiViewGridAdd,
  },
  {
    title: "Manage Socials",
    path: "/dashboard/manage-socials",
    Icon: HiBriefcase,
  },
  {
    title: "Manage Links",
    path: "/dashboard/manage-links",
    Icon: HiExternalLink,
  },
];

export const adminRoutes: DashboardRoute[] = [
  { title: "All Users", path: "/dashboard/all-users", Icon: HiUsers },
  {
    title: "All Links",
    path: "/dashboard/all-links",
    Icon: HiExternalLink,
  },
  {
    title: "All Socials",
    path: "/dashboard/all-socials",
    Icon: HiBriefcase,
  },
];

export const settingRoutes: DashboardRoute[] = [
  {
    path: "/dashboard/change-username",
    title: "Change username",
    Icon: HiAtSymbol,
  },
  {
    path: "/dashboard/change-password",
    title: "Change Password",
    Icon: HiLockClosed,
  },
  {
    path: "/reset-password",
    title: "Reset Password",
    Icon: HiRefresh,
  },
  {
    path: "/dashboard/delete-account",
    title: "Delete Account",
    Icon: HiTrash,
  },
];
