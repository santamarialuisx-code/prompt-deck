"use client";

import { Badge } from "@/components/ui/badge";

interface CategoryBadgeProps {
  category: string;
  className?: string;
}

/**
 * Formats a category slug into a human-readable label.
 * "selfie-to-professional-portrait" → "Professional Portrait"
 */
function formatCategory(slug: string): string {
  return slug
    .replace(/^selfie-to-/, "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  return (
    <Badge variant="secondary" className={className}>
      {formatCategory(category)}
    </Badge>
  );
}
