import { Menu } from "react-daisyui";
import {
  HiBriefcase,
  HiExternalLink,
  HiUser,
  HiViewGrid,
} from "react-icons/hi";
import { Link, NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex">
      <aside className="w-[250px] py-10 bg-slate-800 min-h-screen text-white">
        <Menu className="bg-slate-800">
          <Menu.Item className="mb-5">
            <Link to={"/profile"} target="_blank">
              <img
                src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
                alt="User Image"
                className="w-[40px] h-[40px] aspect-square rounded-full"
              />
              <span className="text-xl font-semibold">Jhon Doe</span>
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
        </Menu>
      </aside>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
