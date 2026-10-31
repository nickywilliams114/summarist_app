import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  // "basic" | "premium" | "premium-plus"
  plan: "basic",
  // true until Firebase reports the initial auth state
  authLoading: true,
  isAuthModalOpen: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.authLoading = false;
    },
    signOutUser: (state) => {
      state.user = null;
      state.plan = "basic";
      state.authLoading = false;
    },
    setPlan: (state, action) => {
      state.plan = action.payload || "basic";
    },
    openAuthModal: (state) => {
      state.isAuthModalOpen = true;
    },
    closeAuthModal: (state) => {
      state.isAuthModalOpen = false;
    },
  },
});

export const {
  setUser,
  signOutUser,
  setPlan,
  openAuthModal,
  closeAuthModal,
} = userSlice.actions;

export const selectIsSubscribed = (state) => state.user.plan !== "basic";

export default userSlice.reducer;
