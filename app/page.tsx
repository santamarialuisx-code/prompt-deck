import { getAllPrompts } from "@/lib/mdx";
import { canAccessPrompt } from "@/lib/access";
import { Hero } from "@/components/home/Hero";
import { SocialStrip } from "@/components/home/SocialProof";
import { GalleryClient } from "@/components/gallery/GalleryClient";
import { ValueProps } from "@/components/home/ValueProps";
import { PricingSection } from "@/components/home/PricingSection";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata = {
  title: "Prompt Deck — 150+ Curated AI Prompts",
  description:
    "Copy-paste AI prompts that actually work. Professional results in seconds. Lifetime access for $29.",
  openGraph: {
    title: "Prompt Deck — 150+ Curated AI Prompts",
    description:
      "Copy-paste AI prompts that actually work. Professional results in seconds. Lifetime access for $29.",
    type: "website",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Prompt Deck",
  description:
    "150+ curated AI prompts for selfies, professional photos, and social media content.",
  offers: {
    "@type": "Offer",
    price: "29",
    priceCurrency: "USD",
  },
};

export default async function Home() {
  const allPrompts = getAllPrompts();

  const categories = [...new Set(allPrompts.map((p) => p.category))].sort();

  const promptCount = allPrompts.length;
  const categoryCount = categories.length;

  const hasAccess = await canAccessPrompt(true);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section id="hero">
        <Hero />
      </section>

      {/* Social Proof */}
      <section id="social-proof">
        <SocialStrip
          promptCount={promptCount}
          categoryCount={categoryCount}
        />
      </section>

      {/* Gallery */}
      <section id="gallery" className="bg-[#0a0a0a] border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              Prompt Gallery
            </h2>
            <p className="mt-3 text-lg text-gray-400">
              Browse all prompts, filter by category
            </p>
          </div>
          <GalleryClient
            prompts={allPrompts}
            categories={categories}
            hasAccess={hasAccess}
            embedded
          />
        </div>
      </section>

      {/* Value Props */}
      <section id="value-props">
        <ValueProps />
      </section>

      {/* Pricing */}
      <PricingSection />

      {/* Final CTA */}
      <section id="final-cta">
        <FinalCTA />
      </section>
    </main>
  );
}
