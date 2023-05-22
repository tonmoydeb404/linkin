import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectAuth } from "../../features/auth/authSlice";
import AuthPreloader from "../components/preloader/AuthPreloader";

const PublicOutlet = () => {
  const { status } = useAppSelector(selectAuth);

  if (status === "AUTHORIZED") return <Navigate to={"/dashboard"} replace />;

  return (
    <AuthPreloader>
      <Outlet />
    </AuthPreloader>
  );
};

export default PublicOutlet;
