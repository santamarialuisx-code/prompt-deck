"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { PricingCard } from "./PricingCard";
import { BuyButton } from "@/components/checkout/BuyButton";
import { pricingTiers } from "./pricing-data";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function PricingCards() {
  const [selectedTier, setSelectedTier] = useState<string>("pro-permanente");
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section className="relative px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={prefersReducedMotion ? undefined : containerVariants}
          initial={prefersReducedMotion ? "visible" : "hidden"}
          animate="visible"
        >
          {pricingTiers.map((tier) => (
            <motion.div
              key={tier.id}
              variants={prefersReducedMotion ? undefined : itemVariants}
              className="flex flex-col"
            >
              <PricingCard
                tier={tier}
                selected={selectedTier === tier.id}
                onSelect={setSelectedTier}
              />
              <div className="mt-4">
                <BuyButton
                  tier={tier.id}
                  label={tier.ctaText}
                  variant={tier.id === "free" ? "outline" : "default"}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
