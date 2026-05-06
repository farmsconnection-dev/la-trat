"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MenuItemProps {
  item: {
    name: string;
    desc: string;
    price: string;
    img: string;
    tag?: string | null;
  };
}

function MenuItem({ item }: MenuItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLLIElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Magnetic effect for the text
    const magX = (e.clientX - centerX) * 0.1;
    const magY = (e.clientY - centerY) * 0.1;
    setMagneticPos({ x: magX, y: magY });

    // Floating image position
    setMousePos({
      x: e.clientX - rect.left + 60,
      y: e.clientY - rect.top - 120,
    });
  };

  const resetMagnetic = () => {
    setIsHovered(false);
    setMagneticPos({ x: 0, y: 0 });
  };

  return (
    <li
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={resetMagnetic}
      onMouseMove={handleMouseMove}
      className="relative py-14 md:py-20 border-b border-white/5 group cursor-pointer overflow-visible"
    >
      <motion.div 
        animate={{ x: magneticPos.x, y: magneticPos.y }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="flex flex-col md:flex-row items-baseline justify-between gap-4 md:gap-10 relative z-10"
      >
        <div className="flex-1">
          <div className="flex items-center gap-6 mb-4">
            <h4 className="text-4xl md:text-6xl lg:text-8xl font-serif italic tracking-tighter transition-all duration-1000 group-hover:text-primary leading-none">
              {item.name}
            </h4>
            {item.tag && (
              <span className="px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[9px] font-black uppercase tracking-[0.3em] h-fit mt-4 backdrop-blur-sm">
                {item.tag}
              </span>
            )}
          </div>
          <p className="text-white/20 text-[11px] md:text-[13px] font-bold uppercase tracking-[0.4em] max-w-xl transition-all duration-1000 group-hover:text-white/50 group-hover:pl-4 italic">
            {item.desc}
          </p>
        </div>
        
        <div className="text-right">
          <span className="text-3xl md:text-6xl font-serif text-white/10 group-hover:text-primary transition-all duration-1000 font-light italic tracking-tight">
            {item.price}
          </span>
        </div>
      </motion.div>

      {/* Floating Image Preview */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -15, filter: "blur(20px)" }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotate: 0,
              filter: "blur(0px)",
              x: mousePos.x,
              y: mousePos.y
            }}
            exit={{ opacity: 0, scale: 0.8, rotate: 15, filter: "blur(10px)" }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 20,
              opacity: { duration: 0.4 }
            }}
            className="fixed md:absolute pointer-events-none z-[100] w-72 h-72 md:w-[450px] md:h-[450px] rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.9)] border border-white/20 bg-background-dark backdrop-blur-3xl inner-elevate"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-10" />
            <motion.img 
              src={item.img} 
              alt={item.name} 
              className="w-full h-full object-cover scale-125"
              animate={{ scale: isHovered ? 1.05 : 1.25 }}
              transition={{ duration: 3, ease: "easeOut" }}
            />
            {/* Macro detail indicator */}
            <div className="absolute bottom-10 left-10 right-10 z-20">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                className="h-px bg-primary/40 mb-4" 
              />
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/80 mb-1">
                Macro Detail
              </p>
              <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-white/40">
                8K Texture • Sicilian Craft
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export default function InteractiveMenu({ 
  items 
}: { 
  items: Array<{ name: string; desc: string; price: string; img: string; tag?: string | null }> 
}) {
  return (
    <ul className="flex flex-col w-full pb-20">
      {items.map((item) => (
        <MenuItem key={item.name} item={item} />
      ))}
    </ul>
  );
}
