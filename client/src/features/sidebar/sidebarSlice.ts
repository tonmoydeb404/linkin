import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState: {
  isOpen: boolean;
} = {
  isOpen: false,
};

export const sidebarSlice = createSlice({
  name: "sidebarSlice",
  initialState,
  reducers: {
    sidebarOpen: (state) => {
      state.isOpen = true;
    },
    sidebarClose: (state) => {
      state.isOpen = false;
    },
    sidebarToggle: (state) => {
      state.isOpen = !state.isOpen;
    },
    sidebarChange: (state, { payload }: { payload: boolean }) => {
      state.isOpen = payload;
    },
  },
});

export const { sidebarOpen, sidebarClose, sidebarToggle, sidebarChange } =
  sidebarSlice.actions;
export const selectSidebar = (state: RootState) => state.sidebarSlice;
