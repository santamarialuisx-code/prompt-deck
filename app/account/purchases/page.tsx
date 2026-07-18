import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import type { Purchase } from "@/lib/types";

export const metadata = {
  title: "Purchase History",
};

const statusConfig: Record<
  Purchase["status"],
  { label: string; className: string }
> = {
  confirmed: {
    label: "Confirmed",
    className: "bg-green-600 hover:bg-green-700",
  },
  pending: {
    label: "Pending",
    className: "bg-yellow-500 hover:bg-yellow-600",
  },
  failed: {
    label: "Failed",
    className: "bg-red-600 hover:bg-red-700",
  },
};

const paymentMethodLabels: Record<Purchase["payment_method"], string> = {
  lemon_squeezy: "Lemon Squeezy",
  pago_movil: "Pago Móvil",
  crypto: "Crypto",
};

export default async function AccountPurchasesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: purchases } = await supabase
    .from("purchases")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false }) as { data: Purchase[] | null };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Purchase History
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          View your past purchases
        </p>
      </div>

      {/* Purchases list or empty state */}
      {purchases && purchases.length > 0 ? (
        <div className="space-y-3">
          {purchases.map((purchase) => (
            <div
              key={purchase.id}
              className="flex flex-col gap-3 rounded-lg border bg-white p-4 dark:bg-zinc-900 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-zinc-900 dark:text-zinc-50">
                    {paymentMethodLabels[purchase.payment_method]}
                  </span>
                  <Badge
                    variant="secondary"
                    className={statusConfig[purchase.status].className}
                  >
                    {statusConfig[purchase.status].label}
                  </Badge>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {new Date(purchase.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-zinc-900 dark:text-zinc-50">
                  {purchase.currency === "USD" ? "$" : purchase.currency + " "}
                  {purchase.amount.toFixed(2)}
                </p>
                {purchase.lemon_squeezy_id && (
                  <p className="text-xs text-zinc-400">
                    ID: {purchase.lemon_squeezy_id.slice(0, 8)}...
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border bg-white p-8 text-center dark:bg-zinc-900">
          <p className="text-zinc-500 dark:text-zinc-400">
            No purchases yet.
          </p>
          <Link
            href="/checkout"
            className={cn(buttonVariants({ size: "sm" }), "mt-4")}
          >
            Get Lifetime Access
            <ArrowRight className="ml-1 size-3" />
          </Link>
        </div>
      )}
    </div>
  );
}
