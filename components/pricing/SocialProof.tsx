"use client";

import { motion } from "motion/react";
import { Shield, CreditCard, Zap } from "lucide-react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { useEffect, useState } from "react";

type Stat = {
  value: number;
  suffix: string;
  label: string;
};

const stats: Stat[] = [
  { value: 2400, suffix: "+", label: "creators" },
  { value: 150, suffix: "+", label: "prompts" },
  { value: 4.9, suffix: "", label: "rating" },
];

type Testimonial = {
  avatar: string;
  name: string;
  role: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    avatar: "AS",
    name: "Ana S.",
    role: "Content Creator",
    quote:
      "The prompts have completely transformed my workflow. I save hours every week.",
  },
  {
    avatar: "MR",
    name: "Marco R.",
    role: "Marketing Manager",
    quote:
      "Best investment for my team. The quality of prompts is unmatched.",
  },
  {
    avatar: "CL",
    name: "Carlos L.",
    role: "Freelancer",
    quote:
      "Lifetime access was a no-brainer. Use it daily for client work.",
  },
];

function AnimatedCounter({
  target,
  suffix,
  prefersReducedMotion,
}: {
  target: number;
  suffix: string;
  prefersReducedMotion: boolean;
}) {
  const [count, setCount] = useState(prefersReducedMotion ? target : 0);

  useEffect(() => {
    if (prefersReducedMotion) {
      // Use requestAnimationFrame to avoid synchronous setState in effect
      const id = requestAnimationFrame(() => setCount(target));
      return () => cancelAnimationFrame(id);
    }

    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, prefersReducedMotion]);

  return (
    <span>
      {target >= 1000
        ? `${(count / 1000).toFixed(count >= target ? 1 : 0)}k`
        : count}
      {suffix}
    </span>
  );
}

export function SocialProof() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className="space-y-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.5, ease: "easeOut" }
      }
    >
      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-8 rounded-2xl border border-white/10 bg-white/5 p-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-3xl font-black text-white">
              <AnimatedCounter
                target={stat.value}
                suffix={stat.suffix}
                prefersReducedMotion={prefersReducedMotion}
              />
            </div>
            <div className="mt-1 text-sm text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.name}
            className="rounded-xl border border-white/10 bg-white/5 p-6"
          >
            <div className="mb-4 flex items-center gap-3">
              <div
                className="flex size-10 items-center justify-center rounded-full bg-[var(--accent-purple)]/20 text-sm font-bold text-[var(--accent-purple)]"
              >
                {testimonial.avatar}
              </div>
              <div>
                <div className="text-sm font-semibold text-white">
                  {testimonial.name}
                </div>
                <div className="text-xs text-gray-400">{testimonial.role}</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-300">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
          </div>
        ))}
      </div>

      {/* Trust Badges */}
      <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <Shield className="size-4 text-emerald-400" />
          <span>30-Day Guarantee</span>
        </div>
        <div className="flex items-center gap-2">
          <CreditCard className="size-4 text-emerald-400" />
          <span>Secure Payment</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="size-4 text-emerald-400" />
          <span>Instant Access</span>
        </div>
      </div>
    </motion.div>
  );
}