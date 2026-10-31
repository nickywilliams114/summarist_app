import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import libraryReducer from "./librarySlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    library: libraryReducer,
  },
});
