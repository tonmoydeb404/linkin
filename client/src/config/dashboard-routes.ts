import { IconType } from "react-icons";
import {
  HiBriefcase,
  HiExternalLink,
  HiUser,
  HiViewGrid,
} from "react-icons/hi";

type DashboardRoute = { title: string; path: string; Icon: IconType };

const dashboardRoutes: DashboardRoute[] = [
  { title: "Dashboard", path: "", Icon: HiViewGrid },
  { title: "Edit Profile", path: "/dashboard/edit-profile", Icon: HiUser },
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

export default dashboardRoutes;
