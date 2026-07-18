"use client";

import { Badge } from "@/components/ui/badge";
import { CategoryBadge } from "./CategoryBadge";
import { CopyButton } from "./CopyButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PromptFile } from "@/lib/mdx";

interface PromptDetailProps {
  prompt: PromptFile;
}

/**
 * Extract the main prompt text from MDX content.
 * Looks for content between the first "## Prompt" heading and the next heading.
 */
function extractPromptText(content: string): string {
  const lines = content.split("\n");
  let capturing = false;
  const promptLines: string[] = [];

  for (const line of lines) {
    if (line.match(/^##\s+Prompt/i)) {
      capturing = true;
      continue;
    }
    if (capturing && line.match(/^##\s/)) {
      break;
    }
    if (capturing) {
      promptLines.push(line);
    }
  }

  return promptLines.join("\n").trim();
}

export function PromptDetail({ prompt }: PromptDetailProps) {
  const promptText = extractPromptText(prompt.content);

  return (
    <article className="space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <CategoryBadge category={prompt.category} />
          {prompt.is_free ? (
            <Badge variant="default" className="bg-green-600 hover:bg-green-700">
              Free Sample
            </Badge>
          ) : (
            <Badge variant="outline">Premium Prompt</Badge>
          )}
        </div>

        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {prompt.title}
        </h1>

        {prompt.description && (
          <p className="text-lg text-muted-foreground">{prompt.description}</p>
        )}
      </div>

      {/* Tools & Platforms */}
      <div className="flex flex-wrap gap-4">
        <div>
          <h3 className="mb-1 text-sm font-medium text-muted-foreground">
            Tools
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {prompt.tools.map((tool) => (
              <Badge key={tool} variant="secondary">
                {tool}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-1 text-sm font-medium text-muted-foreground">
            Platforms
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {prompt.platforms.map((platform) => (
              <Badge key={platform} variant="outline">
                {platform}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Prompt Text */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Prompt</CardTitle>
            {promptText && <CopyButton text={promptText} />}
          </div>
        </CardHeader>
        <CardContent>
          <pre className="whitespace-pre-wrap rounded-lg bg-muted p-4 text-sm leading-relaxed">
            {promptText || "No prompt text found."}
          </pre>
        </CardContent>
      </Card>

      {/* Negative Prompt */}
      {prompt.negative_prompt && (
        <Card>
          <CardHeader>
            <CardTitle>Negative Prompt</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap rounded-lg bg-muted p-4 text-sm leading-relaxed text-muted-foreground">
              {prompt.negative_prompt}
            </pre>
          </CardContent>
        </Card>
      )}

      {/* Tips (raw MDX content below the prompt section) */}
      {prompt.content.includes("## Tips") && (
        <Card>
          <CardHeader>
            <CardTitle>Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              {prompt.content
                .split("\n")
                .filter((line) => {
                  // Extract bullet points from Tips section
                  const lines = prompt.content.split("\n");
                  const tipsStart = lines.findIndex((l) =>
                    l.match(/^##\s+Tips/i)
                  );
                  const tipsEnd = lines.findIndex(
                    (l, i) => i > tipsStart && l.match(/^##\s/)
                  );
                  const idx = lines.indexOf(line);
                  return idx > tipsStart && (tipsEnd === -1 || idx < tipsEnd);
                })
                .filter((line) => line.trim().startsWith("-"))
                .map((line, i) => (
                  <p key={i} className="mb-1">
                    {line.replace(/^-\s*/, "")}
                  </p>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </article>
  );
}
