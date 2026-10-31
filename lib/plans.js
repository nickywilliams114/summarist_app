// Shared by the sales page and the Stripe server action.
export const PLANS = {
  "premium-plus": {
    key: "premium-plus",
    name: "Premium Plus Yearly",
    price: 99.99,
    priceInCents: 9999,
    interval: "year",
    trialDays: 7,
    trialText: "7-day free trial included",
  },
  premium: {
    key: "premium",
    name: "Premium Monthly",
    price: 9.99,
    priceInCents: 999,
    interval: "month",
    trialDays: 0,
    trialText: "No trial included",
  },
};
