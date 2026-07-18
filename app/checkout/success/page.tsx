import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function CheckoutSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <CheckCircle2 className="mx-auto size-16 text-[#84cc16]" />

        <div>
          <h1 className="text-3xl font-black tracking-tight text-white">
            Payment Successful!
          </h1>
          <p className="mt-2 text-gray-400">
            Your lifetime access is now active.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/account/prompts"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-[#84cc16] px-6 text-sm font-bold text-white transition-all hover:bg-[#a3e635]"
          >
            Go to My Prompts
          </Link>
          <Link
            href="/gallery"
            className="inline-flex h-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 text-sm font-medium text-white transition-all hover:bg-white/10"
          >
            Back to Gallery
          </Link>
        </div>
      </div>
    </div>
  );
}
