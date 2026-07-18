"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import { PricingCardProps } from "./types";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export function PricingCard({ tier, selected, onSelect }: PricingCardProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className={`relative flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 ${
        selected
          ? "border-white/20 bg-white/10"
          : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
      } ${tier.highlighted ? "shadow-2xl" : ""}`}
      style={{
        boxShadow: selected
          ? `0 0 30px ${tier.accentColor}20, 0 8px 32px rgba(0,0,0,0.3)`
          : "0 4px 20px rgba(0,0,0,0.2)",
        willChange: prefersReducedMotion ? undefined : "transform",
      }}
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              scale: 1.02,
              y: -4,
              boxShadow: `0 0 40px ${tier.accentColor}30, 0 12px 40px rgba(0,0,0,0.4)`,
              transition: { duration: 0.3, ease: "easeOut" },
            }
      }
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Most Popular badge */}
      {tier.highlighted && (
        <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
          <span
            className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold text-white shadow-lg"
            style={{
              backgroundColor: tier.accentColor,
              boxShadow: `0 4px 14px ${tier.accentColor}60`,
            }}
          >
            <svg
              className="size-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Most Popular
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
          <span className="ml-1 text-gray-400">{tier.period}</span>
        )}
      </div>

      {/* Accent line */}
      <div
        className="mt-4 h-0.5 w-12 rounded-full"
        style={{ backgroundColor: tier.accentColor }}
      />

      {/* Features */}
      <ul className="mt-6 flex-1 space-y-3">
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
