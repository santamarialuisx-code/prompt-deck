import Link from "next/link";
import { ArrowLeft, CreditCard, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PagoMovilPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      <div className="w-full max-w-lg space-y-8">
        <Link
          href="/checkout"
          className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          <ArrowLeft className="size-4" />
          Back to checkout
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Pago Móvil Instructions
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Follow these steps to complete your payment via Pago Móvil.
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-4 flex items-center gap-2">
            <CreditCard className="size-5 text-zinc-700 dark:text-zinc-300" />
            <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">
              Bank Details
            </h2>
          </div>

          <div className="space-y-2 rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500 dark:text-zinc-400">
                Banco:
              </span>
              <span className="font-medium text-zinc-900 dark:text-zinc-100">
                [Banco]
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500 dark:text-zinc-400">
                Cédula:
              </span>
              <span className="font-medium text-zinc-900 dark:text-zinc-100">
                [Cédula]
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500 dark:text-zinc-400">
                Teléfono:
              </span>
              <span className="font-medium text-zinc-900 dark:text-zinc-100">
                [Teléfono]
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500 dark:text-zinc-400">
                Cuenta:
              </span>
              <span className="font-medium text-zinc-900 dark:text-zinc-100">
                [Cuenta]
              </span>
            </div>
            <div className="border-t pt-2 dark:border-zinc-700">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500 dark:text-zinc-400">
                  Amount:
                </span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  $29 USD (equivalent in Bs)
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-4 font-semibold text-zinc-900 dark:text-zinc-50">
            Steps
          </h2>
          <ol className="space-y-4 text-sm text-zinc-700 dark:text-zinc-300">
            <li className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 font-semibold text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">
                1
              </span>
              Make a Pago Móvil transfer using the bank details above.
            </li>
            <li className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 font-semibold text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">
                2
              </span>
              Take a screenshot or photo of the confirmation.
            </li>
            <li className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 font-semibold text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">
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
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 font-semibold text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">
                4
              </span>
              We&apos;ll verify and activate your access within 24 hours.
            </li>
          </ol>
        </div>

        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
          After verification, you&apos;ll receive an email and your access will
          be unlocked.
        </p>

        <div className="text-center">
          <Link href="/checkout">
            <Button variant="outline">Back to Card/PayPal checkout</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
