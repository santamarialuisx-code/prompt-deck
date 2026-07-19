"use client";

import { useState } from "react";
import Image from "next/image";
import { ClipboardCopy, Lock } from "lucide-react";
import { CategoryBadge } from "./CategoryBadge";
import { CopyToast } from "./CopyToast";
import { getCategoryGradient } from "@/lib/category-gradients";
import type { PromptFile } from "@/lib/mdx";

interface PromptCardProps {
  prompt: PromptFile;
  hasAccess: boolean;
  onCopy?: (prompt: PromptFile) => void;
  onNavigate?: (prompt: PromptFile) => void;
}

export function PromptCard({ prompt, hasAccess, onCopy, onNavigate }: PromptCardProps) {
  const [showToast, setShowToast] = useState(false);
  const [imgError, setImgError] = useState(false);

  const imageUrl = !imgError
    ? prompt.card_image_url || prompt.example_output_url || undefined
    : undefined;
  const useGradient = !imageUrl;

  const handleClick = () => {
    if (!prompt.is_free && !hasAccess) {
      onNavigate?.(prompt);
      return;
    }
    onCopy?.(prompt);
    setShowToast(true);
  };

  return (
    <div
      className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl"
      onClick={handleClick}
    >
      {/* Image or gradient fallback */}
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={prompt.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onError={() => setImgError(true)}
        />
      ) : (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(prompt.category)}`}
        />
      )}

      {/* Hover overlay — hidden on touch devices via media query */}
      <div className="absolute inset-0 flex flex-col justify-end bg-black/0 p-3 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:bg-black/60 group-hover:opacity-100 motion-reduce:transition-none max-md:!hidden">
        <div className="mb-auto flex justify-end">
          {prompt.is_free || hasAccess ? (
            <ClipboardCopy className="h-5 w-5 text-white/80 transition-transform duration-200 group-hover:scale-110" />
          ) : (
            <Lock className="h-5 w-5 text-white/80" />
          )}
        </div>
        <div>
          <h3 className="mb-1 line-clamp-2 text-sm font-semibold text-white">
            {prompt.title}
          </h3>
          <CategoryBadge category={prompt.category} className="bg-white/20 text-white backdrop-blur-sm" />
        </div>
      </div>

      {/* Touch devices: always-visible bottom bar */}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent p-3 md:hidden">
        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-1 text-sm font-semibold text-white">
            {prompt.title}
          </h3>
          <CategoryBadge category={prompt.category} className="mt-1 bg-white/20 text-white backdrop-blur-sm" />
        </div>
        {prompt.is_free || hasAccess ? (
          <ClipboardCopy className="ml-2 h-4 w-4 shrink-0 text-white/80" />
        ) : (
          <Lock className="ml-2 h-4 w-4 shrink-0 text-white/80" />
        )}
      </div>

      {/* Copy toast */}
      <CopyToast show={showToast} />
    </div>
  );
}
