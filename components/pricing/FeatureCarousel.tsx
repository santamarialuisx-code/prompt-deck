"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import {
  BookOpen,
  RefreshCw,
  Copy,
  FolderTree,
  Headphones,
  ShieldCheck,
  Zap,
  Star,
} from "lucide-react";

type FeatureSlide = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
};

const features: FeatureSlide[] = [
  {
    icon: BookOpen,
    title: "150+ Prompts Profesionales",
    description:
      "Colección curada de prompts para maximizar tu productividad diaria.",
  },
  {
    icon: RefreshCw,
    title: "Actualizaciones Gratuitas",
    description:
      "Nuevos prompts y mejoras cada semana sin costo adicional.",
  },
  {
    icon: Copy,
    title: "Copiar con Un Click",
    description:
      "Copia cualquier prompt al portapapeles con un solo clic.",
  },
  {
    icon: FolderTree,
    title: "Organizado por Categorías",
    description:
      "Encuentra lo que necesitas al instante con nuestra taxonomía.",
  },
  {
    icon: Headphones,
    title: "Soporte 24/7",
    description:
      "Equipo disponible para ayudarte cuando lo necesites.",
  },
  {
    icon: ShieldCheck,
    title: "Garantía de 30 Días",
    description:
      "Si no estás satisfecho, te devolvemos tu dinero sin preguntas.",
  },
  {
    icon: Zap,
    title: "API Access (Coming Soon)",
    description:
      "Integra nuestros prompts directamente en tus flujos de trabajo.",
  },
  {
    icon: Star,
    title: "Comunidad Exclusiva",
    description:
      "Acceso a un grupo privado de creadores y profesionales.",
  },
];

export function FeatureCarousel() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
    },
    [
      AutoScroll({
        playOnInit: !prefersReducedMotion,
        speed: 0.5,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
        stopOnFocusIn: true,
      }),
    ]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const initializedRef = useRef(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    // Initialize scroll snaps only once
    if (!initializedRef.current) {
      initializedRef.current = true;
      setScrollSnaps(emblaApi.scrollSnapList());
    }

    // Subscribe to selection changes — onSelect will update selectedIndex
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="relative px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-white">
            Todo lo que necesitas
          </h2>
          <p className="mt-3 text-gray-400">
            Herramientas diseñadas para profesionales que valoran su tiempo
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative" ref={emblaRef}>
          <div className="flex gap-4 overflow-hidden">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                  }}
                >
                  <div className="group h-full rounded-xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/10">
                    <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-white/10">
                      <Icon className="size-6 text-white" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Navigation dots */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            onClick={scrollPrev}
            className="rounded-full border border-white/20 p-2 text-white transition-colors hover:bg-white/10"
            aria-label="Previous slide"
          >
            <svg
              className="size-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="flex gap-1.5">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`size-2 rounded-full transition-all ${
                  index === selectedIndex
                    ? "w-6 bg-white"
                    : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={scrollNext}
            className="rounded-full border border-white/20 p-2 text-white transition-colors hover:bg-white/10"
            aria-label="Next slide"
          >
            <svg
              className="size-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
