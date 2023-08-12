import { RootState } from "@/app/store";
import { themeKey } from "@/config/localstorage";
import { ThemeMode } from "@/config/themes";
import { Middleware, createSlice } from "@reduxjs/toolkit";

const initialState: { mode: ThemeMode } = { mode: "DARK" };

export const themeSlice = createSlice({
  name: "themeSlice",
  initialState,
  reducers: {
    themeDark: (state) => {
      state.mode = "DARK";
    },
    themeLight: (state) => {
      state.mode = "LIGHT";
    },
    themeSystem: (state) => {
      state.mode = "SYSTEM";
    },
    themeChange: (state, { payload }: { payload: ThemeMode }) => {
      state.mode = payload;
    },
  },
});

export const themeMiddleware: Middleware = () => (next) => (action) => {
  let theme = "";
  switch (action.type) {
    case "themeSlice/themeDark": {
      theme = "DARK";
      break;
    }
    case "themeSlice/themeLight": {
      theme = "LIGHT";
      break;
    }
    case "themeSlice/themeSystem": {
      theme = "SYSTEM";
      break;
    }
    case "themeSlice/themeChange": {
      theme = action.payload;
      break;
    }
    default:
      break;
  }
  if (theme) localStorage.setItem(themeKey, theme);

  return next(action);
};

export const { themeChange, themeDark, themeLight, themeSystem } =
  themeSlice.actions;
export const selectTheme = (state: RootState) => state.themeSlice;
