import Link from "next/link";
import { Sparkles, Star } from "lucide-react";

export function Hero() {
  return (
    <section className="relative bg-[#0a0a0a]">
      <div className="mx-auto max-w-5xl px-6 py-24 text-center sm:py-32">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-400 mb-8">
          <Sparkles className="h-4 w-4 text-[#f97316]" />
          <span>150+ Curated AI Prompts</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
          Turn Your Selfies into
          <span className="block text-[#f97316]">
            Stunning AI Art
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400 sm:text-xl">
          Copy-paste prompts that actually work. No prompt engineering degree
          required. Professional results in seconds.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/checkout"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#f97316] px-8 text-sm font-bold text-white transition-all hover:bg-[#fb923c] hover:-translate-y-0.5"
          >
            Get Lifetime Access — $29
          </Link>
          <Link
            href="/free"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 text-sm font-medium text-white transition-all hover:bg-white/10"
          >
            Try Free Samples
          </Link>
        </div>

        {/* Social proof stats */}
        <div className="mt-16 flex items-center justify-center gap-8 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold">2,400+</span>
            <span>Prompts</span>
          </div>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <span className="text-white font-bold">500+</span>
            <span>Creators</span>
          </div>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 fill-[#f97316] text-[#f97316]" />
            <span className="text-white font-bold">4.9</span>
            <span>Rating</span>
          </div>
        </div>
      </div>
    </section>
  );
}
