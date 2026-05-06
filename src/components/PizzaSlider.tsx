"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Pizza {
  id: number;
  name: string;
  description: string;
  price: string;
  tag: string;
  img: string;
}

const PIZZAS: Pizza[] = [
  {
    id: 1,
    name: "Sicilian Heritage",
    description: "Our signature slow-proofed dough topped with fresh burrata, roasted Sicilian pistachios, and smoked salmon slices.",
    price: "€27.00",
    tag: "Chef's Pick",
    img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/33/23/80/a0/caption.jpg?w=1200&h=-1&s=1"
  },
  {
    id: 2,
    name: "Norma Redefined",
    description: "A tribute to the island's classics: slow-simmered pomodoro, glistening eggplant, salted ricotta, and fresh basil.",
    price: "€21.00",
    tag: "Vegetarian",
    img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/d2/a7/48/caption.jpg?w=1200&h=-1&s=1"
  },
  {
    id: 3,
    name: "Vongole Verace",
    description: "Where the sea meets the fire: fresh clams, cherry tomatoes, white wine reduction, garlic, and parsley on a crisp base.",
    price: "€28.00",
    tag: "Premium",
    img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/d2/a7/4b/caption.jpg?w=1200&h=-1&s=1"
  }
];

export default function PizzaSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % PIZZAS.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + PIZZAS.length) % PIZZAS.length);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto py-20 px-6 overflow-visible">
      <div className="relative flex items-center justify-center h-[500px] md:h-[650px] overflow-visible">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-0 md:left-4 z-50 p-4 rounded-full border border-white/10 bg-black/20 backdrop-blur-xl text-white hover:bg-primary hover:text-black transition-all duration-500 shadow-2xl group"
        >
          <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 md:right-4 z-50 p-4 rounded-full border border-white/10 bg-black/20 backdrop-blur-xl text-white hover:bg-primary hover:text-black transition-all duration-500 shadow-2xl group"
        >
          <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>

        {/* The Slider Container with 3D Depth */}
        <div className="relative w-full h-full flex items-center justify-center overflow-visible pizza-box-scene">
          <AnimatePresence initial={false} custom={direction}>
            {PIZZAS.map((pizza, index) => {
              const isCenter = index === currentIndex;
              const isPrev = index === (currentIndex - 1 + PIZZAS.length) % PIZZAS.length;
              const isNext = index === (currentIndex + 1) % PIZZAS.length;

              if (!isCenter && !isPrev && !isNext) return null;

              let x = "0%";
              if (isPrev) x = "-60%";
              if (isNext) x = "60%";

              return (
                <motion.div
                  key={pizza.id}
                  custom={direction}
                  initial={{ 
                    opacity: 0, 
                    scale: 0.5, 
                    x: direction > 0 ? "100%" : "-100%",
                    filter: "blur(10px) grayscale(100%)"
                  }}
                  animate={{ 
                    opacity: isCenter ? 1 : 0.4, 
                    scale: isCenter ? 1.35 : 0.85, 
                    x: x,
                    rotateY: isCenter ? 0 : (isPrev ? 35 : -35),
                    rotateZ: isCenter ? 5 : 0,
                    filter: isCenter 
                      ? "blur(0px) drop-shadow(0 30px 60px rgba(0,0,0,0.9))" 
                      : "blur(4px) grayscale(100%) brightness(0.5)",
                    zIndex: isCenter ? 30 : 10,
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.4, 
                    x: direction > 0 ? "-120%" : "120%",
                    filter: "blur(20px) grayscale(100%)"
                  }}
                  transition={{ 
                    duration: 1.2, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className="absolute w-[300px] md:w-[450px] h-full flex flex-col items-center justify-center pointer-events-none md:pointer-events-auto overflow-visible"
                >
                  <div className="relative w-full aspect-square pointer-events-auto overflow-visible">
                    {/* Floating Pizza with Mask & Drop Shadow */}
                    <motion.div 
                      className="w-full h-full relative"
                      animate={{
                        y: isCenter ? [0, -20, 0] : 0,
                        rotateZ: isCenter ? [5, 7, 5] : 0
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <div className={`absolute inset-0 rounded-full transition-all duration-1000 ${isCenter ? 'opacity-30 blur-[80px] bg-primary/20' : 'opacity-0'}`} />
                      <img
                        src={pizza.img}
                        alt={pizza.name}
                        className="w-full h-full object-contain relative z-10"
                      />
                    </motion.div>

                    {/* Shadow underneath */}
                    {isCenter && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 0.2, scale: 1 }}
                        className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-2/3 h-10 bg-black/80 blur-3xl rounded-full pointer-events-none"
                      />
                    )}
                    
                    {/* Pizza Info */}
                    <div className="absolute inset-x-0 -bottom-32 flex flex-col items-center text-center">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: isCenter ? 1 : 0, y: isCenter ? 0 : 10 }}
                        transition={{ duration: 0.4 }}
                      >
                        <h4 className="text-2xl md:text-3xl font-serif text-ivory tracking-[0.3rem] uppercase mb-2">
                          {pizza.name}
                        </h4>
                        <p className="text-noir-silver/40 text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] mb-4 max-w-[280px]">
                          {pizza.description}
                        </p>
                        <span className="text-2xl font-serif text-primary tracking-widest">{pizza.price.replace('€', '')}</span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Pagination dots */}
      <div className="flex justify-center gap-3 mt-12">
        {PIZZAS.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > currentIndex ? 1 : -1);
              setCurrentIndex(i);
            }}
            className={`h-1 transition-all duration-500 rounded-full ${i === currentIndex ? "w-12 bg-primary" : "w-3 bg-white/10"}`}
          />
        ))}
      </div>
    </div>
  );
}
