import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getAllPrompts, getFreeSamples } from "@/lib/mdx";
import { PromptGrid } from "@/components/prompt/PromptGrid";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "My Prompts",
};

export default async function AccountPromptsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("users")
    .select("has_lifetime_access")
    .eq("id", user.id)
    .single();

  const hasAccess = profile?.has_lifetime_access ?? false;
  const prompts = hasAccess ? getAllPrompts() : [];
  const freeSamples = hasAccess ? [] : getFreeSamples();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          My Prompts
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {hasAccess
            ? "Your full prompt collection"
            : "Free samples available below"}
        </p>
      </div>

      {hasAccess ? (
        /* Full prompt grid */
        <PromptGrid
          prompts={prompts}
          emptyMessage="No prompts available."
        />
      ) : (
        /* No access — show CTA + free samples */
        <div className="space-y-8">
          <div className="rounded-lg border border-dashed bg-white p-8 text-center dark:bg-zinc-900">
            <p className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
              You don&apos;t have access yet
            </p>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Get lifetime access to all prompts
            </p>
            <Link
              href="/checkout"
              className={cn(buttonVariants({ size: "lg" }), "mt-4")}
            >
              Get Lifetime Access
              <ArrowRight className="ml-1 size-4" />
            </Link>
          </div>

          {freeSamples.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Free Samples
              </h2>
              <PromptGrid
                prompts={freeSamples}
                emptyMessage="No free samples available."
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
