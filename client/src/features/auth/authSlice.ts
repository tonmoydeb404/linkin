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
  },
});

export const { authSignin, authLoading, authSignout } = authSlice.actions;
export const selectAuth = (state: RootState) => state.authSlice;
