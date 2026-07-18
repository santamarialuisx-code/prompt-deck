import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout — Prompt Deck",
  description:
    "Get lifetime access to 150+ curated AI prompts. One payment, unlimited prompts, forever.",
  openGraph: {
    title: "Checkout — Prompt Deck",
    description:
      "Get lifetime access to 150+ curated AI prompts. One payment, unlimited prompts, forever.",
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}