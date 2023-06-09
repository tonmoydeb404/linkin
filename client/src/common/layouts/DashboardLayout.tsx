import { Outlet } from "react-router-dom";
import MobileNav from "../components/layout/MobileNav";
import Sidebar from "../components/layout/Sidebar";

const DashboardLayout = () => {
  return (
    <>
      <div className="flex">
        <Sidebar className="w-[250px] min-h-screen hidden lg:block" />

        <div className="flex-1">
          <Outlet />
        </div>
      </div>

      <MobileNav className="lg:hidden" />
    </>
  );
};

export default DashboardLayout;
