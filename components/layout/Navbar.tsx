"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Sparkles } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/gallery", label: "Gallery" },
  { href: "/free", label: "Free Samples" },
  { href: "/checkout", label: "Pricing" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4">
      <nav className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#111111]/90 backdrop-blur-md px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Sparkles className="h-5 w-5 text-[#f97316] group-hover:text-[#fb923c] transition-colors" />
          <span className="text-lg font-black text-white">Prompt Deck</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/checkout"
            className="inline-flex h-9 items-center justify-center rounded-lg bg-[#f97316] px-4 text-sm font-bold text-white transition-all hover:bg-[#fb923c]"
          >
            Get Access
          </Link>
        </div>

        {/* Mobile hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="md:hidden text-gray-400 hover:text-white">
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent className="bg-[#111111] border-l border-white/10">
            <SheetTitle className="text-white">Menu</SheetTitle>
            <div className="flex flex-col gap-4 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-lg text-gray-400 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/checkout"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 items-center justify-center rounded-lg bg-[#f97316] px-4 text-sm font-bold text-white mt-4 transition-all hover:bg-[#fb923c]"
              >
                Get Access
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
