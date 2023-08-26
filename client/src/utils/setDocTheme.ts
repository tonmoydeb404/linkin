import { ThemeMode } from "@/config/themes";

const setDocTheme = (theme: ThemeMode) => {
  const root = window.document.documentElement;

  root.classList.remove("light", "dark");

  if (theme === "SYSTEM") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    root.classList.add(systemTheme);
    return;
  }

  root.classList.add(theme.toLowerCase());
};

export default setDocTheme;
