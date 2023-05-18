import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectAuth } from "../../features/auth/authSlice";

const PrivateOutlet = () => {
  const { status } = useAppSelector(selectAuth);

  if (status === "UNAUTHORIZED") return <Navigate to={"/login"} replace />;

  return <Outlet />;
};

export default PrivateOutlet;
