import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { themeKey } from "@/config/localstorage";
import { ThemeMode, themes } from "@/config/themes";
import setDocTheme from "@/utils/setDocTheme";
import { useEffect } from "react";
import { selectTheme, themeChange } from "./themeSlice";

const ThemeHandler = () => {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector(selectTheme);

  useEffect(() => {
    const theme = localStorage.getItem(themeKey) as ThemeMode;
    if (theme && themes.includes(theme)) {
      dispatch(themeChange(theme));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDocTheme(mode);
  }, [mode]);

  return null;
};

export default ThemeHandler;
