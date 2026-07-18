import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-lg text-muted-foreground">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="mt-8 flex items-center gap-4">
        <Link
          href="/"
          className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
        >
          Go home
        </Link>
        <Link
          href="/gallery"
          className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-background px-5 text-sm font-medium transition-colors hover:bg-muted"
        >
          Browse prompts
        </Link>
      </div>
    </main>
  );
}
