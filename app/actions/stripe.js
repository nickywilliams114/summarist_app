"use server";

import { headers } from "next/headers";
import { getStripe } from "@/lib/stripe";
import { PLANS } from "@/lib/plans";

export async function startCheckoutSession(planKey, customer) {
  const plan = PLANS[planKey];
  if (!plan) {
    throw new Error(`Unknown plan: ${planKey}`);
  }

  const headerList = await headers();
  const origin =
    headerList.get("origin") || `http://${headerList.get("host")}`;

  const session = await getStripe().checkout.sessions.create({
    ui_mode: "embedded",
    mode: "subscription",
    customer_email: customer.email,
    client_reference_id: customer.uid,
    metadata: { plan: plan.key, uid: customer.uid },
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: plan.name },
          unit_amount: plan.priceInCents,
          recurring: { interval: plan.interval },
        },
        quantity: 1,
      },
    ],
    subscription_data: plan.trialDays
      ? { trial_period_days: plan.trialDays }
      : undefined,
    return_url: `${origin}/choose-plan/success?session_id={CHECKOUT_SESSION_ID}`,
  });

  return session.client_secret;
}

// Looked up server-side so the client can't claim a plan it didn't pay for.
export async function getCheckoutResult(sessionId) {
  const session = await getStripe().checkout.sessions.retrieve(sessionId);
  return {
    complete: session.status === "complete",
    plan: session.metadata?.plan,
    uid: session.client_reference_id,
  };
}
