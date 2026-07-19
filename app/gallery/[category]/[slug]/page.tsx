import { notFound } from "next/navigation";
import Link from "next/link";
import { getPromptBySlug, getPromptsByCategory, getAllPrompts } from "@/lib/mdx";
import { canAccessPrompt } from "@/lib/access";
import { PromptDetail } from "@/components/prompt/PromptDetail";
import { PromptAccessGate } from "@/components/prompt/PromptAccessGate";
import { RelatedPrompts } from "@/components/prompt/RelatedPrompts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

interface PromptPageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  const prompts = getAllPrompts();
  return prompts.map((p) => ({
    category: p.category,
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: PromptPageProps): Promise<Metadata> {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);
  if (!prompt) return { title: "Prompt Not Found" };

  return {
    title: `${prompt.title} — Prompt Deck`,
    description: prompt.description || `Use the ${prompt.title} prompt.`,
  };
}

export default async function PromptPage({ params }: PromptPageProps) {
  const { category, slug } = await params;
  const prompt = getPromptBySlug(slug);

  if (!prompt || prompt.category.toLowerCase() !== category.toLowerCase()) {
    notFound();
  }

  const hasAccess = await canAccessPrompt(prompt.is_free);

  // Related prompts from same category (excluding current)
  const relatedPrompts = getPromptsByCategory(category)
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  // Fallback: if fewer than 3 in category, pull from all
  const moreRelated =
    relatedPrompts.length < 3
      ? getAllPrompts()
          .filter((p) => p.slug !== slug && p.category !== category)
          .slice(0, 3 - relatedPrompts.length)
      : [];
  const allRelated = [...relatedPrompts, ...moreRelated];

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      {/* Back navigation */}
      <div className="mb-8">
        <Link href={`/gallery/${category}`}>
          <Button variant="ghost" size="sm">
            <svg
              className="mr-1 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to {prompt.category.replace(/^selfie-to-/, "").split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
          </Button>
        </Link>
      </div>

      {/* Badges */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Badge variant="secondary">{prompt.category.replace(/^selfie-to-/, "").split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}</Badge>
        {prompt.tools.map((tool) => (
          <Badge key={tool} variant="outline">{tool}</Badge>
        ))}
        {prompt.platforms.map((platform) => (
          <Badge key={platform} variant="outline">{platform}</Badge>
        ))}
        {prompt.is_free ? (
          <Badge variant="default" className="bg-green-600 hover:bg-green-700">Free</Badge>
        ) : (
          <Badge variant="outline">Paid</Badge>
        )}
      </div>

      {/* Title & description */}
      <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">
        {prompt.title}
      </h1>
      {prompt.description && (
        <p className="mb-8 text-lg text-muted-foreground">{prompt.description}</p>
      )}

      {/* Access-gated prompt text */}
      <PromptAccessGate prompt={prompt} hasAccess={hasAccess} />

      {/* Example output image */}
      {prompt.example_output_url && (
        <div className="mt-6">
          <h3 className="mb-2 text-sm font-medium text-muted-foreground">Example Output</h3>
          <img
            src={prompt.example_output_url}
            alt={`Example output for ${prompt.title}`}
            className="rounded-lg border"
          />
        </div>
      )}

      {/* Related prompts */}
      <RelatedPrompts prompts={allRelated} />
    </main>
  );
}
