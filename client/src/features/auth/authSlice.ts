import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { AuthPayload } from "../../types/auth.type";

const initialState: {
  user: AuthPayload | null;
  status: "LOADING" | "AUTHORIZED" | "UNAUTHORIZED";
} = {
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
        payload: Partial<
          Pick<AuthPayload, "firstName" | "lastName" | "avatar" | "username">
        >;
      }
    ) => {
      if (state.user && state.status === "AUTHORIZED") {
        if (payload?.avatar) state.user.avatar = payload.avatar;
        if (payload?.firstName) state.user.firstName = payload.firstName;
        if (payload?.lastName) state.user.lastName = payload.lastName;
        if (payload?.username) state.user.username = payload.username;
      }
    },
  },
});

export const { authSignin, authLoading, authSignout, authUpdate } =
  authSlice.actions;
export const selectAuth = (state: RootState) => state.authSlice;
