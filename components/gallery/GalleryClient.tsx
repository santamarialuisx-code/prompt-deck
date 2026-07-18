"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";
import { FilterBar } from "./FilterBar";
import { PromptGrid } from "@/components/prompt/PromptGrid";
import type { PromptFile } from "@/lib/mdx";

interface GalleryClientProps {
  prompts: PromptFile[];
  categories: string[];
  tools: string[];
  platforms: string[];
}

function GalleryInner({ prompts, categories, tools, platforms }: GalleryClientProps) {
  const searchParams = useSearchParams();

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

  return (
    <div className="space-y-8">
      <FilterBar
        categories={categories}
        tools={tools}
        platforms={platforms}
        resultCount={filtered.length}
        totalCount={prompts.length}
      />

      <PromptGrid
        prompts={filtered}
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
