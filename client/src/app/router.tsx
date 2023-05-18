import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../common/layouts/DashboardLayout";
import PrivateOutlet from "../common/outlet/PrivateOutlet";
import PublicOutlet from "../common/outlet/PublicOutlet";
import Profile from "../pages/Profile";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard";
import EditProfile from "../pages/dashboard/EditProfile";
import ManageLinks from "../pages/dashboard/ManageLinks";
import ManageSocials from "../pages/dashboard/ManageSocials";
import NotFound from "../pages/errors/NotFound";

const router = createBrowserRouter([
  { path: "/profile", element: <Profile /> },
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
  { path: "*", element: <NotFound /> },
]);

export default router;
