export default function GalleryLoading() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10">
        <div className="h-10 w-48 animate-pulse rounded bg-muted" />
        <div className="mt-3 h-6 w-72 animate-pulse rounded bg-muted" />
      </div>

      <div className="mb-6 h-10 w-full animate-pulse rounded bg-muted" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg border bg-card p-4">
            <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
            <div className="mt-2 h-4 w-full animate-pulse rounded bg-muted" />
            <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-muted" />
            <div className="mt-4 flex gap-2">
              <div className="h-5 w-16 animate-pulse rounded bg-muted" />
              <div className="h-5 w-12 animate-pulse rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
