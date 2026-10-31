"use client";

import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { store } from "../redux/store";
import { setUser, signOutUser, setPlan } from "../redux/userSlice";
import { setLibrary, clearLibrary } from "../redux/librarySlice";
import { getUserData } from "@/lib/userData";
import AuthModal from "@/components/AuthModal";

function AuthListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    return onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        dispatch(signOutUser());
        dispatch(clearLibrary());
        return;
      }
      dispatch(setUser({ email: firebaseUser.email, uid: firebaseUser.uid }));
      try {
        const data = await getUserData(firebaseUser.uid);
        dispatch(setPlan(data.plan));
        dispatch(setLibrary(data));
      } catch (error) {
        // Most likely Firestore isn't enabled or its rules block the read.
        console.error("Could not load user data from Firestore", error);
        dispatch(clearLibrary());
      }
    });
  }, [dispatch]);

  return null;
}

export function ClientProviders({ children }) {
  return (
    <Provider store={store}>
      <AuthListener />
      {children}
      <AuthModal />
    </Provider>
  );
}
