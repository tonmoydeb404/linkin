import { ReactElement, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useLazyAuthRefreshQuery } from "../../api/authApi";
import { useAppDispatch } from "../../app/hooks";
import { authLoading, authSignin, authSignout } from "./authSlice";

const AuthHandler = ({ children }: { children: ReactElement }) => {
  const [refreshAuth] = useLazyAuthRefreshQuery();
  const dispatch = useAppDispatch();
  const [{ logged_in }] = useCookies(["logged_in"]);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        dispatch(authLoading());
        if (logged_in !== "true") throw new Error("Not logged in");

        const data = await refreshAuth(undefined).unwrap();
        dispatch(authSignin(data.payload));
      } catch (error) {
        dispatch(authSignout());
      }
    };

    console.log(logged_in);

    fetchStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logged_in]);

  return children;
};

export default AuthHandler;
