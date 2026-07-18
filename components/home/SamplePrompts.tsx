import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { PromptFile } from "@/lib/mdx";

interface SamplePromptsProps {
  prompts: PromptFile[];
}

function formatCategory(slug: string): string {
  return slug
    .replace(/^selfie-to-/, "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function SamplePrompts({ prompts }: SamplePromptsProps) {
  if (prompts.length === 0) return null;

  return (
    <section className="bg-[#0a0a0a] border-t border-white/5">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <div className="text-center">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Try These Free
          </h2>
          <p className="mt-3 text-lg text-gray-400">
            Get a taste of what Prompt Deck can do — no signup required
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {prompts.map((prompt) => (
            <Link
              key={prompt.slug}
              href={`/free/${prompt.slug}`}
              className="rounded-xl border border-white/5 bg-[#111111] p-6 transition-all hover:border-white/10 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="line-clamp-2 text-base font-bold text-white">
                  {prompt.title}
                </h3>
                <Badge className="shrink-0 bg-emerald-500/15 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/25">
                  Free
                </Badge>
              </div>
              <p className="line-clamp-2 text-sm text-gray-400 mb-4">
                {prompt.description || "No description available."}
              </p>
              <div className="mt-auto">
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-gray-400">
                  {formatCategory(prompt.category)}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/free"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 text-sm font-medium text-white transition-all hover:bg-white/10"
          >
            View All Free Samples
          </Link>
        </div>
      </div>
    </section>
  );
}
