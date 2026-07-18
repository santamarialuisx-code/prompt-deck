import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <section className="border-t bg-muted/20">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Try These Free
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Get a taste of what prompt-deck can do — no signup required
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {prompts.map((prompt) => (
            <Card key={prompt.slug} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="line-clamp-2 text-base">
                    {prompt.title}
                  </CardTitle>
                  <Badge
                    variant="default"
                    className="shrink-0 bg-green-600 hover:bg-green-700"
                  >
                    Free
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2">
                  {prompt.description || "No description available."}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Badge variant="secondary" className="text-xs">
                  {formatCategory(prompt.category)}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/free"
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-5 text-sm font-medium transition-colors hover:bg-muted"
          >
            View All Free Samples
          </Link>
        </div>
      </div>
    </section>
  );
}
