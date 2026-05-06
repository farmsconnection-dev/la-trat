"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import PizzaDough3D from "./PizzaDough3D";

export default function DoughSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      ref={containerRef}
      className="cinematic-section"
    >
      {/* 3D Dough Background */}
      <div className="absolute inset-0 z-0">
        <PizzaDough3D />
      </div>

      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
      >
        <span className="inline-block text-primary text-[10px] md:text-[12px] font-black uppercase tracking-[0.6em] mb-12">
          The Secret of the Crust
        </span>
        
        <h2 className="text-5xl md:text-8xl font-serif leading-[0.9] tracking-[0.2rem] uppercase text-ivory mb-16">
          Slow-leavened
          <br />
          <span className="text-primary italic font-light font-editorial lowercase tracking-normal">
            for 48 hours.
          </span>
        </h2>

        <div className="w-16 h-px bg-primary/40 mx-auto mb-16" />

        <p className="text-ivory/60 text-base md:text-xl leading-relaxed font-sans max-w-2xl mx-auto italic tracking-wide">
          "At Trattoria Trium, we believe time is our most important ingredient. 
          Our dough rests for exactly 48 hours, allowing it to develop a complex flavor 
          and a light, airy structure that is as digestible as it is delicious."
        </p>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            { label: "Sicilian Wheat", value: "D.O.P" },
            { label: "Resting Time", value: "48h" },
            { label: "Hydration", value: "72%" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 * i }}
              className="space-y-2"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60">
                {stat.label}
              </p>
              <p className="text-4xl font-serif italic text-ivory">
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Decorative SVG lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
        <motion.path
          d="M 0 500 Q 500 300 1000 500"
          stroke="var(--color-primary)"
          strokeWidth="1"
          fill="none"
          style={{ pathLength: scrollYProgress }}
        />
        <motion.path
          d="M 0 600 Q 500 800 1000 600"
          stroke="var(--color-primary)"
          strokeWidth="1"
          fill="none"
          style={{ pathLength: scrollYProgress }}
        />
      </svg>
    </section>
  );
}
