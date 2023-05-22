import { ReactNode, useEffect } from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectAuth } from "../../../features/auth/authSlice";

const AuthPreloader = ({ children }: { children: ReactNode }) => {
  const { status } = useAppSelector(selectAuth);

  useEffect(() => {
    const preloader = document.getElementById("preloader");
    if ((status === "AUTHORIZED" || status === "UNAUTHORIZED") && preloader) {
      preloader.style.display = "none";
    }
  }, [status]);

  return <>{children}</>;
};

export default AuthPreloader;
