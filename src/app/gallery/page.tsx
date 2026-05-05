"use client";

import { motion } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function Logo({ className = "", light = true }: { className?: string; light?: boolean }) {
    return (
        <div className={`flex flex-col ${className} group`}>
            <div className="relative">
                <div className="absolute -top-1 md:-top-2 left-0 w-full h-[1px] md:h-[2px] flex opacity-70 group-hover:opacity-100 transition-all duration-700">
                    <div className="w-1/6 h-full bg-[#009246]" />
                    <div className="flex-1 h-full bg-white/10" />
                    <div className="w-1/6 h-full bg-[#ce2b37]" />
                </div>
                <span className={`font-script text-3xl md:text-4xl lg:text-5xl ${light ? 'text-white' : 'text-background-dark'} block leading-none pt-2`}>
                    Trium
                </span>
            </div>
            <div className={`flex items-center gap-1.5 md:gap-2 mt-1 md:mt-2 px-1 opacity-40 group-hover:opacity-70 transition-all duration-700 whitespace-nowrap ${light ? 'text-white' : 'text-background-dark'}`}>
                <span className="text-[5px] md:text-[7px] font-black uppercase tracking-[0.5em]">Bruges Trattoria</span>
                <div className="w-1 h-1 rounded-full bg-primary/40" />
                <span className="text-[5px] md:text-[7px] font-black uppercase tracking-[0.5em]">Since 1993</span>
            </div>
        </div>
    );
}

const GALLERY_IMAGES = [
    { src: "/images/gallery-storefront.png", alt: "Authentic Storefront" },
    { src: "/images/gallery/fb_vongole.jpg", alt: "Spaghetti alle Vongole" },
    { src: "/images/gallery-interior.jpg", alt: "Sicilian Interior" },
    { src: "/images/gallery/fb_pizza.jpg", alt: "Gourmet Pizza Bresaola" },
    { src: "/images/gallery-buffet.jpg", alt: "Antipasti Buffet" },
    { src: "/images/gallery-salad.jpg", alt: "Burrata & Beetroot" },
    { src: "/images/gallery/crostata.png", alt: "Crostata di Marmellata" },
    { src: "/images/gallery-pasta.jpg", alt: "Handmade Pasta" },
    { src: "/images/gallery/fb_baba.jpg", alt: "Baba au Rhum Speciale" },
    { src: "/images/kitchen-flame.jpg", alt: "The Sicilian Fire" },
    { src: "/images/gallery-press.png", alt: "HLN Featured" },
    { src: "/images/gallery-suggestie.jpg", alt: "Chef's Suggestion" },
    { src: "/images/gallery-tart.jpg", alt: "Artisanal Tart" },
    { src: "/images/kitchen-heritage.jpg", alt: "Kitchen Heritage" },
];

export default function GalleryPage() {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-background-dark selection:bg-primary/20 selection:text-white overflow-hidden">
            {/* ─── FIXED HEADER ─── */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-8 pointer-events-none">
                <header className="flex w-full max-w-5xl items-center justify-between backdrop-blur-2xl bg-background-dark/80 border border-white/5 shadow-2xl px-6 md:px-10 py-4 rounded-full pointer-events-auto">
                    <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 rotate-3 group-hover:rotate-6 transition-transform">
                            <span className="material-symbols-outlined text-white text-2xl">arrow_back</span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors hidden sm:inline font-sans">Back to Home</span>
                    </Link>
                    <div className="flex-1 text-center scale-75 md:scale-95">
                        <Logo className="items-center" />
                    </div>
                    <div className="w-10 h-10 invisible" /> {/* Spacer for centering */}
                </header>
            </nav>

            {/* ─── GRID CONTENT ─── */}
            <main className="pt-40 pb-32 px-6 max-w-7xl mx-auto">
                <motion.div
                    className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {GALLERY_IMAGES.map((img, i) => (
                        <motion.div
                            key={i}
                            className="relative rounded-3xl overflow-hidden cursor-pointer group break-inside-avoid border-8 border-white/5 bg-white/5 shadow-2xl hover:border-primary/20 transition-all"
                            whileHover={{ y: -5 }}
                            onClick={() => setSelectedImage(i)}
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-auto object-cover brightness-90 group-hover:brightness-100 group-hover:scale-110 transition-all duration-[1.5s]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-end p-8">
                                <span className="text-white font-serif italic text-2xl tracking-tight">
                                    {img.alt}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </main>

            {/* ─── LIGHTBOX ─── */}
            {selectedImage !== null && (
                <motion.div
                    className="fixed inset-0 z-[100] bg-background-dark/95 backdrop-blur-2xl flex items-center justify-center p-6 sm:p-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <button
                        onClick={() => setSelectedImage(null)}
                        aria-label="Close Lightbox"
                        title="Close"
                        className="absolute top-8 right-8 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors text-white/40 hover:text-white"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <motion.div
                        layoutId={`img-${selectedImage}`}
                        className="relative max-w-5xl w-full h-full flex items-center justify-center"
                    >
                        <img
                            src={GALLERY_IMAGES[selectedImage].src}
                            alt={GALLERY_IMAGES[selectedImage].alt}
                            className="max-w-full max-h-full object-contain rounded-3xl shadow-[0_50px_100px_rgba(0,0,0,0.8)] border border-white/5"
                        />
                    </motion.div>

                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center text-white space-y-3">
                        <h2 className="text-4xl font-serif italic font-light tracking-tight">Trattoria <span className="text-primary font-bold not-italic">Trium</span></h2>
                        <p className="text-white/20 text-[9px] font-bold uppercase tracking-[0.4em]">{GALLERY_IMAGES[selectedImage].alt}</p>
                    </div>
                </motion.div>
            )}

            {/* ─── DECORATIVE BLOBS ─── */}
            <div className="fixed top-0 right-0 w-1/3 h-1/2 bg-primary/[0.03] blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 -z-10" />
            <div className="fixed bottom-0 left-0 w-1/2 h-1/2 bg-primary/[0.02] blur-[120px] rounded-full translate-y-1/2 -translate-x-1/3 -z-10" />
        </div>
    );
}
