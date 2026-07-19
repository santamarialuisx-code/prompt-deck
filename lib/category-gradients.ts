/**
 * Map of category slugs to Tailwind gradient classes for placeholder backgrounds.
 * Used when a prompt has no card_image_url or example_output_url.
 */
const categoryGradients: Record<string, string> = {
  "selfie-to-professional-portrait": "from-slate-500/40 to-blue-600/40",
  "selfie-to-artistic": "from-purple-500/40 to-pink-600/40",
  "selfie-to-headshot": "from-amber-500/40 to-orange-600/40",
  "selfie-to-social-media": "from-cyan-500/40 to-blue-600/40",
  "product-photo-enhancement": "from-green-500/40 to-emerald-600/40",
};

const fallbackGradient = "from-gray-500/40 to-gray-600/40";

/**
 * Get the Tailwind gradient classes for a category.
 * Falls back to a neutral gradient for unknown categories.
 */
export function getCategoryGradient(category: string): string {
  return categoryGradients[category] || fallbackGradient;
}
