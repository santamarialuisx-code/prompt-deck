import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { safeValidateFrontmatter } from "./schemas";

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

/**
 * Extract unique categories from all prompts.
 * Returns an array of distinct category strings, sorted alphabetically.
 */
export function getCategories(): string[] {
  const prompts = getAllPrompts();
  const categories = new Set(prompts.map((p) => p.category));
  return Array.from(categories).sort();
}

/**
 * Basic text search across prompt title, description, and content.
 * Case-insensitive substring matching.
 */
export function searchPrompts(query: string): PromptFile[] {
  const lowerQuery = query.toLowerCase();
  return getAllPrompts().filter(
    (p) =>
      p.title.toLowerCase().includes(lowerQuery) ||
      (p.description && p.description.toLowerCase().includes(lowerQuery)) ||
      p.content.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery) ||
      p.tools.some((t) => t.toLowerCase().includes(lowerQuery)) ||
      p.platforms.some((pl) => pl.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Get the total count of all prompts.
 */
export function getPromptCount(): number {
  return getAllPrompts().length;
}

/**
 * Get the count of prompts marked as free samples.
 */
export function getFreeSampleCount(): number {
  return getFreeSamples().length;
}

/**
 * Validate all MDX files against the frontmatter schema.
 * Returns validation results for each file.
 */
export function validateAllPrompts(): {
  valid: PromptFile[];
  invalid: { slug: string; errors: string[] }[];
} {
  const prompts = getAllPrompts();
  const valid: PromptFile[] = [];
  const invalid: { slug: string; errors: string[] }[] = [];

  for (const prompt of prompts) {
    const result = safeValidateFrontmatter(prompt as unknown as Record<string, unknown>);
    if (result.success) {
      valid.push(prompt);
    } else {
      invalid.push({
        slug: prompt.slug,
        errors: result.error.issues.map(
          (i) => `${i.path.join(".")}: ${i.message}`
        ),
      });
    }
  }

  return { valid, invalid };
}
