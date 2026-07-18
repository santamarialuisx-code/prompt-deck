import Link from "next/link";
import { Check, Shield, CreditCard, Lock, Star } from "lucide-react";
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
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-black tracking-tight text-white">
            Get Lifetime Access
          </h1>
          <p className="mt-2 text-gray-400">
            One payment. Unlimited prompts. Forever.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#111111] p-8">
          {/* Price anchoring */}
          <div className="mb-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-lg text-gray-500 line-through">$197</span>
              <span className="rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-3 py-1 text-xs font-bold">
                Save $168
              </span>
            </div>
            <span className="text-5xl font-black text-white">$29</span>
            <span className="ml-1 text-sm text-gray-400">USD</span>
            <p className="mt-2 text-xs text-gray-500">
              Less than $0.01/day for life
            </p>
          </div>

          {/* Features */}
          <ul className="mb-8 space-y-3">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <Check className="mt-0.5 size-4 shrink-0 text-[#f97316]" />
                <span className="text-sm text-gray-300">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="flex flex-col items-center gap-3">
            <BuyButton />
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Lock className="h-3 w-3" />
              Secure payment via Lemon Squeezy
            </p>
          </div>
        </div>

        {/* Trust signals */}
        <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <Shield className="h-4 w-4 text-[#f97316]" />
            <span>30-Day Guarantee</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CreditCard className="h-4 w-4 text-[#f97316]" />
            <span>Instant Access</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="h-4 w-4 text-[#f97316]" />
            <span>4.9 Rating</span>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/checkout/pago-movil"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Prefer Pago Móvil? →
          </Link>
        </div>
      </div>
    </div>
  );
}
