import { getAllPrompts } from "@/lib/mdx";
import { GalleryClient } from "@/components/gallery/GalleryClient";

export const metadata = {
  title: "Prompt Gallery",
  description: "Browse all prompts, filter by category, tool, or platform",
};

export default function GalleryPage() {
  const prompts = getAllPrompts();

  const categories = [...new Set(prompts.map((p) => p.category))].sort();
  const tools = [
    ...new Set(prompts.flatMap((p) => p.tools)),
  ].sort();
  const platforms = [
    ...new Set(prompts.flatMap((p) => p.platforms)),
  ].sort();

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Prompt Gallery
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Browse all prompts, filter by category, tool, or platform
        </p>
      </div>

      <GalleryClient
        prompts={prompts}
        categories={categories}
        tools={tools}
        platforms={platforms}
      />
    </main>
  );
}
