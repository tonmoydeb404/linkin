import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectAuth } from "../../features/auth/authSlice";
import AuthPreloader from "../components/preloader/AuthPreloader";

const AdminOutlet = () => {
  const { status, user } = useAppSelector(selectAuth);

  if (status === "UNAUTHORIZED") return <Navigate to={"/login"} replace />;

  if (status === "AUTHORIZED" && user?.role !== "ADMIN")
    return <Navigate to={"/dashboard"} replace />;

  return (
    <AuthPreloader>
      <Outlet />
    </AuthPreloader>
  );
};

export default AdminOutlet;
