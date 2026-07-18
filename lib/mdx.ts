import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "prompts");

export interface PromptFrontmatter {
  id: string;
  title: string;
  description?: string;
  category: string;
  tools: string[];
  platforms: string[];
  is_free: boolean;
  sort_order: number;
  negative_prompt?: string;
  example_output_url?: string;
}

export interface PromptFile extends PromptFrontmatter {
  slug: string;
  content: string;
}

/**
 * Read a single MDX prompt file by slug.
 */
export function getPromptBySlug(slug: string): PromptFile | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    ...(data as PromptFrontmatter),
    slug,
    content,
  };
}

/**
 * Read all MDX prompt files from the content directory.
 */
export function getAllPrompts(): PromptFile[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      return getPromptBySlug(slug);
    })
    .filter((p): p is PromptFile => p !== null)
    .sort((a, b) => a.sort_order - b.sort_order);
}

/**
 * Filter prompts by category slug.
 */
export function getPromptsByCategory(category: string): PromptFile[] {
  return getAllPrompts().filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get prompts marked as free samples.
 */
export function getFreeSamples(): PromptFile[] {
  return getAllPrompts().filter((p) => p.is_free);
}
