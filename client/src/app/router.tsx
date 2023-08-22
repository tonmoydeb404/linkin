import AdminOutlet from "@/common/outlet/AdminOutlet";
import AllLinks from "@/pages/dashboard/AllLinks";
import AllSocials from "@/pages/dashboard/AllSocials";
import AllUsers from "@/pages/dashboard/AllUsers";
import ErrorPage from "@/pages/errors/ErrorPage";
import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../common/layouts/DashboardLayout";
import PrivateOutlet from "../common/outlet/PrivateOutlet";
import PublicOutlet from "../common/outlet/PublicOutlet";
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
    errorElement: <ErrorPage />,
    children: [
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
              {
                element: <AdminOutlet />,
                children: [
                  { path: "all-users", element: <AllUsers /> },
                  { path: "all-links", element: <AllLinks /> },
                  { path: "all-socials", element: <AllSocials /> },
                ],
              },
            ],
          },
        ],
      },
      { path: "/l/:slug", element: <ShortLink /> },
      { path: "/:username", element: <Profile /> },
      { path: "/", element: <Home /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
