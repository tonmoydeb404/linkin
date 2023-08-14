import { userApi } from "@/api/userApi";
import { sidebarSlice } from "@/features/sidebar/sidebarSlice";
import { themeMiddleware, themeSlice } from "@/features/theme/themeSlice";
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";
import { linkApi } from "../api/linkApi";
import { profileApi } from "../api/profileApi";
import { socialApi } from "../api/socialApi";
import { authSlice } from "../features/auth/authSlice";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [sidebarSlice.name]: sidebarSlice.reducer,
    [themeSlice.name]: themeSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [linkApi.reducerPath]: linkApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [socialApi.reducerPath]: socialApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      linkApi.middleware,
      profileApi.middleware,
      socialApi.middleware,
      userApi.middleware,
      themeMiddleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
