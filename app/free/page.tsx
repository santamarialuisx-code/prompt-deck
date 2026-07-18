import { getFreeSamples } from "@/lib/mdx";
import { PromptGrid } from "@/components/prompt/PromptGrid";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Free Prompt Samples — Prompt Deck",
  description:
    "Try these AI image prompts for free — no account needed. Sample professional, artistic, and social media prompts.",
};

export default function FreePage() {
  const freePrompts = getFreeSamples();

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Free Prompt Samples
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Try these prompts for free — no account needed
        </p>
        <div className="mt-6">
          <Link href="/gallery">
            <Button variant="outline">Browse All Prompts</Button>
          </Link>
        </div>
      </div>

      <PromptGrid
        prompts={freePrompts}
        emptyMessage="No free samples available yet."
      />
    </main>
  );
}
