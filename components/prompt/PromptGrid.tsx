"use client";

import { PromptCard } from "./PromptCard";
import type { PromptFile } from "@/lib/mdx";

interface PromptGridProps {
  prompts: PromptFile[];
  hasAccess: boolean;
  onCopyPrompt?: (prompt: PromptFile) => void;
  onNavigatePrompt?: (prompt: PromptFile) => void;
  emptyMessage?: string;
}

export function PromptGrid({
  prompts,
  hasAccess,
  onCopyPrompt,
  onNavigatePrompt,
  emptyMessage = "No prompts found.",
}: PromptGridProps) {
  if (prompts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {prompts.map((prompt) => (
        <PromptCard
          key={prompt.slug}
          prompt={prompt}
          hasAccess={hasAccess}
          onCopy={onCopyPrompt}
          onNavigate={onNavigatePrompt}
        />
      ))}
    </div>
  );
}
