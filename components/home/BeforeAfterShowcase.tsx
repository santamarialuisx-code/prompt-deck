"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

const examples = [
  {
    id: 1,
    category: "Professional",
    prompt: "Professional LinkedIn headshot, studio lighting, neutral background, confident expression, sharp focus",
    beforeGradient: "from-zinc-700 to-zinc-800",
    afterGradient: "from-orange-600 to-orange-500",
  },
  {
    id: 2,
    category: "Artistic",
    prompt: "Oil painting style portrait, dramatic lighting, Renaissance color palette, textured brushstrokes",
    beforeGradient: "from-zinc-600 to-zinc-700",
    afterGradient: "from-orange-500 to-amber-500",
  },
  {
    id: 3,
    category: "Social Media",
    prompt: "Instagram influencer aesthetic, golden hour lighting, vibrant colors, bokeh background, high engagement look",
    beforeGradient: "from-zinc-700 to-zinc-800",
    afterGradient: "from-orange-600 to-red-500",
  },
  {
    id: 4,
    category: "Product",
    prompt: "E-commerce product photo, white background, professional lighting, sharp details, Amazon-ready",
    beforeGradient: "from-zinc-600 to-zinc-700",
    afterGradient: "from-orange-500 to-yellow-500",
  },
];

const categories = ["All", "Professional", "Artistic", "Social Media", "Product"];

export function BeforeAfterShowcase() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? examples
    : examples.filter((e) => e.category === activeCategory);

  return (
    <section className="bg-[#0a0a0a] border-t border-white/5">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            See the Transformation
          </h2>
          <p className="mt-3 text-lg text-gray-400">
            From generic selfie to professional content — in seconds
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-sm font-bold transition-all ${
                activeCategory === cat
                  ? "bg-[#f97316] text-white"
                  : "border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Before/After cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((example) => (
            <div key={example.id} className="rounded-xl border border-white/5 bg-[#111111] p-6">
              {/* Category badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400">
                  <Sparkles className="h-3 w-3 text-[#f97316]" />
                  {example.category}
                </span>
              </div>

              {/* Before/After comparison */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {/* Before */}
                <div>
                  <div className="text-xs text-gray-500 mb-2 uppercase tracking-wider font-bold">Before</div>
                  <div className={`aspect-square rounded-xl bg-gradient-to-br ${example.beforeGradient} flex items-center justify-center`}>
                    <span className="text-4xl opacity-40">📷</span>
                  </div>
                </div>
                {/* After */}
                <div>
                  <div className="text-xs text-gray-500 mb-2 uppercase tracking-wider font-bold">After</div>
                  <div className={`aspect-square rounded-xl bg-gradient-to-br ${example.afterGradient} flex items-center justify-center`}>
                    <Sparkles className="h-8 w-8 text-white/80" />
                  </div>
                </div>
              </div>

              {/* Prompt text */}
              <div className="rounded-lg bg-[#0a0a0a] border border-white/5 p-3">
                <div className="text-xs text-gray-500 mb-1.5 uppercase tracking-wider font-bold">Prompt</div>
                <p className="text-xs text-gray-300 font-mono leading-relaxed">
                  {example.prompt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
