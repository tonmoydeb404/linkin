import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";
import { linksApi } from "../api/linksApi";
import { authSlice } from "../features/auth/authSlice";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [linksApi.reducerPath]: linksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, linksApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
