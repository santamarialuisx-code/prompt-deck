import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getPromptCount } from "@/lib/mdx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Crown,
  Sparkles,
  BookOpen,
  Gift,
  Receipt,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "Account Dashboard",
};

export default async function AccountDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("users")
    .select("name, has_lifetime_access, created_at")
    .eq("id", user.id)
    .single();

  const totalPrompts = getPromptCount();
  const displayName =
    profile?.name || user.user_metadata?.name || user.email?.split("@")[0];
  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Welcome back{displayName ? `, ${displayName}` : ""}
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {user.email}
        </p>
      </div>

      {/* Access Status + Stats */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Access Status */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Access Status
            </CardTitle>
            <Crown className="size-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            {profile?.has_lifetime_access ? (
              <div className="space-y-2">
                <Badge className="bg-green-600 hover:bg-green-700">
                  Lifetime Access Active
                </Badge>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  You have access to all prompts
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <Badge variant="secondary">No Access Yet</Badge>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Get lifetime access to all prompts
                </p>
                <Link
                  href="/checkout"
                  className={buttonVariants({ size: "sm" })}
                >
                  Get Access
                  <ArrowRight className="ml-1 size-3" />
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quick Stats</CardTitle>
            <Sparkles className="size-4 text-zinc-500" />
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                Total Prompts
              </span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                {totalPrompts}
              </span>
            </div>
            {memberSince && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  Member Since
                </span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                  {memberSince}
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Quick Links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-3">
            <Link
              href="/gallery"
              className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
            >
              <BookOpen className="size-5 text-zinc-500" />
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  Browse Prompts
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  View the full collection
                </p>
              </div>
            </Link>
            <Link
              href="/free"
              className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
            >
              <Gift className="size-5 text-zinc-500" />
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  Free Samples
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Try before you buy
                </p>
              </div>
            </Link>
            <Link
              href="/account/purchases"
              className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
            >
              <Receipt className="size-5 text-zinc-500" />
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  View Purchases
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Your purchase history
                </p>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
