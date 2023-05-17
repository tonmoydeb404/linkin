import { createBrowserRouter } from "react-router-dom";
import Profile from "../pages/Profile";
import Dashboard from "../pages/dashboard";
import EditProfile from "../pages/dashboard/EditProfile";
import ManageLinks from "../pages/dashboard/ManageLinks";
import ManageSocials from "../pages/dashboard/ManageSocials";
import NotFound from "../pages/errors/NotFound";

const router = createBrowserRouter([
  { path: "/profile", element: <Profile /> },
  {
    path: "/dashboard",
    children: [
      { path: "", element: <Dashboard /> },
      { path: "edit-profile", element: <EditProfile /> },
      { path: "manage-links", element: <ManageLinks /> },
      { path: "manage-socials", element: <ManageSocials /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default router;
