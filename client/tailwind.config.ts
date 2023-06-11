import daisyui from "daisyui";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/daisyui/dist/**/*.js",
    "node_modules/react-daisyui/dist/**/*.js",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "color-scheme": "dark",
          primary: "#11AD50",
          "primary-focus": "#0B7D37",
          "primary-content": "#fafafa",
          neutral: "#99999C",
          secondary: "#3f3f46",
          "secondary-focus": "#31313B",
          success: "#16a34a",
          "success-focus": "#0F7633",
          "success-content": "#fff",
          error: "#dc2626",
          "error-focus": "#A5191D",
          "error-content": "#fff",
          warning: "#f59e0b",
          "warning-focus": "#905706",
          "base-100": "#1e293b",
          "base-200": "#162132",
          "base-300": "#0E1828",
        },
      },
    ],
  },
  plugins: [daisyui],
} satisfies Config;
