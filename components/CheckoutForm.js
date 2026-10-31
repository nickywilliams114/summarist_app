"use client";

import { useCallback, useState } from "react";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { startCheckoutSession } from "@/app/actions/stripe";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

export default function CheckoutForm({ planKey, user, onCancel }) {
  const [error, setError] = useState(
    publishableKey
      ? ""
      : "Payments are not configured. Add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to .env.local.",
  );

  const fetchClientSecret = useCallback(async () => {
    try {
      return await startCheckoutSession(planKey, {
        uid: user.uid,
        email: user.email,
      });
    } catch (err) {
      console.error(err);
      setError(err.message || "Could not start checkout.");
      throw err;
    }
  }, [planKey, user.uid, user.email]);

  return (
    <div className="checkout">
      <button className="checkout__back" onClick={onCancel}>
        ← Back to plans
      </button>
      {error ? (
        <div className="page__error">{error}</div>
      ) : (
        <div id="checkout">
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={{ fetchClientSecret }}
          >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      )}
    </div>
  );
}
