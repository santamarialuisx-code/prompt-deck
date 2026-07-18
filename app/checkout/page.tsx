"use client";

import { useState } from "react";
import {
  AnimatedBackground,
  ComparisonTable,
  FeatureCarousel,
  PricingCards,
  PricingCTA,
  PricingHero,
  SocialProof,
} from "@/components/pricing";
import Link from "next/link";

export default function CheckoutPage() {
  const [selectedTier, setSelectedTier] = useState<string>("pro-permanente");

  return (
    <div className="relative min-h-screen bg-[#0a0a0a]">
      <AnimatedBackground />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 space-y-24">
        {/* Hero Section */}
        <PricingHero />

        {/* Pricing Cards */}
        <PricingCards
          selectedTier={selectedTier}
          onSelectTier={setSelectedTier}
        />

        {/* Feature Carousel */}
        <FeatureCarousel />

        {/* Comparison Table */}
        <section className="space-y-8">
          <h2 className="text-center text-2xl font-bold text-white">
            Compare Plans
          </h2>
          <ComparisonTable />
        </section>

        {/* Social Proof */}
        <SocialProof />

        {/* Final CTA */}
        <PricingCTA />

        {/* Pago Móvil Link */}
        <div className="text-center">
          <Link
            href="/checkout/pago-movil"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Prefer Pago Móvil? →
          </Link>
        </div>
      </div>
    </div>
  );
}