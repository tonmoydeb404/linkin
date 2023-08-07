import { ReactElement, useEffect } from "react";
import { useLazyAuthRefreshQuery } from "../../api/authApi";
import { useAppDispatch } from "../../app/hooks";
import { logInKey } from "../../config/localstorage";
import { authLoading, authSignin, authSignout } from "./authSlice";

const AuthHandler = ({ children }: { children: ReactElement }) => {
  const [refreshAuth] = useLazyAuthRefreshQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        dispatch(authLoading());
        const isLoggedIn = localStorage.getItem(logInKey);
        if (isLoggedIn !== "true") throw new Error("user not loggedin");
        const data = await refreshAuth(undefined).unwrap();
        dispatch(authSignin(data.payload));
      } catch (error) {
        dispatch(authSignout());
      }
    };
    fetchStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};

export default AuthHandler;
