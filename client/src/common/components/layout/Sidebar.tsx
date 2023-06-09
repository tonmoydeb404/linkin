import { Menu } from "react-daisyui";
import { HiLogout } from "react-icons/hi";
import { Link, NavLink } from "react-router-dom";
import { useLazyAuthLogoutQuery } from "../../../api/authApi";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import dashboardRoutes from "../../../config/dashboard-routes";
import { authSignout, selectAuth } from "../../../features/auth/authSlice";

type Props = {
  className?: string;
};

const Sidebar = ({ className = "" }: Props) => {
  const [logout] = useLazyAuthLogoutQuery();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);

  const handleSignout = async () => {
    await logout(undefined);
    dispatch(authSignout());
  };
  return (
    <aside className={`py-10 bg-slate-800 text-white ${className}`}>
      <Menu className="bg-slate-800">
        <Menu.Item className="mb-5">
          <Link to={`/${user?.username}`} target="_blank">
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
        {dashboardRoutes.map((route) => (
          <Menu.Item>
            <NavLink end to={route.path}>
              <route.Icon className="text-lg" />
              {route.title}
            </NavLink>
          </Menu.Item>
        ))}

        <Menu.Item onClick={handleSignout}>
          <span>
            <HiLogout className="text-lg" />
            Logout
          </span>
        </Menu.Item>
      </Menu>
    </aside>
  );
};

export default Sidebar;
