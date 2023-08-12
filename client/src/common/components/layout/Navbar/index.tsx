import { useAppDispatch } from "@/app/hooks";
import { sidebarToggle } from "@/features/sidebar/sidebarSlice";
import { MenuIcon } from "lucide-react";
import { Button } from "../../ui/button";
import AccountButton from "./AccountButton";
import ThemeButton from "./ThemeButton";

const Navbar = () => {
  const dispatch = useAppDispatch();

  return (
    <nav className="flex items-center px-5 py-2 border-b dark:border-b-secondary sticky top-0 bg-background z-50">
      <Button
        size={"icon"}
        variant={"ghost"}
        onClick={() => dispatch(sidebarToggle())}
        className="lg:hidden"
      >
        <MenuIcon />
      </Button>
      <div className="ml-auto flex items-center gap-4">
        <ThemeButton />
        <AccountButton />
      </div>
    </nav>
  );
};

export default Navbar;
