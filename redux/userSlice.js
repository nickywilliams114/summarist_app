import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthModalOpen: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    signOutUser: (state) => {
      state.user = null;
    },
    openAuthModal: (state) => {
      state.isAuthModalOpen = true;
    },
    closeAuthModal: (state) => {
      state.isAuthModalOpen = false;
    },
  },
});

export const { setUser, signOutUser, openAuthModal, closeAuthModal } =
  userSlice.actions;
export default userSlice.reducer;
