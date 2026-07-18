"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export function PricingHero() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="relative py-16 text-center">
      {/* Aurora background */}
      <div
        className={`absolute inset-0 bg-aurora opacity-80 ${
          prefersReducedMotion ? "" : "animate-pulse"
        }`}
      />

      {/* Content */}
      <div className="relative z-10">
        <motion.h1
          className="text-4xl font-black tracking-tight text-white sm:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Elige tu plan. Cancela cuando quieras.
        </motion.h1>

        <motion.p
          className="mx-auto mt-4 max-w-2xl text-lg text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          Únete a más de 2,000 creadores que ya transforman su productividad
          con prompts profesionales.
        </motion.p>

        {/* Social proof stats */}
        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-white">2,000+</div>
            <div className="text-sm text-gray-400">Creadores activos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">150+</div>
            <div className="text-sm text-gray-400">Prompts profesionales</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">4.9★</div>
            <div className="text-sm text-gray-400">Rating promedio</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}