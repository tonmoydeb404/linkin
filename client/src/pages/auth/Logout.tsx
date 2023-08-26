import { useLazyAuthLogoutQuery } from "@/api/authApi";
import { useAppDispatch } from "@/app/hooks";
import { logInKey } from "@/config/localstorage";
import { authSignout } from "@/features/auth/authSlice";
import { useEffect } from "react";

const Logout = () => {
  const [logout] = useLazyAuthLogoutQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleSignout = async () => {
      await logout(undefined);
      dispatch(authSignout());
      localStorage.setItem(logInKey, "false");
    };

    handleSignout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default Logout;
