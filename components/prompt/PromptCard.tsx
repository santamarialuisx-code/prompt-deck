"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CategoryBadge } from "./CategoryBadge";
import type { PromptFile } from "@/lib/mdx";

interface PromptCardProps {
  prompt: PromptFile;
  onClick?: (prompt: PromptFile) => void;
}

function getPromptHref(prompt: PromptFile): string {
  if (prompt.is_free) {
    return `/free/${prompt.slug}`;
  }
  return `/gallery/${prompt.category}/${prompt.slug}`;
}

export function PromptCard({ prompt, onClick }: PromptCardProps) {
  if (onClick) {
    return (
      <Card className="cursor-pointer transition-shadow hover:shadow-md" onClick={() => onClick(prompt)}>
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="line-clamp-2">{prompt.title}</CardTitle>
            {prompt.is_free ? (
              <Badge variant="default" className="shrink-0 bg-green-600 hover:bg-green-700">
                Free
              </Badge>
            ) : (
              <Badge variant="outline" className="shrink-0">
                Paid
              </Badge>
            )}
          </div>
          <CardDescription className="line-clamp-2">
            {prompt.description || "No description available."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-1.5">
            <CategoryBadge category={prompt.category} />
            {prompt.tools.map((tool) => (
              <Badge key={tool} variant="outline" className="text-xs">
                {tool}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter>
          <div className="flex flex-wrap gap-1">
            {prompt.platforms.map((platform) => (
              <span
                key={platform}
                className="text-xs text-muted-foreground"
              >
                {platform}
                {prompt.platforms.indexOf(platform) < prompt.platforms.length - 1
                  ? " · "
                  : ""}
              </span>
            ))}
          </div>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Link href={getPromptHref(prompt)} className="block">
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="line-clamp-2">{prompt.title}</CardTitle>
            {prompt.is_free ? (
              <Badge variant="default" className="shrink-0 bg-green-600 hover:bg-green-700">
                Free
              </Badge>
            ) : (
              <Badge variant="outline" className="shrink-0">
                Paid
              </Badge>
            )}
          </div>
          <CardDescription className="line-clamp-2">
            {prompt.description || "No description available."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-1.5">
            <CategoryBadge category={prompt.category} />
            {prompt.tools.map((tool) => (
              <Badge key={tool} variant="outline" className="text-xs">
                {tool}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter>
          <div className="flex flex-wrap gap-1">
            {prompt.platforms.map((platform) => (
              <span
                key={platform}
                className="text-xs text-muted-foreground"
              >
                {platform}
                {prompt.platforms.indexOf(platform) < prompt.platforms.length - 1
                  ? " · "
                  : ""}
              </span>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
