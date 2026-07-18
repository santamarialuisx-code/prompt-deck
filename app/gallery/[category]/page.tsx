import { notFound } from "next/navigation";
import { getAllPrompts, getPromptsByCategory } from "@/lib/mdx";
import { GalleryClient } from "@/components/gallery/GalleryClient";
import type { Metadata } from "next";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

function formatCategoryName(slug: string): string {
  return slug
    .replace(/^selfie-to-/, "")
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

const categoryDescriptions: Record<string, string> = {
  "selfie-to-professional-portrait":
    "Transform selfies into polished professional headshots for LinkedIn and corporate profiles.",
  "selfie-to-artistic":
    "Turn selfies into stunning art — oil paintings, anime avatars, vintage film, and more.",
  "selfie-to-social-media":
    "Create scroll-stopping profile photos for Instagram, TikTok, and beyond.",
  "selfie-to-headshot":
    "Studio-quality executive headshots with professional lighting and styling.",
  "product-photo-enhancement":
    "Optimize product photos for Amazon, Etsy, and e-commerce listings.",
};

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const name = formatCategoryName(category);
  return {
    title: `${name} Prompts`,
    description: `Browse ${name} prompts for AI image generation.`,
  };
}

export async function generateStaticParams() {
  const prompts = getAllPrompts();
  const categories = [...new Set(prompts.map((p) => p.category))];
  return categories.map((category) => ({ category }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const prompts = getPromptsByCategory(category);

  if (prompts.length === 0) {
    notFound();
  }

  const allPrompts = getAllPrompts();
  const categories = [...new Set(allPrompts.map((p) => p.category))].sort();
  const tools = [...new Set(allPrompts.flatMap((p) => p.tools))].sort();
  const platforms = [...new Set(allPrompts.flatMap((p) => p.platforms))].sort();

  const categoryName = formatCategoryName(category);
  const description =
    categoryDescriptions[category] || `Browse ${categoryName} prompts.`;

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {categoryName}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">{description}</p>
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
