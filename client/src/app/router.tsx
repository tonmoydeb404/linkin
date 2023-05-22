import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../common/layouts/DashboardLayout";
import PrivateOutlet from "../common/outlet/PrivateOutlet";
import PublicOutlet from "../common/outlet/PublicOutlet";
import UniOutlet from "../common/outlet/UniOutlet";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import ShortLink from "../pages/ShortLink";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard";
import EditProfile from "../pages/dashboard/EditProfile";
import ManageLinks from "../pages/dashboard/ManageLinks";
import ManageSocials from "../pages/dashboard/ManageSocials";
import NotFound from "../pages/errors/NotFound";

const router = createBrowserRouter([
  {
    element: <PublicOutlet />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
  {
    element: <PrivateOutlet />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          { path: "", element: <Dashboard /> },
          { path: "edit-profile", element: <EditProfile /> },
          { path: "manage-links", element: <ManageLinks /> },
          { path: "manage-socials", element: <ManageSocials /> },
        ],
      },
    ],
  },
  {
    element: <UniOutlet />,
    children: [
      { path: "/l/:slug", element: <ShortLink /> },
      { path: "/:username", element: <Profile /> },
      { path: "/", element: <Home /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
