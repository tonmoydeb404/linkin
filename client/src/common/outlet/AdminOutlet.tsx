import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectAuth } from "../../features/auth/authSlice";
import PagePreloader from "../components/preloader/PagePreloader";

const AdminOutlet = () => {
  const { status, user } = useAppSelector(selectAuth);

  if (status === "UNAUTHORIZED") return <Navigate to={"/login"} replace />;

  if (status === "AUTHORIZED" && user?.role !== "ADMIN") {
    return <Navigate to={"/dashboard"} replace />;
  }

  if (status === "AUTHORIZED" && user?.role === "ADMIN") {
    return <Outlet />;
  }

  return <PagePreloader />;
};

export default AdminOutlet;
