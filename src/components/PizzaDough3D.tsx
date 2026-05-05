"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function PizzaDough3D() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  
  // Transform dough as we scroll
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.6, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.2], [0, 20]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <motion.div 
      style={{ scale, opacity, filter: `blur(${blur}px)` }}
      className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none overflow-hidden"
    >
      {/* 
          LIQUID GLASS DOUGH 
          Uses a high-end SVG blob with glassmorphism 
      */}
      <motion.div
        animate={{
          x: mousePos.x,
          y: mousePos.y,
          rotate: [0, 5, -5, 0],
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="relative w-[500px] h-[500px] md:w-[800px] md:h-[800px]"
      >
        <div className="absolute inset-0 bg-white/20 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-3xl animate-pulse" />
        <div 
          className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent backdrop-blur-2xl border border-white/20 shadow-2xl"
          style={{
            borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
            boxShadow: "inset 0 0 100px rgba(255,255,255,0.2), 0 50px 100px rgba(0,0,0,0.3)"
          }}
        />
        
        {/* Highlight for depth */}
        <div 
          className="absolute top-[10%] left-[20%] w-[20%] h-[10%] bg-white/40 blur-xl rounded-full rotate-[-45deg]"
        />
      </motion.div>

      {/* SVG filter for the "gooey" liquid look */}
      <svg className="hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </motion.div>
  );
}
