"use client";

import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

// Mix of locally downloaded Facebook photos and working TripAdvisor CDN images
const SOCIAL_IMAGES = [
  // Local Facebook downloads
  "/images/social/2.jpg",   // Team in de keuken
  "/images/social/3.jpg",   // Pizza met rucola
  "/images/social/4.jpg",   // Chocolademousse dessert
  "/images/social/5.jpg",   // Dessert op houten plaat
  "/images/social/6.jpg",   // Koekjes maken
  // TripAdvisor CDN (reliable, publicly accessible)
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/06/74/c6/caption.jpg?w=600&q=80",
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/80/0f/f2/caption.jpg?w=600&q=80",
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/d2/a7/4b/caption.jpg?w=600&q=80",
];

export default function SocialShowcase() {
  return (
    <section className="bg-[#0a0a0a] py-20 relative overflow-hidden border-t border-white/5 z-20">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-[0.75rem] text-[#888] uppercase tracking-[0.35rem] font-serif block mb-3">From Our Kitchen</span>
          <h3 className="text-3xl md:text-4xl font-editorial italic text-[#F5F5DC]">Momenti Autentici</h3>
        </div>
        <a 
          href="https://www.facebook.com/trattoriatrium" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-[#F5F5DC]/50 hover:text-[#C5A059] transition-all duration-300 group border border-white/10 hover:border-[#C5A059]/50 px-6 py-3 rounded-full"
        >
          <Instagram size={14} className="group-hover:scale-110 transition-transform" />
          <span>@trattoriatrium</span>
        </a>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden flex">
        {/* Left Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        
        <motion.div 
          className="flex gap-4 px-2"
          animate={{ x: [0, -(320 * SOCIAL_IMAGES.length)] }}
          transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
        >
          {/* Duplicate for seamless loop */}
          {[...SOCIAL_IMAGES, ...SOCIAL_IMAGES].map((src, i) => (
            <div 
              key={i} 
              className="relative w-60 md:w-72 aspect-square flex-shrink-0 rounded-lg overflow-hidden group cursor-pointer border border-white/5"
            >
              <img 
                src={src} 
                alt={`Trattoria Trium - Moment ${(i % SOCIAL_IMAGES.length) + 1}`}
                loading="lazy"
                className="w-full h-full object-cover filter grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-500" />
            </div>
          ))}
        </motion.div>

        {/* Right Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
