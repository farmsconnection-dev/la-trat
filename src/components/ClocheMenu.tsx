"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PASTA_MENU = [
    {
        id: 1, name: "Tagliatelle al Tartufo", price: "€26",
        description: "Hand-rolled egg pasta with fresh black truffle, malga butter, and aged Parmigiano Reggiano.",
        img: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600&h=600&fit=crop",
        tag: "Our Signature",
    },
    {
        id: 2, name: "Vongole Veraci", price: "€29",
        description: "Artisanal spaghetti with fresh clams, cold-pressed Sicilian olive oil, and parsley essence.",
        img: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&h=600&fit=crop",
        tag: "Daily Sea Catch",
    },
    {
        id: 3, name: "Cacio e Pepe Reale", price: "€22",
        description: "Pecorino Romano DOP and toasted Tellicherry peppercorns in a creamy, traditional emulsion.",
        img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=600&fit=crop",
        tag: "Roman Legacy",
    },
    {
        id: 4, name: "Spaghetti alla Carbonara", price: "€22",
        description: "The authentic Roman way: guanciale, pecorino, egg yolk, and freshly cracked black pepper.",
        img: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600&h=600&fit=crop",
        tag: "Timeless Classic",
    },
    {
        id: 5, name: "Tagliatelle Bolognese", price: "€18.50",
        description: "Slow-simmered 6-hour family ragù on fresh homemade tagliatelle. True comfort.",
        img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=600&fit=crop",
        tag: "Nonno's Recipe",
    },
    {
        id: 6, name: "Salsiccia e 'Nduja", price: "€24.50",
        description: "Spicy Calabrian 'nduja, Italian sausage, and cherry tomatoes for a fiery Sicilian kick.",
        img: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=600&h=600&fit=crop",
        tag: "Spicy & Bold",
    },
];

/* ═══════════════════════════════════════════════════════
   SILVER CLOCHE SVG
   
   KEY: The bottom rim ellipse (rx=120, ry=18) is designed
   to EXACTLY match the plate ellipse below it. When the
   cloche is positioned correctly, its rim sits ON the plate.
   ═══════════════════════════════════════════════════════ */
function ClocheSVG() {
    return (
        <svg viewBox="0 0 280 200" className="w-full" style={{ filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.15))" }} fill="none">
            <defs>
                <linearGradient id="domeGrad" x1="30" y1="0" x2="250" y2="200" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#e8e8e8" />
                    <stop offset="15%" stopColor="#ffffff" />
                    <stop offset="35%" stopColor="#c0c0c0" />
                    <stop offset="50%" stopColor="#f0f0f0" />
                    <stop offset="68%" stopColor="#cccccc" />
                    <stop offset="100%" stopColor="#aaaaaa" />
                </linearGradient>
                <linearGradient id="shineGrad" x1="80" y1="15" x2="140" y2="170" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="white" stopOpacity="0.5" />
                    <stop offset="50%" stopColor="white" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>
            </defs>
            {/* Dome body */}
            <path d="M20 182 Q20 45 140 15 Q260 45 260 182" fill="url(#domeGrad)" stroke="#bbb" strokeWidth="0.5" />
            {/* Light reflection */}
            <path d="M70 172 Q80 55 140 30 Q155 55 162 172" fill="url(#shineGrad)" />
            {/* Bottom rim — THIS MATCHES THE PLATE */}
            <ellipse cx="140" cy="182" rx="120" ry="18" fill="#c0c0c0" stroke="#aaa" strokeWidth="0.5" />
            <ellipse cx="140" cy="181" rx="118" ry="16" fill="#d5d5d5" />
            {/* Handle knob */}
            <ellipse cx="140" cy="17" rx="14" ry="7" fill="#ddd" stroke="#bbb" strokeWidth="0.5" />
            <circle cx="140" cy="14" r="4" fill="white" fillOpacity="0.2" />
        </svg>
    );
}

/* ═══════════════════════════════════════════════════════
   DISH CARD
   
   Layout (side view):
   
              ___________
             /   CLOCHE  \        <- silver dome
            /              \
   ________/________________\________
   |  ┌─────────────────────────┐   |  <- plate rim peeks out
   |  │    (hidden: food circle)│   |
   └──┴─────────────────────────┴───┘
   
   When revealed:
   
           ○○○  steam
          ○○○○
        ┌────────┐
        │  FOOD  │   <- round photo, sits ON the plate
        │ (circle│      with shadow underneath
        └────────┘
   ________╱╲____________________________
   |  ┌─────────────────────────┐   |
   └──┴─────────────────────────┴───┘
                                         <- plate rim visible
   ═══════════════════════════════════════════════════════ */

function DishCard({ dish }: { dish: (typeof PASTA_MENU)[0] }) {
    const [revealed, setRevealed] = useState(false);

    // Plate dimensions (the ellipse you see on the table)
    const plateW = 290;
    const plateH = 52;
    // Cloche width matches plate (its rim overlaps the plate)
    const clocheW = 280;

    return (
        <div className="flex flex-col items-center">
            {/* Interactive area */}
            <div
                className="relative cursor-pointer"
                style={{ width: `${plateW + 20}px`, height: "260px" }}
                onClick={() => setRevealed(!revealed)}
            >
                {/* ─── TABLE SHADOW ─── */}
                <div
                    className="absolute left-1/2 -translate-x-1/2 rounded-[50%]"
                    style={{
                        bottom: "-6px",
                        width: `${plateW - 20}px`,
                        height: "14px",
                        background: "radial-gradient(ellipse, rgba(0,0,0,0.08) 0%, transparent 70%)",
                    }}
                />

                {/* ─── PLATE (always visible at bottom) ─── */}
                {/* Outer rim */}
                <div
                    className="absolute left-1/2 -translate-x-1/2 rounded-[50%]"
                    style={{
                        bottom: "0px",
                        width: `${plateW}px`,
                        height: `${plateH}px`,
                        background: "linear-gradient(180deg, #f5f0ea 0%, #e8e0d6 60%, #ddd5cb 100%)",
                        border: "1px solid #d8d0c6",
                        boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
                    }}
                />
                {/* Inner well */}
                <div
                    className="absolute left-1/2 -translate-x-1/2 rounded-[50%]"
                    style={{
                        bottom: "6px",
                        width: `${plateW - 50}px`,
                        height: `${plateH - 14}px`,
                        background: "white",
                        border: "1px solid #eee8e0",
                        boxShadow: "inset 0 1px 6px rgba(0,0,0,0.04)",
                    }}
                />

                {/* ─── FOOD (round photo sitting ON the plate) ─── */}
                <motion.div
                    className="absolute left-1/2 -translate-x-1/2 rounded-full overflow-hidden z-10"
                    style={{
                        width: "180px",
                        height: "180px",
                        bottom: `${plateH / 2 - 15}px`, // sits on the plate surface
                    }}
                    initial={false}
                    animate={{
                        opacity: revealed ? 1 : 0,
                        scale: revealed ? 1 : 0.6,
                        y: revealed ? 0 : 30,
                    }}
                    transition={{
                        duration: 0.7,
                        delay: revealed ? 0.3 : 0,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    <img src={dish.img} alt={dish.name} className="w-full h-full object-cover" />
                    {/* Subtle shadow for depth  */}
                    <div
                        className="absolute inset-0 rounded-full"
                        style={{ boxShadow: "inset 0 6px 18px rgba(0,0,0,0.15), 0 6px 20px rgba(0,0,0,0.2)" }}
                    />
                </motion.div>

                {/* ─── CLOCHE (rim sits ON the plate rim) ─── */}
                <AnimatePresence>
                    {!revealed && (
                        <motion.div
                            className="absolute left-1/2 -translate-x-1/2 z-20"
                            style={{
                                width: `${clocheW}px`,
                                // Position so the SVG's bottom rim ellipse
                                // lands exactly on the plate ellipse
                                bottom: "8px",
                            }}
                            initial={{ y: 0 }}
                            exit={{
                                y: -350,
                                rotate: 10,
                                opacity: 0,
                                transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                            }}
                        >
                            <ClocheSVG />
                            {/* Reveal prompt */}
                            <motion.div
                                className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center opacity-25"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 2.5, repeat: Infinity }}
                            >
                                <span className="material-symbols-outlined text-primary text-2xl">keyboard_double_arrow_up</span>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ─── STEAM ─── */}
                <AnimatePresence>
                    {revealed && (
                        <div className="absolute left-1/2 -translate-x-1/2 w-28 pointer-events-none z-30" style={{ bottom: "120px" }}>
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    className="absolute bottom-0 w-2 rounded-full blur-[5px]"
                                    style={{
                                        left: `${25 + i * 25}%`,
                                        background: "rgba(200,200,200,0.3)",
                                    }}
                                    initial={{ y: 0, opacity: 0, height: 8 }}
                                    animate={{
                                        y: [-10, -90],
                                        opacity: [0, 0.3, 0],
                                        height: [8, 20],
                                        scaleX: [1, 2],
                                    }}
                                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                                />
                            ))}
                        </div>
                    )}
                </AnimatePresence>
            </div>

            {/* ─── DETAILS ─── */}
            <div className="text-center mt-2 w-full max-w-[300px]">
                <AnimatePresence>
                    {revealed && (
                        <motion.span
                            className="inline-block px-4 py-1 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-2"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {dish.tag}
                        </motion.span>
                    )}
                </AnimatePresence>
                <h4 className="text-2xl font-serif text-secondary mb-1">{dish.name}</h4>
                <p className="text-secondary/50 text-sm leading-relaxed mb-3 line-clamp-2">{dish.description}</p>
                <div className="flex items-center justify-center">
                    <span className="text-2xl font-serif text-primary">{dish.price}</span>
                </div>
                {revealed && (
                    <button
                        onClick={() => setRevealed(false)}
                        className="mt-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/25 hover:text-primary transition-colors flex items-center gap-1.5 mx-auto"
                    >
                        <span className="material-symbols-outlined text-xs">refresh</span>
                        Close Cloche
                    </button>
                )}
            </div>
        </div>
    );
}

export default function ClocheMenu() {
    return (
        <section className="py-24 bg-background-light overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/5 mb-6">
                        <span className="material-symbols-outlined text-primary text-2xl">restaurant_menu</span>
                    </div>
                    <h3 className="text-5xl lg:text-6xl font-serif text-secondary mb-4 leading-tight">
                        Chef&apos;s Pasta <br /><span className="text-primary italic">Signature Reveal.</span>
                    </h3>
                    <div className="w-12 h-0.5 bg-primary/30 mx-auto mb-6" />
                    <p className="text-secondary/60 text-lg max-w-xl mx-auto leading-relaxed">
                        Experience a touch of theater. Lift the silver cloche to unveil our handmade pasta masterpieces.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
                    {PASTA_MENU.map((dish) => (
                        <DishCard key={dish.id} dish={dish} />
                    ))}
                </div>
            </div>
        </section>
    );
}
