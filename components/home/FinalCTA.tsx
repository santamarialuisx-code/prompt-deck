import Link from "next/link";
import { Shield, Zap, Clock } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="bg-[#0a0a0a] border-t border-white/5">
      <div className="mx-auto max-w-5xl px-6 py-16 text-center sm:py-20">
        <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
          Ready to level up your selfie game?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-gray-400">
          Join 2,400+ creators who transformed their content.
          <span className="block mt-2 text-white font-bold">
            One payment. Lifetime access. No subscriptions.
          </span>
        </p>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-8 mb-8 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#f97316]" />
            <span>30-Day Guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-[#f97316]" />
            <span>Instant Access</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#f97316]" />
            <span>Lifetime Updates</span>
          </div>
        </div>

        <div className="mt-4">
          <Link
            href="/checkout"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#f97316] px-10 text-base font-bold text-white transition-all hover:bg-[#fb923c] hover:-translate-y-0.5"
          >
            Get Lifetime Access — $29
          </Link>
        </div>
      </div>
    </section>
  );
}
