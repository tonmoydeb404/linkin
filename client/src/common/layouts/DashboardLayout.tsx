import { Outlet } from "react-router-dom";
import MobileSidebar from "../components/layout/MobileSidebar";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

const DashboardLayout = () => {
  return (
    <>
      <div className="flex flex-auto">
        <Sidebar className="w-[250px] min-w-[250px] h-screen hidden lg:block  sticky top-0" />
        <div className="flex flex-col flex-auto min-h-screen relative w-full lg:border-l dark:border-l-secondary">
          <Navbar />
          <div className="h-full flex flex-col flex-auto justify-between">
            <main className="h-full px-4 py-10 lg:px-7">
              <Outlet />
            </main>
          </div>
        </div>
      </div>

      <MobileSidebar className="w-[270px] p-0" />
    </>
  );
};

export default DashboardLayout;
