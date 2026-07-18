"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export function AnimatedBackground() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const draw = () => {
      time += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Aurora mesh gradient effect
      const gradient1 = ctx.createRadialGradient(
        canvas.width * 0.2 + Math.sin(time) * 100,
        canvas.height * 0.3 + Math.cos(time * 0.7) * 50,
        0,
        canvas.width * 0.2,
        canvas.height * 0.3,
        canvas.width * 0.4
      );
      gradient1.addColorStop(0, "rgba(139, 92, 246, 0.15)");
      gradient1.addColorStop(1, "transparent");

      const gradient2 = ctx.createRadialGradient(
        canvas.width * 0.8 + Math.cos(time * 0.8) * 80,
        canvas.height * 0.2 + Math.sin(time * 1.2) * 60,
        0,
        canvas.width * 0.8,
        canvas.height * 0.2,
        canvas.width * 0.35
      );
      gradient2.addColorStop(0, "rgba(34, 211, 238, 0.12)");
      gradient2.addColorStop(1, "transparent");

      const gradient3 = ctx.createRadialGradient(
        canvas.width * 0.5 + Math.sin(time * 0.6) * 120,
        canvas.height * 0.7 + Math.cos(time * 0.9) * 40,
        0,
        canvas.width * 0.5,
        canvas.height * 0.7,
        canvas.width * 0.45
      );
      gradient3.addColorStop(0, "rgba(249, 115, 22, 0.1)");
      gradient3.addColorStop(1, "transparent");

      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = gradient3;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-aurora opacity-50" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ willChange: "transform" }}
      />
      {/* Overlay aurora gradient for depth */}
      <div className="absolute inset-0 bg-aurora opacity-30 mix-blend-overlay" />
    </div>
  );
}
