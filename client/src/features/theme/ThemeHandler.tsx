import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { themeKey } from "@/config/localstorage";
import { ThemeMode, themes } from "@/config/themes";
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
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (mode === "SYSTEM") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(mode.toLowerCase());
  }, [mode]);

  return null;
};

export default ThemeHandler;
