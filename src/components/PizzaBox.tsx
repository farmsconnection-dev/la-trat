"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Zap } from "lucide-react";

interface PizzaBoxProps {
    name: string;
    price: string;
    rating: number;
    calories: string;
    ingredients: string[];
    imageUrl: string;

}

export default function PizzaBox({
    name,
    price,
    rating,
    calories,
    ingredients,
    imageUrl,

}: PizzaBoxProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full max-sm mx-auto mb-12 cursor-pointer group" onClick={() => setIsOpen(!isOpen)}>
            <div className="relative h-72 perspective-1000 mb-6">
                {/* Box Lid (Animated) */}
                <motion.div
                    className="absolute inset-0 z-20 origin-top preserve-3d"
                    animate={{ rotateX: isOpen ? -115 : 0 }}
                    transition={{ type: "spring", stiffness: 80, damping: 20 }}
                    style={{ zIndex: isOpen ? 10 : 30 }}
                >
                    {/* Top of Lid - Premium Kraft Paper */}
                    <div className="absolute inset-0 flex items-center justify-center p-8 border border-[#d6c9bc] shadow-2xl bg-gradient-to-br from-[#f8f3ed] to-[#e8dccf] rounded-[2.5rem] backface-hidden overflow-hidden">
                        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cardboard-flat.png')]" />
                        <div className="text-center relative z-10">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/40 flex items-center justify-center shadow-lg border border-white/20">
                                <Zap className="w-10 h-10 text-primary" />
                            </div>
                            <h3 className="text-2xl font-serif tracking-tight text-secondary leading-tight">Trattoria <br /><span className="italic">Trium</span></h3>
                            <div className="w-8 h-px bg-secondary/20 mx-auto my-4" />
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary/40">Artigianale · Bruges</p>
                        </div>
                    </div>

                    {/* Inside of Lid (Backface) */}
                    <div className="absolute inset-0 flex items-center justify-center bg-[#dbd0c5] rounded-[2.5rem] [transform:rotateX(180deg)] backface-hidden border border-[#c9bdb1]">
                        <div className="text-center opacity-30">
                            <p className="text-xs font-serif italic text-secondary">La Vera Pizza Siciliana</p>
                        </div>
                    </div>
                </motion.div>

                {/* Box Bottom & Pizza Content */}
                <div className="absolute inset-0 z-10 border border-[#e8dccf] shadow-inner bg-[#fcf9f6] rounded-[2.5rem] flex items-center justify-center p-6">
                    <motion.div
                        initial={false}
                        animate={{ scale: isOpen ? 1 : 0.85, opacity: isOpen ? 1 : 0.3 }}
                        transition={{ duration: 0.6, ease: [0.21, 1, 0.36, 1] }}
                        className="w-full h-full flex items-center justify-center"
                    >
                        <img
                            src={imageUrl}
                            alt={name}
                            className="w-44 h-44 object-cover object-center rounded-full shadow-2xl border-4 border-white"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Product Information (Slide-in) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0, scale: 0.95 }}
                        animate={{ height: "auto", opacity: 1, scale: 1 }}
                        exit={{ height: 0, opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5, ease: [0.21, 1, 0.36, 1] }}
                        className="px-2"
                    >
                        <div className="flex justify-between items-end mb-4">
                            <div>
                                <h2 className="text-4xl font-serif text-secondary mb-2">{name}</h2>
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center text-primary">
                                        <Star className="w-4 h-4 fill-current" />
                                        <span className="ml-2 text-sm font-black text-secondary">{rating}</span>
                                    </div>
                                    <div className="text-[11px] font-black uppercase tracking-widest text-secondary/40">{calories} kcal</div>
                                </div>
                            </div>
                            <div className="text-4xl font-serif text-primary">{price}</div>
                        </div>

                        <div className="mb-8">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/40 mb-3">Ingredients</p>
                            <div className="flex flex-wrap gap-2">
                                {ingredients.map((ing) => (
                                    <span key={ing} className="px-4 py-1.5 bg-secondary/5 text-[11px] rounded-full text-secondary font-bold border border-secondary/5">
                                        {ing}
                                    </span>
                                ))}
                            </div>
                        </div>


                    </motion.div>
                )}
            </AnimatePresence>

            {!isOpen && (
                <div className="text-center group-hover:scale-105 transition-transform">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary/40 mb-1">Click to reveal</p>
                    <p className="text-lg font-serif italic text-secondary">{name}</p>
                </div>
            )}
        </div>
    );
}
