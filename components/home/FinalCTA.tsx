import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="border-t">
      <div className="mx-auto max-w-5xl px-6 py-16 text-center sm:py-20">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Ready to level up your selfie game?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          Get lifetime access to all prompts. One payment, forever updates.
        </p>
        <div className="mt-8">
          <Link
            href="/checkout"
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
          >
            Get Lifetime Access
          </Link>
        </div>
      </div>
    </section>
  );
}
