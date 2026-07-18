import Link from "next/link";
import { Check } from "lucide-react";
import { BuyButton } from "@/components/checkout/BuyButton";

const features = [
  "Access to all 150+ prompts",
  "Lifetime access — no subscriptions",
  "New prompts added regularly",
  "Copy prompts with one click",
  "Organized by category",
];

export default function CheckoutPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Get Lifetime Access
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            One payment. Unlimited prompts. Forever.
          </p>
        </div>

        <div className="rounded-xl border bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-6 text-center">
            <span className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
              $29
            </span>
            <span className="ml-1 text-sm text-zinc-500 dark:text-zinc-400">
              USD
            </span>
          </div>

          <ul className="mb-8 space-y-3">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                <span className="text-sm text-zinc-700 dark:text-zinc-300">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col items-center gap-3">
            <BuyButton />
            <p className="text-xs text-zinc-500">
              Secure payment via Lemon Squeezy
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/checkout/pago-movil"
            className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            Prefer Pago Móvil? →
          </Link>
        </div>
      </div>
    </div>
  );
}
