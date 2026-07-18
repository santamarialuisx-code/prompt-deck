export default function AccountPurchasesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Purchase History
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          View your past purchases
        </p>
      </div>

      <div className="rounded-lg border bg-white p-8 text-center dark:bg-zinc-900">
        <p className="text-zinc-500 dark:text-zinc-400">
          No purchases yet.
        </p>
      </div>
    </div>
  );
}
