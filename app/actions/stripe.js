"use server";

import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";

async function getProduct(productId) {
  // Dummy data for now
  if (productId === "price_1...monthly") {
    return {
      name: "Premium Monthly",
      description: "Unlimited access to all books and audiobooks.",
      priceInCents: 1499,
    };
  }
  if (productId === "price_1...yearly") {
    return {
      name: "Premium Yearly",
      description: "Unlimited access to all books and audiobooks.",
      priceInCents: 9999,
    };
  }
}

export async function startCheckoutSession(productId) {
  // Implement your product catalog lookup.
  const product = await getProduct(productId);

  // Create Checkout Sessions from body params.
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    redirect_on_completion: "never",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            description: product.description,
          },
          unit_amount: product.priceInCents,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
  });

  return session.client_secret;
}
