import getNameInitials from "@/utils/getNameInitials";
import { cn } from "@/utils/ui-utils";
import { HiLogout } from "react-icons/hi";
import { Link, NavLink } from "react-router-dom";
import { useLazyAuthLogoutQuery } from "../../../api/authApi";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import dashboardRoutes from "../../../config/dashboard-routes";
import { logInKey } from "../../../config/localstorage";
import { authSignout, selectAuth } from "../../../features/auth/authSlice";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button, buttonVariants } from "../ui/button";

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
    localStorage.setItem(logInKey, "false");
  };
  return (
    <aside className={`py-10 bg-card px-2 text-white ${className}`}>
      <nav className="flex flex-col  gap-y-1 w-full">
        <Link
          to={`/${user?.username}`}
          target="_blank"
          className="flex items-center gap-2 mb-5"
        >
          <Avatar>
            <AvatarImage src={user?.avatar ?? undefined} />
            <AvatarFallback>
              {getNameInitials(user?.firstName, user?.lastName)}
            </AvatarFallback>
          </Avatar>
          <span className="text-xl font-semibold">
            {user?.firstName} {user?.lastName}
          </span>
        </Link>

        {dashboardRoutes.map((route) => (
          <NavLink
            end
            key={route.path}
            to={route.path}
            className={({ isActive }) =>
              cn(
                buttonVariants({ variant: "ghost" }),
                "justify-start gap-1",
                isActive ? "bg-muted hover:bg-muted" : "hover:bg-muted/30"
              )
            }
          >
            <route.Icon className="text-lg" />
            {route.title}
          </NavLink>
        ))}

        <Button
          variant={"ghost"}
          onClick={handleSignout}
          className="w-full justify-start gap-1"
        >
          <HiLogout className="text-lg" />
          Logout
        </Button>
      </nav>
    </aside>
  );
};

export default Sidebar;
