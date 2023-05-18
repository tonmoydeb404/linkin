import { Menu } from "react-daisyui";
import {
  HiBriefcase,
  HiExternalLink,
  HiLogout,
  HiUser,
  HiViewGrid,
} from "react-icons/hi";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useLazyAuthLogoutQuery } from "../../api/authApi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { authSignout, selectAuth } from "../../features/auth/authSlice";

const DashboardLayout = () => {
  const [logout] = useLazyAuthLogoutQuery();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);

  const handleSignout = async () => {
    await logout(undefined);
    dispatch(authSignout());
  };

  return (
    <div className="flex">
      <aside className="w-[250px] py-10 bg-slate-800 min-h-screen text-white">
        <Menu className="bg-slate-800">
          <Menu.Item className="mb-5">
            <Link to={"/profile"} target="_blank">
              <img
                src={
                  user?.avatar ||
                  "https://api.dicebear.com/6.x/fun-emoji/svg?seed=Bailey"
                }
                alt="User Image"
                className="w-[40px] h-[40px] aspect-square rounded-full"
              />
              <span className="text-xl font-semibold">
                {user?.firstName} {user?.lastName}
              </span>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <NavLink end to={"/dashboard"}>
              <HiViewGrid className="text-lg" />
              Dashboard
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink end to={"/dashboard/edit-profile"}>
              <HiUser className="text-lg" />
              Edit Profile
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink end to={"/dashboard/manage-socials"}>
              <HiBriefcase className="text-lg" />
              Manage Socials
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink end to={"/dashboard/manage-links"}>
              <HiExternalLink className="text-lg" />
              Manage Links
            </NavLink>
          </Menu.Item>
          <Menu.Item onClick={handleSignout}>
            <span>
              <HiLogout className="text-lg" />
              Logout
            </span>
          </Menu.Item>
        </Menu>
      </aside>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
