"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FilterBarProps {
  categories: string[];
  tools: string[];
  platforms: string[];
  resultCount: number;
  totalCount: number;
  embedded?: boolean;
}

function formatLabel(value: string): string {
  return value
    .replace(/^selfie-to-/, "")
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function FilterBar({
  categories,
  tools,
  platforms,
  resultCount,
  totalCount,
  embedded,
}: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const activeCategory = searchParams.get("category") || "";
  const activeTool = searchParams.get("tool") || "";
  const activePlatform = searchParams.get("platform") || "";
  const searchQuery = searchParams.get("q") || "";

  const hasFilters = activeCategory || activeTool || activePlatform || searchQuery;

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      startTransition(() => {
        router.push(`?${params.toString()}`, { scroll: false });
      });
    },
    [router, searchParams, startTransition]
  );

  const clearAll = useCallback(() => {
    startTransition(() => {
      router.push(embedded ? "/?#gallery" : "/gallery", { scroll: false });
    });
  }, [router, startTransition, embedded]);

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Input
          type="search"
          placeholder="Search prompts..."
          defaultValue={searchQuery}
          onChange={(e) => updateParam("q", e.target.value)}
          className="w-full"
        />
      </div>

      {/* Category filter */}
      <div>
        <p className="mb-2 text-sm font-medium text-muted-foreground">
          Category
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={!activeCategory ? "default" : "outline"}
            onClick={() => updateParam("category", "")}
          >
            All
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              size="sm"
              variant={activeCategory === cat ? "default" : "outline"}
              onClick={() => updateParam("category", activeCategory === cat ? "" : cat)}
            >
              {formatLabel(cat)}
            </Button>
          ))}
        </div>
      </div>

      {/* Tool filter */}
      <div>
        <p className="mb-2 text-sm font-medium text-muted-foreground">Tool</p>
        <div className="flex flex-wrap gap-2">
          {tools.map((tool) => (
            <Button
              key={tool}
              size="sm"
              variant={activeTool === tool ? "default" : "outline"}
              onClick={() => updateParam("tool", activeTool === tool ? "" : tool)}
            >
              {tool}
            </Button>
          ))}
        </div>
      </div>

      {/* Platform filter */}
      <div>
        <p className="mb-2 text-sm font-medium text-muted-foreground">
          Platform
        </p>
        <div className="flex flex-wrap gap-2">
          {platforms.map((platform) => (
            <Button
              key={platform}
              size="sm"
              variant={activePlatform === platform ? "default" : "outline"}
              onClick={() =>
                updateParam("platform", activePlatform === platform ? "" : platform)
              }
            >
              {platform}
            </Button>
          ))}
        </div>
      </div>

      {/* Result count + clear */}
      <div className="flex items-center justify-between pt-2">
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-foreground">{resultCount}</span> of{" "}
          <span className="font-medium text-foreground">{totalCount}</span>{" "}
          prompts
        </p>
        {hasFilters && (
          <Button size="sm" variant="ghost" onClick={clearAll}>
            Clear all
          </Button>
        )}
      </div>
    </div>
  );
}
