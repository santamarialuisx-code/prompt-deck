"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { PromptFile } from "@/lib/mdx";

interface PromptAccessGateProps {
  prompt: PromptFile;
  hasAccess: boolean;
}

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

export function PromptAccessGate({ prompt, hasAccess }: PromptAccessGateProps) {
  const promptText = extractPromptText(prompt.content);

  if (hasAccess) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Prompt</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <pre className="whitespace-pre-wrap rounded-lg bg-muted p-4 text-sm leading-relaxed">
            {promptText || "No prompt text found."}
          </pre>
        </CardContent>
      </Card>
    );
  }

  const previewLines = promptText.split("\n").slice(0, 2).join("\n");

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Prompt</CardTitle>
          <Badge variant="outline">Premium</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Blurred preview */}
        <div className="relative">
          <pre className="whitespace-pre-wrap rounded-lg bg-muted p-4 text-sm leading-relaxed">
            {previewLines || "No prompt text found."}
          </pre>
          <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-transparent via-background/80 to-background" />
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed p-6 text-center">
          <p className="text-sm font-medium text-muted-foreground">
            This prompt is for premium members
          </p>
          <p className="text-xs text-muted-foreground">
            Get lifetime access to all 150+ prompts
          </p>
          <Link href="/checkout">
            <Button size="sm">Get Lifetime Access</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
