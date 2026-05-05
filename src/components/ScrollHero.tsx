"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollHero({
  onReserve,
}: {
  onReserve: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Set dreamy playback speed as requested
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Content fade out on scroll
    tl.to(".hero-content", {
      y: -100,
      opacity: 0,
      ease: "power2.inOut",
    });

    // Video scale & darken effect on scroll
    tl.to(".hero-video", {
      scale: 1.1,
      filter: "brightness(0.4)",
      ease: "none",
    }, 0);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} id="home" className="relative w-full h-[120vh] overflow-hidden bg-[#0a0805]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background Video Layer */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="hero-video absolute inset-0 w-full h-full object-cover z-0 grayscale-[0.2]"
        >
          <source src="/video/background.mp4" type="video/mp4" />
        </video>

        {/* Cinematic Overlays */}
        {/* 1. Base Dark Overlay (0.3 as requested) */}
        <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none" />
        
        {/* 2. Custom Vignette for Depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)] z-15 pointer-events-none" />
        
        {/* 3. Bottom Transition to Page Content */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#0a0805] to-transparent z-20 pointer-events-none" />

        {/* Content Layer */}
        <div className="relative z-30 h-full flex flex-col items-center justify-center px-6 text-center">
          <div className="hero-content space-y-10 md:space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
            >
              <span className="inline-block px-8 py-3.5 rounded-full border border-white/10 text-[#c58a58] text-[10px] md:text-[12px] font-black uppercase tracking-[0.6em] backdrop-blur-xl bg-white/5 shadow-2xl">
                Authentic Sicilian Kitchen · Bruges Since 1993
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-[4rem] md:text-[9rem] xl:text-[11rem] font-serif text-white leading-[0.8] tracking-tighter drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                Fired in
                <br />
                <span
                  className="italic font-light text-[#c58a58]"
                  style={{ textShadow: "0 0 100px rgba(197,138,88,0.3)" }}
                >
                  Tradition.
                </span>
              </h1>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.3 }}
              className="text-white/50 text-[11px] md:text-[14px] max-w-lg mx-auto leading-relaxed uppercase tracking-[0.4em] font-sans italic"
            >
              Experience the soul of Sicily in every bite.
              <br />
              Wood-fired, family-guarded, time-honored.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-10 pt-8"
            >
              <button
                onClick={onReserve}
                className="group relative bg-[#c58a58] text-black px-16 py-7 rounded-full text-[10px] font-black uppercase tracking-[0.5em] overflow-hidden transition-all shadow-[0_20px_40px_rgba(197,138,88,0.2)] hover:shadow-[0_25px_50px_rgba(197,138,88,0.3)]"
              >
                <span className="relative z-10 transition-colors duration-500 group-hover:text-white">Reserve a Table</span>
                <div className="absolute inset-0 bg-[#0a0805] translate-y-full transition-transform duration-500 ease-[0.76, 0, 0.24, 1] group-hover:translate-y-0" />
              </button>
              
              <a
                href="#signature-pizzas"
                className="group flex items-center gap-4 text-white/40 hover:text-[#c58a58] text-[9px] font-black uppercase tracking-[0.5em] transition-all duration-500"
              >
                <span className="border-b border-white/10 group-hover:border-[#c58a58]/60 pb-1.5 transition-colors">Our Signature Pizzas</span>
                <span className="text-lg animate-bounce-slow">↓</span>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 2.5, duration: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-5 z-40"
        >
          <span className="text-white text-[9px] uppercase tracking-[0.6em] font-black opacity-60">Discover</span>
          <div className="relative w-px h-24 overflow-hidden">
            <div className="absolute inset-0 bg-white/20" />
            <motion.div 
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-b from-transparent via-[#c58a58] to-transparent h-1/2"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

