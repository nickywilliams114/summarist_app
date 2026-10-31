import "server-only";

import Stripe from "stripe";

let stripe;

// Created lazily so the app still builds and runs without Stripe keys.
export function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error(
      "Payments are not configured. Add STRIPE_SECRET_KEY to .env.local.",
    );
  }
  if (!stripe) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripe;
}
