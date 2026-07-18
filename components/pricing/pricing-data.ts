import { PricingTier } from "./types";

export const pricingTiers: PricingTier[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    features: [
      "5-10 curated prompts",
      "Basic prompt access",
      "Community support",
      "Weekly prompt updates",
    ],
    highlighted: false,
    accentColor: "var(--accent-cyan)",
    ctaText: "Get Started Free",
  },
  {
    id: "pro-permanente",
    name: "Pro Permanente",
    price: "$29",
    features: [
      "50+ curated prompts",
      "Lifetime access — no subscriptions",
      "All current categories",
      "Copy prompts with one click",
      "Priority support",
    ],
    highlighted: true,
    accentColor: "var(--accent-purple)",
    ctaText: "Get Lifetime Access",
  },
  {
    id: "pro-suscripcion",
    name: "Pro Suscripción",
    price: "$9",
    period: "/mo",
    features: [
      "150+ curated prompts",
      "All future updates included",
      "Exclusive premium prompts",
      "Early access to new categories",
      "API access (coming soon)",
      "Priority support",
    ],
    highlighted: false,
    accentColor: "var(--accent-orange)",
    ctaText: "Subscribe Now",
  },
];