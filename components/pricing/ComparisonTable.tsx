"use client";

import { motion } from "motion/react";
import { Check, X } from "lucide-react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type ComparisonFeature = {
  name: string;
  free: boolean | string;
  proPermanente: boolean | string;
  proSuscripcion: boolean | string;
};

const comparisonFeatures: ComparisonFeature[] = [
  {
    name: "Curated prompts",
    free: "5-10",
    proPermanente: "50+",
    proSuscripcion: "150+",
  },
  {
    name: "Future updates",
    free: false,
    proPermanente: "Lifetime",
    proSuscripcion: "All included",
  },
  {
    name: "Premium categories",
    free: false,
    proPermanente: true,
    proSuscripcion: true,
  },
  {
    name: "Priority support",
    free: false,
    proPermanente: true,
    proSuscripcion: true,
  },
  {
    name: "30-day guarantee",
    free: false,
    proPermanente: true,
    proSuscripcion: true,
  },
];

function ComparisonCell({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="mx-auto size-5 text-emerald-400" />
    ) : (
      <X className="mx-auto size-5 text-gray-600" />
    );
  }
  return <span className="text-sm text-gray-300">{value}</span>;
}

export function ComparisonTable() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className="w-full overflow-x-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.5, ease: "easeOut" }
      }
    >
      <table className="w-full min-w-[640px] border-collapse">
        <thead>
          <tr>
            <th className="pb-4 text-left text-sm font-semibold text-gray-400">
              Features
            </th>
            <th className="pb-4 text-center text-sm font-semibold text-[var(--accent-cyan)]">
              Free
            </th>
            <th className="pb-4 text-center text-sm font-semibold text-[var(--accent-purple)]">
              Pro Permanente
            </th>
            <th className="pb-4 text-center text-sm font-semibold text-[var(--accent-orange)]">
              Pro Suscripción
            </th>
          </tr>
        </thead>
        <tbody>
          {comparisonFeatures.map((feature, index) => (
            <tr
              key={feature.name}
              className={`border-t border-white/5 ${
                index % 2 === 0 ? "bg-white/[0.02]" : ""
              }`}
            >
              <td className="py-4 pr-4 text-sm text-gray-300">
                {feature.name}
              </td>
              <td className="py-4 text-center">
                <ComparisonCell value={feature.free} />
              </td>
              <td className="py-4 text-center">
                <ComparisonCell value={feature.proPermanente} />
              </td>
              <td className="py-4 text-center">
                <ComparisonCell value={feature.proSuscripcion} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}