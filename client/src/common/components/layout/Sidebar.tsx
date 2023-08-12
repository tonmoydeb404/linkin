import { sidebarClose } from "@/features/sidebar/sidebarSlice";
import { cn } from "@/utils/ui-utils";
import { HiLogout } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { useLazyAuthLogoutQuery } from "../../../api/authApi";
import { useAppDispatch } from "../../../app/hooks";
import dashboardRoutes from "../../../config/dashboard-routes";
import { logInKey } from "../../../config/localstorage";
import { authSignout } from "../../../features/auth/authSlice";
import { Button, buttonVariants } from "../ui/button";

type Props = {
  className?: string;
};

const Sidebar = ({ className = "" }: Props) => {
  const [logout] = useLazyAuthLogoutQuery();
  const dispatch = useAppDispatch();

  const handleSignout = async () => {
    await logout(undefined);
    dispatch(authSignout());
    localStorage.setItem(logInKey, "false");
  };
  return (
    <aside className={`py-10 px-2 ${className}`}>
      <div className="flex flex-col  gap-y-1 w-full">
        {dashboardRoutes.map((route) => (
          <NavLink
            end
            key={route.path}
            to={route.path}
            className={({ isActive }) =>
              cn(
                buttonVariants({ variant: "ghost" }),
                "justify-start gap-1",
                isActive
                  ? "bg-secondary-foreground text-secondary hover:bg-secondary-foreground hover:text-secondary dark:bg-secondary dark:text-secondary-foreground dark:hover:bg-secondary"
                  : "hover:bg-secondary-foreground/10 dark:hover:bg-secondary/30"
              )
            }
            onClick={() => dispatch(sidebarClose())}
          >
            <route.Icon className="text-lg" />
            {route.title}
          </NavLink>
        ))}

        <Button
          variant={"ghost"}
          onClick={() => {
            handleSignout();
            dispatch(sidebarClose());
          }}
          className="w-full justify-start gap-1 hover:bg-secondary-foreground/10 dark:hover:bg-secondary/30"
        >
          <HiLogout className="text-lg" />
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
