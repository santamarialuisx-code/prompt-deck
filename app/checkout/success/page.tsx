import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckoutSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      <div className="w-full max-w-md space-y-6 text-center">
        <CheckCircle2 className="mx-auto size-16 text-emerald-600" />

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Payment Successful!
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Your lifetime access is now active.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/account/prompts">
            <Button size="lg">Go to My Prompts</Button>
          </Link>
          <Link href="/gallery">
            <Button variant="outline" size="lg">
              Back to Gallery
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
