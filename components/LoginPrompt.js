"use client";

import { useDispatch } from "react-redux";
import { openAuthModal } from "@/redux/userSlice";

export default function LoginPrompt({ text }) {
  const dispatch = useDispatch();

  return (
    <div className="settings__login--wrapper">
      <img src="/assets/login.png" alt="login" />
      <div className="settings__login--text">{text}</div>
      <button
        className="btn settings__login--btn"
        onClick={() => dispatch(openAuthModal())}
      >
        Login
      </button>
    </div>
  );
}
