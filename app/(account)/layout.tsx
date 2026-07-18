"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/account" },
  { name: "My Prompts", href: "/account/prompts" },
  { name: "Purchases", href: "/account/purchases" },
  { name: "Profile", href: "/account/profile" },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 flex-col border-r bg-white dark:bg-zinc-900 dark:border-zinc-800 lg:flex">
        <div className="flex h-14 items-center border-b px-4">
          <Link
            href="/"
            className="font-semibold text-zinc-900 dark:text-zinc-50"
          >
            Prompt Deck
          </Link>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                  : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-50"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="border-t p-3">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 size-4" />
            Sign out
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1">
        {/* Mobile header */}
        <header className="flex h-14 items-center border-b bg-white px-4 dark:bg-zinc-900 dark:border-zinc-800 lg:hidden">
          <Link
            href="/"
            className="font-semibold text-zinc-900 dark:text-zinc-50"
          >
            Prompt Deck
          </Link>
        </header>

        <div className="mx-auto max-w-4xl p-6">{children}</div>
      </main>
    </div>
  );
}
