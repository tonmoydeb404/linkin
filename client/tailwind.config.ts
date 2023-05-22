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
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#11AD50",
          "primary-content": "#fafafa",
          secondary: "#3f3f46",
          success: "#16a34a",
          "success-content": "#fff",
          error: "#dc2626",
          "error-content": "#fff",
          warning: "#f59e0b",
          "base-100": "#1e293b",
        },
      },
    ],
  },
} satisfies Config;
