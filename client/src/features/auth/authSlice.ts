import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { AuthPayload, AuthSlice, AuthSliceUpdate } from "../../types/auth.type";

const initialState: AuthSlice = {
  user: null,
  status: "LOADING",
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    authSignin: (state, action: { payload: AuthPayload }) => {
      state.user = action.payload;
      state.status = "AUTHORIZED";
    },
    authSignout: (state) => {
      state.user = null;
      state.status = "UNAUTHORIZED";
    },
    authLoading: (state) => {
      state.status = "LOADING";
    },
    authUpdate: (
      state,
      {
        payload,
      }: {
        payload: AuthSliceUpdate;
      }
    ) => {
      if (state.user && state.status === "AUTHORIZED") {
        if (payload?.avatar) state.user.avatar = payload.avatar;
        if (payload?.firstName) state.user.firstName = payload.firstName;
        if (payload?.lastName) state.user.lastName = payload.lastName;
        if (payload?.username) state.user.username = payload.username;
        if (payload?.emailVerified)
          state.user.emailVerified = payload.emailVerified;
      }
    },
  },
});

export const { authSignin, authLoading, authSignout, authUpdate } =
  authSlice.actions;
export const selectAuth = (state: RootState) => state.authSlice;
