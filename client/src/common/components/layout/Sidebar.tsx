import { selectAuth } from "@/features/auth/authSlice";
import { sidebarClose } from "@/features/sidebar/sidebarSlice";
import { cn } from "@/utils/ui-utils";
import { HiViewGrid } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { adminRoutes, userRoutes } from "../../../config/dashboard-routes";
import { buttonVariants } from "../ui/button";

type Props = {
  className?: string;
};

const Sidebar = ({ className = "" }: Props) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);

  return (
    <aside className={`py-10 px-2 ${className}`}>
      <div className="flex flex-col  gap-y-1 w-full">
        <NavLink
          end
          to={""}
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
          <HiViewGrid className="text-lg" />
          Dashboard
        </NavLink>

        <h2 className="mb-1 mt-5 px-4 text-lg font-semibold tracking-tight">
          User
        </h2>
        {userRoutes.map((route) => (
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

        {user?.role === "ADMIN" ? (
          <>
            <h2 className="mb-1 mt-5 px-4 text-lg font-semibold tracking-tight">
              Admin
            </h2>
            {adminRoutes.map((route) => (
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
          </>
        ) : null}
      </div>
    </aside>
  );
};

export default Sidebar;
