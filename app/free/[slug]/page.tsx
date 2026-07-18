import { notFound } from "next/navigation";
import Link from "next/link";
import { getPromptBySlug, getFreeSamples, getAllPrompts } from "@/lib/mdx";
import { PromptAccessGate } from "@/components/prompt/PromptAccessGate";
import { PromptCard } from "@/components/prompt/PromptCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

interface FreePromptPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const freePrompts = getFreeSamples();
  return freePrompts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: FreePromptPageProps): Promise<Metadata> {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);
  if (!prompt) return { title: "Prompt Not Found" };

  return {
    title: `${prompt.title} — Free Sample — Prompt Deck`,
    description: prompt.description || `Try the ${prompt.title} prompt for free.`,
  };
}

export default async function FreePromptPage({ params }: FreePromptPageProps) {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);

  if (!prompt || !prompt.is_free) {
    notFound();
  }

  // Related free prompts (excluding current)
  const relatedFree = getFreeSamples()
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  // If fewer than 3 free prompts, pull some paid ones as "you might also like"
  const moreRelated =
    relatedFree.length < 3
      ? getAllPrompts()
          .filter((p) => p.slug !== slug && !p.is_free)
          .slice(0, 3 - relatedFree.length)
      : [];
  const allRelated = [...relatedFree, ...moreRelated];

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      {/* Back navigation */}
      <div className="mb-8">
        <Link href="/free">
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
            Back to Free Samples
          </Button>
        </Link>
      </div>

      {/* Free sample banner */}
      <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-center dark:border-green-800 dark:bg-green-950">
        <p className="text-sm font-medium text-green-800 dark:text-green-200">
          This is a free sample — try it out with no restrictions!
        </p>
      </div>

      {/* Badges */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Badge variant="secondary">
          {prompt.category.replace(/^selfie-to-/, "").split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
        </Badge>
        {prompt.tools.map((tool) => (
          <Badge key={tool} variant="outline">{tool}</Badge>
        ))}
        {prompt.platforms.map((platform) => (
          <Badge key={platform} variant="outline">{platform}</Badge>
        ))}
        <Badge variant="default" className="bg-green-600 hover:bg-green-700">Free</Badge>
      </div>

      {/* Title & description */}
      <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">
        {prompt.title}
      </h1>
      {prompt.description && (
        <p className="mb-8 text-lg text-muted-foreground">{prompt.description}</p>
      )}

      {/* Full prompt text (free — no gate, no negative prompt) */}
      <PromptAccessGate prompt={prompt} hasAccess={true} />

      {/* CTA */}
      <div className="mt-8 flex flex-col items-center gap-3 rounded-lg border border-dashed p-8 text-center">
        <p className="text-lg font-medium">Want access to all 150+ prompts?</p>
        <p className="text-sm text-muted-foreground">
          Get lifetime access and never worry about prompt engineering again.
        </p>
        <Link href="/checkout">
          <Button>Get Lifetime Access</Button>
        </Link>
      </div>

      {/* Related prompts */}
      {allRelated.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-4 text-xl font-semibold">You Might Also Like</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {allRelated.map((rp) => (
              <PromptCard key={rp.slug} prompt={rp} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
