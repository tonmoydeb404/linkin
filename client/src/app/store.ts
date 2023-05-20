import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";
import { linkApi } from "../api/linkApi";
import { profileApi } from "../api/profileApi";
import { authSlice } from "../features/auth/authSlice";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [linkApi.reducerPath]: linkApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      linkApi.middleware,
      profileApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
