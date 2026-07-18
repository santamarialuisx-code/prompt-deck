import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "prompts");

interface PromptFrontmatter {
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

interface SyncResult {
  totalPrompts: number;
  categories: string[];
  freeSamples: number;
  paidPrompts: number;
  validationErrors: { file: string; errors: string[] }[];
}

function syncPrompts(): SyncResult {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.error(`Content directory not found: ${CONTENT_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
  const categories = new Set<string>();
  let freeSamples = 0;
  let paidPrompts = 0;
  const validationErrors: { file: string; errors: string[] }[] = [];

  for (const file of files) {
    const filePath = path.join(CONTENT_DIR, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);
    const slug = file.replace(/\.mdx$/, "");

    // Validate required fields
    const errors: string[] = [];
    const fm = data as Partial<PromptFrontmatter>;

    if (!fm.id || typeof fm.id !== "string") {
      errors.push("missing or invalid 'id'");
    }
    if (!fm.title || typeof fm.title !== "string") {
      errors.push("missing or invalid 'title'");
    }
    if (!fm.category || typeof fm.category !== "string") {
      errors.push("missing or invalid 'category'");
    }
    if (!Array.isArray(fm.tools)) {
      errors.push("'tools' must be an array");
    }
    if (!Array.isArray(fm.platforms)) {
      errors.push("'platforms' must be an array");
    }
    if (typeof fm.is_free !== "boolean") {
      errors.push("'is_free' must be a boolean");
    }
    if (typeof fm.sort_order !== "number") {
      errors.push("'sort_order' must be a number");
    }

    if (errors.length > 0) {
      validationErrors.push({ file: slug, errors });
    } else {
      categories.add(fm.category!);
      if (fm.is_free) {
        freeSamples++;
      } else {
        paidPrompts++;
      }
    }
  }

  return {
    totalPrompts: files.length,
    categories: Array.from(categories).sort(),
    freeSamples,
    paidPrompts,
    validationErrors,
  };
}

// Run the sync
const result = syncPrompts();

console.log("=== Prompt Sync Summary ===\n");
console.log(`Total prompts:    ${result.totalPrompts}`);
console.log(`Free samples:     ${result.freeSamples}`);
console.log(`Paid prompts:     ${result.paidPrompts}`);
console.log(`Categories (${result.categories.length}):`);
for (const cat of result.categories) {
  console.log(`  - ${cat}`);
}

if (result.validationErrors.length > 0) {
  console.log(`\nValidation errors (${result.validationErrors.length}):`);
  for (const err of result.validationErrors) {
    console.log(`  ${err.file}:`);
    for (const e of err.errors) {
      console.log(`    - ${e}`);
    }
  }
  process.exit(1);
} else {
  console.log("\nAll prompts validated successfully.");
}

// Write JSON summary for build consumption
const summaryPath = path.join(process.cwd(), "content", "prompts-summary.json");
const summary = {
  generatedAt: new Date().toISOString(),
  totalPrompts: result.totalPrompts,
  categories: result.categories,
  freeSamples: result.freeSamples,
  paidPrompts: result.paidPrompts,
  prompts: (() => {
    const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
    return files.map((file) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
      const { data } = matter(raw);
      const fm = data as PromptFrontmatter;
      return {
        slug: file.replace(/\.mdx$/, ""),
        id: fm.id,
        title: fm.title,
        category: fm.category,
        is_free: fm.is_free,
        sort_order: fm.sort_order,
        tools: fm.tools,
        platforms: fm.platforms,
      };
    });
  })(),
};

fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2), "utf-8");
console.log(`\nSummary written to: ${summaryPath}`);
