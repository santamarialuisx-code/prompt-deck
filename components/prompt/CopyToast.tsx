"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyToastProps {
  show: boolean;
  className?: string;
}

/**
 * Lightweight inline toast that appears when content is copied.
 * Fades in/out via CSS opacity transition, auto-dismisses after 2 seconds.
 */
export function CopyToast({ show, className }: CopyToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 2000);
      return () => clearTimeout(timer);
    }
    setVisible(false);
  }, [show]);

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-200",
        visible ? "opacity-100" : "opacity-0",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 rounded-full bg-green-600 px-3 py-1.5 text-sm font-medium text-white shadow-lg">
        <Check className="h-3.5 w-3.5" />
        Copied!
      </div>
    </div>
  );
}
