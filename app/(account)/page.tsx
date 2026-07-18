"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Crown, Sparkles } from "lucide-react";

export default function AccountDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-64 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Welcome back{user?.user_metadata?.name ? `, ${user.user_metadata.name}` : ""}
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {user?.email}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Access Status
            </CardTitle>
            <Crown className="size-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <Badge variant="secondary">Free Account</Badge>
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              Upgrade to get lifetime access to all prompts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Quick Links
            </CardTitle>
            <Sparkles className="size-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Link
                href="/prompts"
                className="block text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                Browse prompts
              </Link>
              <Link
                href="/account/profile"
                className="block text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                Edit profile
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
