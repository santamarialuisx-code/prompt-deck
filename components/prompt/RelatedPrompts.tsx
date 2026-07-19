"use client";

import { PromptCard } from "./PromptCard";
import type { PromptFile } from "@/lib/mdx";

interface RelatedPromptsProps {
  prompts: PromptFile[];
}

/**
 * Renders related prompts as image cards that navigate to their detail page on click.
 * Used on the prompt detail page.
 */
export function RelatedPrompts({ prompts }: RelatedPromptsProps) {
  if (prompts.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="mb-4 text-xl font-semibold">Related Prompts</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {prompts.map((rp) => (
          <PromptCard
            key={rp.slug}
            prompt={rp}
            hasAccess={rp.is_free}
            onNavigate={(p) => {
              window.location.href = `/gallery/${p.category}/${p.slug}`;
            }}
          />
        ))}
      </div>
    </div>
  );
}
