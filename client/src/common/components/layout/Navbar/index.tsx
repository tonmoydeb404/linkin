import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectAuth } from "@/features/auth/authSlice";
import { sidebarToggle } from "@/features/sidebar/sidebarSlice";
import { MenuIcon } from "lucide-react";
import { HiGlobe } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import AccountButton from "./AccountButton";
import ThemeButton from "./ThemeButton";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);

  return (
    <nav className="flex items-center px-5 py-2 border-b dark:border-b-secondary sticky top-0 bg-background z-50 gap-2">
      <Button
        size={"icon"}
        variant={"ghost"}
        onClick={() => dispatch(sidebarToggle())}
        className="lg:hidden"
      >
        <MenuIcon />
      </Button>
      <Button variant={"outline"} asChild>
        <Link to={`/${user?.username}`}>
          <HiGlobe className="text-lg mr-1" />
          Visit Website
        </Link>
      </Button>
      <div className="ml-auto flex items-center gap-4">
        <ThemeButton />
        <AccountButton />
      </div>
    </nav>
  );
};

export default Navbar;
