import { LayoutStyle, LayoutTheme } from "@/types/layout.type";

export const layoutThemeOptions: Record<LayoutTheme, string> = {
  DARK: "Dark Mode",
  LIGHT: "Light Mode",
  SYSTEM: "System Specific",
};

export const layoutStyleOptions: Record<LayoutStyle, string> = {
  CIRCULAR: "Circular Shape",
  ROUNDED: "Rounded Shape",
  SQUARE: "Square Shape",
};
