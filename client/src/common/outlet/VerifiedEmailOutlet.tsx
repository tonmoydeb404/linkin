import { useAppSelector } from "@/app/hooks";
import { selectAuth } from "@/features/auth/authSlice";
import { Navigate, Outlet } from "react-router-dom";
import PagePreloader from "../components/preloader/PagePreloader";

const VerifiedEmailOutlet = () => {
  const { status, user } = useAppSelector(selectAuth);

  if (status === "AUTHORIZED" && user && user.emailVerified === false)
    return <Navigate to={"/verify-email"} replace />;

  if (status === "AUTHORIZED" && user && user.emailVerified) return <Outlet />;

  return <PagePreloader />;
};

export default VerifiedEmailOutlet;
