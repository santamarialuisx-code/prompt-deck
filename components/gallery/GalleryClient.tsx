"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useCallback, useMemo, useState } from "react";
import { FilterBar } from "./FilterBar";
import { PromptGrid } from "@/components/prompt/PromptGrid";
import { copyToClipboard } from "@/lib/copy";
import { extractPromptText } from "@/lib/prompt-utils";
import type { PromptFile } from "@/lib/mdx";

interface GalleryClientProps {
  prompts: PromptFile[];
  categories: string[];
  tools: string[];
  platforms: string[];
  hasAccess: boolean;
  embedded?: boolean;
}

function GalleryInner({ prompts, categories, tools, platforms, hasAccess, embedded }: GalleryClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const category = searchParams.get("category") || "";
    const tool = searchParams.get("tool") || "";
    const platform = searchParams.get("platform") || "";
    const q = searchParams.get("q")?.toLowerCase() || "";

    return prompts.filter((p) => {
      if (category && p.category !== category) return false;
      if (tool && !p.tools.some((t) => t.toLowerCase() === tool.toLowerCase()))
        return false;
      if (
        platform &&
        !p.platforms.some(
          (pl) => pl.toLowerCase() === platform.toLowerCase()
        )
      )
        return false;
      if (q) {
        const haystack = [
          p.title,
          p.description || "",
          p.category,
          ...p.tools,
          ...p.platforms,
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [prompts, searchParams]);

  const handleCopyPrompt = useCallback(async (prompt: PromptFile) => {
    const text = extractPromptText(prompt.content);
    if (text) {
      await copyToClipboard(text);
      setCopiedSlug(prompt.slug);
      setTimeout(() => setCopiedSlug(null), 2000);
    }
  }, []);

  const handleNavigatePrompt = useCallback((prompt: PromptFile) => {
    router.push(`/gallery/${prompt.category}/${prompt.slug}`);
  }, [router]);

  return (
    <div className="space-y-8">
      <FilterBar
        categories={categories}
        tools={tools}
        platforms={platforms}
        resultCount={filtered.length}
        totalCount={prompts.length}
        embedded={embedded}
      />

      <PromptGrid
        prompts={filtered}
        hasAccess={hasAccess}
        onCopyPrompt={handleCopyPrompt}
        onNavigatePrompt={handleNavigatePrompt}
        emptyMessage="No prompts match your filters. Try clearing some filters."
      />
    </div>
  );
}

export function GalleryClient(props: GalleryClientProps) {
  return (
    <Suspense fallback={<div className="text-muted-foreground">Loading filters...</div>}>
      <GalleryInner {...props} />
    </Suspense>
  );
}
