import DashboardLayout from "@/common/layouts/DashboardLayout";
import AdminOutlet from "@/common/outlet/AdminOutlet";
import PrivateOutlet from "@/common/outlet/PrivateOutlet";
import PublicOutlet from "@/common/outlet/PublicOutlet";
import { createBrowserRouter } from "react-router-dom";
// ERROR PAGES
import ErrorPage from "@/pages/errors/ErrorPage";
import NotFound from "@/pages/errors/NotFound";
// PUBLIC PAGES
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import ShortLink from "@/pages/ShortLink";
// AUTH PAGES
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
// DASHBOARD PAGES
import Dashboard from "@/pages/dashboard";
// SETTINGS PAGES
import ChangePassword from "@/pages/dashboard/settings/ChangePassword";
import ChangeUsername from "@/pages/dashboard/settings/ChangeUsername";
// ADMIN PAGES
import AllLinks from "@/pages/dashboard/admin/AllLinks";
import AllSocials from "@/pages/dashboard/admin/AllSocials";
import AllUsers from "@/pages/dashboard/admin/AllUsers";
// USER PAGES
import EditProfile from "@/pages/dashboard/user/EditProfile";
import ManageLinks from "@/pages/dashboard/user/ManageLinks";
import ManageSocials from "@/pages/dashboard/user/ManageSocials";

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
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            element: <PrivateOutlet />,
            children: [
              { path: "", element: <Dashboard /> },
              { path: "edit-profile", element: <EditProfile /> },
              { path: "manage-links", element: <ManageLinks /> },
              { path: "manage-socials", element: <ManageSocials /> },
              // account routes
              { path: "change-password", element: <ChangePassword /> },
              { path: "change-username", element: <ChangeUsername /> },
            ],
          },
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
      { path: "/l/:slug", element: <ShortLink /> },
      { path: "/:username", element: <Profile /> },
      { path: "/", element: <Home /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
