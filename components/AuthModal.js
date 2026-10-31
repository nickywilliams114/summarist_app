"use client";

import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@/firebase";
import { closeAuthModal } from "@/redux/userSlice";
import Authentication from "./Authentication";

const GUEST_EMAIL = "guest@gmail.com";
const GUEST_PASSWORD = "guest123";

const ERROR_MESSAGES = {
  "auth/invalid-email": "Invalid email",
  "auth/missing-email": "Please enter your email",
  "auth/missing-password": "Please enter your password",
  "auth/weak-password": "Password should be at least 6 characters",
  "auth/email-already-in-use": "Email already in use",
  "auth/user-not-found": "User not found",
  "auth/wrong-password": "Incorrect password",
  "auth/invalid-credential": "User not found or incorrect password",
  "auth/too-many-requests": "Too many attempts. Please try again later",
  "auth/operation-not-allowed":
    "This sign-in method is not enabled in your Firebase project",
};

function toMessage(error) {
  return ERROR_MESSAGES[error.code] || error.message;
}

export default function AuthModal() {
  const isOpen = useSelector((state) => state.user.isAuthModalOpen);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  if (!isOpen) return null;

  // The auth listener puts the user in the store. From the home page we send
  // them into the app; anywhere else they stay where they were.
  function onSuccess() {
    dispatch(closeAuthModal());
    if (pathname === "/") {
      router.push("/for-you");
    }
  }

  // Each handler resolves to an error message, or nothing on success.
  async function run(action) {
    try {
      await action();
      onSuccess();
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") return;
      console.error(error);
      return toMessage(error);
    }
  }

  return (
    <Authentication
      onClose={() => dispatch(closeAuthModal())}
      onLogin={(email, password) =>
        run(() => signInWithEmailAndPassword(auth, email, password))
      }
      onRegister={(email, password) =>
        run(() => createUserWithEmailAndPassword(auth, email, password))
      }
      onGoogleLogin={() =>
        run(() => signInWithPopup(auth, new GoogleAuthProvider()))
      }
      onGuestLogin={() =>
        run(async () => {
          try {
            await signInWithEmailAndPassword(auth, GUEST_EMAIL, GUEST_PASSWORD);
          } catch (error) {
            // First run against a fresh Firebase project: create the guest.
            if (
              error.code === "auth/user-not-found" ||
              error.code === "auth/invalid-credential"
            ) {
              await createUserWithEmailAndPassword(
                auth,
                GUEST_EMAIL,
                GUEST_PASSWORD,
              );
            } else {
              throw error;
            }
          }
        })
      }
      onForgotPassword={async (email) => {
        try {
          await sendPasswordResetEmail(auth, email);
        } catch (error) {
          console.error(error);
          return toMessage(error);
        }
      }}
    />
  );
}
