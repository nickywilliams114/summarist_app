"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import LoginPrompt from "@/components/LoginPrompt";
import Skeleton from "@/components/Skeleton";

const PLAN_LABELS = {
  basic: "Basic",
  premium: "Premium",
  "premium-plus": "Premium Plus",
};

export default function SettingsPage() {
  const user = useSelector((state) => state.user.user);
  const plan = useSelector((state) => state.user.plan);
  const authLoading = useSelector((state) => state.user.authLoading);
  const libraryLoading = useSelector((state) => state.library.loading);

  return (
    <div className="row">
      <div className="container">
        <div className="section__title page__title--seperator">Settings</div>
        {authLoading || (user && libraryLoading) ? (
          <>
            <div className="setting__content">
              <Skeleton width="160px" height="20px" />
              <Skeleton width="100px" height="20px" />
            </div>
            <div className="setting__content">
              <Skeleton width="80px" height="20px" />
              <Skeleton width="220px" height="20px" />
            </div>
          </>
        ) : !user ? (
          <LoginPrompt text="Log in to your account to see your details." />
        ) : (
          <>
            <div className="setting__content">
              <div className="settings__sub--title">Your Subscription plan</div>
              <div className="settings__text">{PLAN_LABELS[plan]}</div>
              {plan === "basic" && (
                <Link href="/choose-plan" className="btn settings__upgrade--btn">
                  Upgrade to Premium
                </Link>
              )}
            </div>
            <div className="setting__content">
              <div className="settings__sub--title">Email</div>
              <div className="settings__text">{user.email}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
