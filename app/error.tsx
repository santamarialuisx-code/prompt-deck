"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">
        Something went wrong
      </h1>
      <p className="mt-4 max-w-md text-lg text-muted-foreground">
        An unexpected error occurred. Please try again or go back to the
        homepage.
      </p>
      <div className="mt-8 flex items-center gap-4">
        <Button onClick={reset} variant="default">
          Try again
        </Button>
        <Link
          href="/"
          className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-background px-5 text-sm font-medium transition-colors hover:bg-muted"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
