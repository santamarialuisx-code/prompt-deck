"use client";

import { useCallback } from "react";
import { PromptGrid } from "./PromptGrid";
import { copyToClipboard } from "@/lib/copy";
import { extractPromptText } from "@/lib/prompt-utils";
import type { PromptFile } from "@/lib/mdx";

interface CopyablePromptGridProps {
  prompts: PromptFile[];
  hasAccess: boolean;
  emptyMessage?: string;
}

export function CopyablePromptGrid({
  prompts,
  hasAccess,
  emptyMessage,
}: CopyablePromptGridProps) {
  const handleCopyPrompt = useCallback(async (prompt: PromptFile) => {
    const text = extractPromptText(prompt.content);
    if (text) {
      await copyToClipboard(text);
    }
  }, []);

  return (
    <PromptGrid
      prompts={prompts}
      hasAccess={hasAccess}
      onCopyPrompt={handleCopyPrompt}
      emptyMessage={emptyMessage}
    />
  );
}
