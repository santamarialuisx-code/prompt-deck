"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import { PricingCardProps } from "./types";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export function PricingCard({ tier, selected, onSelect }: PricingCardProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className={`relative rounded-2xl border p-6 transition-all duration-300 ${
        selected
          ? "border-white/20 bg-white/10"
          : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
      } ${tier.highlighted ? "scale-105 shadow-2xl" : ""}`}
      style={{
        boxShadow: selected ? `0 0 30px ${tier.accentColor}20` : undefined,
      }}
      whileHover={
        prefersReducedMotion
          ? undefined
          : { y: -5, transition: { duration: 0.2 } }
      }
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Popular badge */}
      {tier.highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span
            className="rounded-full px-4 py-1 text-xs font-bold text-white"
            style={{ backgroundColor: tier.accentColor }}
          >
            Más popular
          </span>
        </div>
      )}

      {/* Tier name */}
      <h3
        className="text-lg font-bold"
        style={{ color: tier.accentColor }}
      >
        {tier.name}
      </h3>

      {/* Price */}
      <div className="mt-4">
        <span className="text-4xl font-black text-white">{tier.price}</span>
        {tier.period && (
          <span className="text-gray-400">{tier.period}</span>
        )}
      </div>

      {/* Features */}
      <ul className="mt-6 space-y-3">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check
              className="mt-0.5 size-4 shrink-0"
              style={{ color: tier.accentColor }}
            />
            <span className="text-sm text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        className={`mt-8 w-full rounded-lg py-3 font-bold text-white transition-all ${
          selected
            ? "opacity-100"
            : "opacity-90 hover:opacity-100"
        }`}
        style={{ backgroundColor: tier.accentColor }}
        onClick={() => onSelect(tier.id)}
      >
        {tier.ctaText}
      </button>
    </motion.div>
  );
}