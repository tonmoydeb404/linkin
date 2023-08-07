import { BottomNavigation } from "react-daisyui";
import { HiLogout } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { useLazyAuthLogoutQuery } from "../../../api/authApi";
import { useAppDispatch } from "../../../app/hooks";
import dashboardRoutes from "../../../config/dashboard-routes";
import { authSignout } from "../../../features/auth/authSlice";

type Props = { className?: string };

const MobileNav = ({ className = "" }: Props) => {
  const [logout] = useLazyAuthLogoutQuery();
  const dispatch = useAppDispatch();

  const handleSignout = async () => {
    await logout(undefined);
    dispatch(authSignout());
  };
  return (
    <BottomNavigation className={`${className}`}>
      {dashboardRoutes.map((route) => (
        <NavLink end to={route.path} key={route.path}>
          <route.Icon className="text-lg" />
          {/* <BottomNavigation.Label>{route.title}</BottomNavigation.Label> */}
        </NavLink>
      ))}
      <button onClick={handleSignout}>
        <HiLogout className="text-lg" />
        {/* <BottomNavigation.Label>Logout</BottomNavigation.Label> */}
      </button>
    </BottomNavigation>
  );
};

export default MobileNav;
