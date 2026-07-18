import Link from "next/link";
import { ArrowLeft, CreditCard, MessageCircle, Mail } from "lucide-react";

export default function PagoMovilPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4">
      <div className="w-full max-w-lg space-y-8">
        <Link
          href="/checkout"
          className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to checkout
        </Link>

        <div>
          <h1 className="text-3xl font-black tracking-tight text-white">
            Pago Móvil Instructions
          </h1>
          <p className="mt-2 text-gray-400">
            Follow these steps to complete your payment via Pago Móvil.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#111111] p-6">
          <div className="mb-4 flex items-center gap-2">
            <CreditCard className="size-5 text-[#84cc16]" />
            <h2 className="font-bold text-white">
              Bank Details
            </h2>
          </div>

          <div className="space-y-2 rounded-lg bg-[#0a0a0a] p-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Banco:</span>
              <span className="font-medium text-white">[Banco]</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Cédula:</span>
              <span className="font-medium text-white">[Cédula]</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Teléfono:</span>
              <span className="font-medium text-white">[Teléfono]</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Cuenta:</span>
              <span className="font-medium text-white">[Cuenta]</span>
            </div>
            <div className="border-t border-white/5 pt-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Amount:</span>
                <span className="font-bold text-white">$29 USD (equivalent in Bs)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#111111] p-6">
          <h2 className="mb-4 font-bold text-white">Steps</h2>
          <ol className="space-y-4 text-sm text-gray-300">
            <li className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white/5 font-bold text-white">
                1
              </span>
              Make a Pago Móvil transfer using the bank details above.
            </li>
            <li className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white/5 font-bold text-white">
                2
              </span>
              Take a screenshot or photo of the confirmation.
            </li>
            <li className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white/5 font-bold text-white">
                3
              </span>
              <span>
                Send the capture via{" "}
                <span className="inline-flex items-center gap-1">
                  <MessageCircle className="size-3.5" /> WhatsApp
                </span>{" "}
                to [number] or{" "}
                <span className="inline-flex items-center gap-1">
                  <Mail className="size-3.5" /> email
                </span>{" "}
                to [email].
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white/5 font-bold text-white">
                4
              </span>
              We&apos;ll verify and activate your access within 24 hours.
            </li>
          </ol>
        </div>

        <p className="text-center text-sm text-gray-500">
          After verification, you&apos;ll receive an email and your access will be unlocked.
        </p>

        <div className="text-center">
          <Link
            href="/checkout"
            className="inline-flex h-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 text-sm font-medium text-white transition-all hover:bg-white/10"
          >
            Back to Card/PayPal checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
