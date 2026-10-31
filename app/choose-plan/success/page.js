"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getCheckoutResult } from "@/app/actions/stripe";
import { savePlan } from "@/lib/userData";
import { setPlan } from "@/redux/userSlice";
import { PLANS } from "@/lib/plans";
import "../style.css";

function CheckoutSuccess() {
  const sessionId = useSearchParams().get("session_id");
  const user = useSelector((state) => state.user.user);
  const authLoading = useSelector((state) => state.user.authLoading);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("loading");
  const [planKey, setPlanKey] = useState(null);

  useEffect(() => {
    if (authLoading) return;
    if (!sessionId || !user) {
      setStatus("error");
      return;
    }
    getCheckoutResult(sessionId)
      .then(async (result) => {
        if (!result.complete || result.uid !== user.uid || !PLANS[result.plan]) {
          setStatus("error");
          return;
        }
        await savePlan(user.uid, result.plan);
        dispatch(setPlan(result.plan));
        setPlanKey(result.plan);
        setStatus("success");
      })
      .catch((error) => {
        console.error(error);
        setStatus("error");
      });
  }, [sessionId, user, authLoading, dispatch]);

  if (status === "loading") {
    return <div className="plan-success__title">Confirming your payment…</div>;
  }

  if (status === "error") {
    return (
      <>
        <div className="page__error">
          We couldn&apos;t confirm this payment. If you were charged, please
          contact support.
        </div>
        <Link href="/choose-plan" className="btn">
          Back to plans
        </Link>
      </>
    );
  }

  return (
    <>
      <div className="plan-success__title">
        Welcome to {PLANS[planKey].name}!
      </div>
      <div>You now have unlimited access to every book on Summarist.</div>
      <Link href="/for-you" className="btn">
        Start reading
      </Link>
    </>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="plan-success">
      <Suspense fallback={null}>
        <CheckoutSuccess />
      </Suspense>
    </div>
  );
}
