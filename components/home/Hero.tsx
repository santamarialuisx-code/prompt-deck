import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/30">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(120,119,198,0.15),transparent_50%)]" />

      <div className="relative mx-auto max-w-5xl px-6 py-24 text-center sm:py-32">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          Turn Your Selfies into
          <span className="block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Stunning AI Art
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
          Copy-paste prompts that actually work. No prompt engineering degree
          required.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="/gallery"
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
          >
            Browse Prompts
          </Link>
          <Link
            href="/free"
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-5 text-sm font-medium transition-colors hover:bg-muted"
          >
            Try Free Samples
          </Link>
        </div>
      </div>
    </section>
  );
}
