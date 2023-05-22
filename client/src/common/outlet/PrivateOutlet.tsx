import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectAuth } from "../../features/auth/authSlice";
import AuthPreloader from "../components/preloader/AuthPreloader";

const PrivateOutlet = () => {
  const { status } = useAppSelector(selectAuth);

  if (status === "UNAUTHORIZED") return <Navigate to={"/login"} replace />;

  return (
    <AuthPreloader>
      <Outlet />
    </AuthPreloader>
  );
};

export default PrivateOutlet;
