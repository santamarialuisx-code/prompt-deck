"use client";

import { motion } from "motion/react";
import { BuyButton } from "@/components/checkout/BuyButton";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export function PricingCTA() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[var(--accent-purple)]/10 via-[var(--accent-orange)]/10 to-[var(--accent-cyan)]/10 p-12 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.5, ease: "easeOut" }
      }
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--accent-purple)_0%,_transparent_70%)] opacity-10" />

      <div className="relative z-10 space-y-6">
        <h2 className="text-3xl font-black text-white md:text-4xl">
          ¿Listo para transformar tu contenido?
        </h2>
        <p className="mx-auto max-w-lg text-lg text-gray-400">
          Únete a <span className="font-semibold text-white">2,400+ creadores</span> que ya están creando contenido increíble.
        </p>

        <div className="flex flex-col items-center gap-4">
          <BuyButton tier="pro-permanente" label="Get Lifetime Access — $29" />
          <p className="text-sm text-gray-500">
            One payment. Unlimited prompts. Forever.
          </p>
        </div>
      </div>
    </motion.div>
  );
}