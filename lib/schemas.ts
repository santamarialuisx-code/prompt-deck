import { z } from "zod";

/**
 * Zod schema for MDX frontmatter validation.
 * Ensures all prompt files follow a consistent structure.
 */
export const promptFrontmatterSchema = z.object({
  id: z.string().min(1, "id is required"),
  title: z.string().min(1, "title is required"),
  description: z.string().optional(),
  category: z.string().min(1, "category is required"),
  tools: z.array(z.string()).default([]),
  platforms: z.array(z.string()).default([]),
  is_free: z.boolean().default(false),
  sort_order: z.number().int().default(0),
  negative_prompt: z.string().optional(),
  example_output_url: z.string().optional(),
  card_image_url: z.string().optional(),
});

export type PromptFrontmatterInput = z.input<typeof promptFrontmatterSchema>;
export type PromptFrontmatterValidated = z.output<typeof promptFrontmatterSchema>;

/**
 * Validate raw frontmatter object against the schema.
 * Returns parsed result or throws with detailed ZodError.
 */
export function validateFrontmatter(data: Record<string, unknown>) {
  return promptFrontmatterSchema.parse(data);
}

/**
 * Safe validation — returns { success, data, error } instead of throwing.
 */
export function safeValidateFrontmatter(data: Record<string, unknown>) {
  return promptFrontmatterSchema.safeParse(data);
}
