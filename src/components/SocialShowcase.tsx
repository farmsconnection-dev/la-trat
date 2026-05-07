"use client";

import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

// The images we extracted from Trattoria Trium's Facebook
const SOCIAL_IMAGES = [
  "https://scontent.fbru2-1.fna.fbcdn.net/v/t39.30808-6/685890265_1592084389590081_3078599469109110214_n.jpg?stp=dst-jpg_s960x960_tt6",
  "https://scontent.fbru5-1.fna.fbcdn.net/v/t39.30808-6/684391877_1591087063023147_6135756113504949551_n.jpg?stp=dst-jpg_s960x960_tt6",
  "https://scontent.fbru5-1.fna.fbcdn.net/v/t39.30808-6/678760528_1583551287110058_2668162561863960467_n.jpg?stp=dst-jpg_s960x960_tt6",
  "https://scontent.fbru5-1.fna.fbcdn.net/v/t39.30808-1/468538620_1130678882397303_459351057421577983_n.jpg?stp=dst-jpg_s960x960_tt6",
  "https://scontent.fbru2-1.fna.fbcdn.net/v/t39.30808-6/680686176_1583551257110061_8440380722165330502_n.jpg?stp=dst-jpg_s960x960_tt6",
  "https://scontent.fbru2-1.fna.fbcdn.net/v/t39.30808-6/684919082_1591087083023145_3306034822732992775_n.jpg?stp=dst-jpg_s960x960_tt6",
  "https://scontent.fbru2-1.fna.fbcdn.net/v/t39.30808-6/685975801_1592084392923414_1908620052264736310_n.jpg?stp=dst-jpg_s960x960_tt6",
  "https://scontent.fbru2-1.fna.fbcdn.net/v/t39.30808-6/491834512_1250940723704451_6644554787141929762_n.jpg?stp=dst-jpg_s960x960_tt6"
];

export default function SocialShowcase() {
  return (
    <section className="bg-[#0a0a0a] py-20 relative overflow-hidden border-t border-white/5 z-20">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-3xl md:text-4xl font-serif text-[#C5A059] uppercase tracking-[0.2em] mb-2">Our Culinary Moments</h3>
          <p className="font-editorial text-ivory/60 italic text-xl">Join us on social media</p>
        </div>
        <a 
          href="https://www.facebook.com/trattoriatrium" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-ivory/50 hover:text-[#C5A059] transition-all duration-300 group border border-white/10 hover:border-[#C5A059]/50 px-6 py-3 rounded-full"
        >
          <Instagram size={14} className="group-hover:scale-110 transition-transform" />
          <span>@trattoriatrium</span>
        </a>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden flex">
        {/* Left Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        
        <motion.div 
          className="flex gap-6 px-3"
          animate={{ x: [0, -1920] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        >
          {[...SOCIAL_IMAGES, ...SOCIAL_IMAGES].map((src, i) => (
            <div 
              key={i} 
              className="relative w-64 md:w-80 aspect-square flex-shrink-0 rounded-xl overflow-hidden group cursor-pointer border border-white/5"
            >
              <img 
                src={src} 
                alt="Trattoria Trium Moment" 
                className="w-full h-full object-cover filter grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
            </div>
          ))}
        </motion.div>

        {/* Right Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
