"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import "./style.css";

export default function SettingsPage() {
  const user = useSelector((state) => state.user.user);
  const router = useRouter();

  if (!user) {
    return (
      <div className="settings">
        <div className="settings__wrapper">
          <div className="settings__login">
            <img src="/assets/login.png" alt="login" />
            <div className="settings__login--text">
              Log in to your account to see your details.
            </div>
            <button
              className="btn settings__login--btn"
              onClick={() => router.push("/")}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="settings">
      <div className="settings__wrapper">
        <div className="settings__title">Settings</div>
        <div className="settings__content">
          <div className="settings__user">
            <div className="settings__user--email">
              <div className="settings__user--email-label">Email</div>
              <div className="settings__user--email-value">{user.email}</div>
            </div>
          </div>
          <div className="settings__subscription">
            <div className="settings__subscription--title">
              Your Subscription
            </div>
            <div className="settings__subscription--plan">
              <div className="settings__subscription--plan-label">Basic</div>
              <button
                className="btn settings__subscription--btn"
                onClick={() => router.push("/choose-plan")}
              >
                Upgrade
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
