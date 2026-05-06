"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

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
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // 0.7x Dreamy speed & start at 1s to avoid "dough glitch"
    video.playbackRate = 0.7;
    video.currentTime = 1;

    const handleTimeUpdate = () => {
      // Loop back to 1s instead of 0 to maintain the "crop"
      if (video.currentTime >= video.duration - 0.1) {
        video.currentTime = 1;
        video.play();
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    tl.to(".hero-content", {
      y: -250, // Increased movement for deep parallax effect
      opacity: 0,
      ease: "power2.inOut",
    });

    tl.to(".hero-video", {
      scale: 1.15, 
      y: 80, // Subtle counter-movement to feel deeper
      filter: "brightness(0.4) contrast(1.1) blur(6px)",
      ease: "none",
    }, 0);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [videoLoaded]);

  return (
    <div ref={containerRef} id="home" className="relative w-full h-[100vh] scroll-snap-align-start">
      {/* Background Video Layer - FIXED GLOBAL */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setVideoLoaded(true)}
        className="hero-video fixed top-0 left-0 w-full h-full object-cover z-[-1] scale-110"
        style={{ filter: "brightness(1.2) contrast(1.1) saturate(1.1)" }}
      >
        <source src="/video/Pizza_ingredients_falling.mp4" type="video/mp4" />
      </video>

      {/* Content Layer */}
      <div className="relative z-30 h-full flex flex-col items-center justify-center px-6 text-center">
        <div className="hero-content space-y-10 md:space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            <span className="inline-block px-8 py-3.5 rounded-full border border-white/5 text-primary text-[10px] md:text-[12px] font-black uppercase tracking-[0.6em] backdrop-blur-xl bg-white/[0.03] inner-elevate" style={{ textShadow: "0 0 20px rgba(0,0,0,0.8)" }}>
              The Art of Sicilian Fire
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-[4rem] md:text-[8rem] xl:text-[10rem] font-serif leading-[0.8] tracking-[0.25rem] uppercase text-gold-noir drop-shadow-[0_15px_45px_rgba(0,0,0,1)]">
              Fired in
              <br />
              <span
                className="italic font-light font-editorial lowercase tracking-normal text-noir-silver"
                style={{ textShadow: "0 0 80px rgba(229,228,226,0.3), 0 10px 40px rgba(0,0,0,0.9)" }}
              >
                Tradition.
              </span>
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.3 }}
            className="text-noir-silver/60 text-[11px] md:text-[14px] max-w-lg mx-auto leading-relaxed uppercase tracking-[0.5em] font-sans italic"
            style={{ textShadow: "0 4px 15px rgba(0,0,0,0.9)" }}
          >
            Where ingredients fall into perfection.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-10 pt-8"
          >
            <button
              onClick={onReserve}
              className="group relative btn-amber-glow px-16 py-7 rounded-full text-[10px] font-black uppercase tracking-[0.5em] overflow-hidden shadow-2xl"
            >
              <span className="relative z-10">Reserve Table</span>
            </button>
            
            <a
              href="#signature-pizzas"
              className="group flex flex-col items-center gap-4 text-ivory/40 hover:text-primary transition-all duration-500"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.6em] group-hover:tracking-[0.8em] transition-all">Ontdek ons Menu</span>
              <div className="relative w-px h-10 overflow-hidden">
                <div className="absolute inset-0 bg-ivory/10" />
                <motion.div 
                  animate={{ y: ["-100%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-primary h-1/2"
                />
              </div>
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
        <div className="relative w-px h-24 overflow-hidden">
          <div className="absolute inset-0 bg-ivory/20" />
          <motion.div 
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-b from-transparent via-primary to-transparent h-1/2"
          />
        </div>
      </motion.div>
    </div>
  );
}

