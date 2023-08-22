import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectAuth } from "../../features/auth/authSlice";
import PagePreloader from "../components/preloader/PagePreloader";

const PublicOutlet = () => {
  const { status } = useAppSelector(selectAuth);

  if (status === "AUTHORIZED") return <Navigate to={"/dashboard"} replace />;

  if (status === "UNAUTHORIZED") return <Outlet />;

  return <PagePreloader />;
};

export default PublicOutlet;
