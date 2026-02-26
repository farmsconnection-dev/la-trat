"use client";

import { motion } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const GALLERY_IMAGES = [
    { src: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=1000&fit=crop", alt: "Signature Pizza" },
    { src: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&h=1000&fit=crop", alt: "Fresh Pasta" },
    { src: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop", alt: "Italian Starters" },
    { src: "https://images.unsplash.com/photo-1600028068956-9876f8e7706b?w=800&h=800&fit=crop", alt: "Our Kitchen" },
    { src: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=1000&fit=crop", alt: "Authentic Ingredients" },
    { src: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=800&h=1200&fit=crop", alt: "Veggie Delight" },
    { src: "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?w=800&h=600&fit=crop", alt: "Pizza Night" },
    { src: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=1000&fit=crop", alt: "The Secret Sauce" },
    { src: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&h=800&fit=crop", alt: "Traditional Serving" },
];

export default function GalleryPage() {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-background-light selection:bg-primary/10 selection:text-primary">
            {/* ─── FIXED HEADER ─── */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-8 pointer-events-none">
                <header className="flex w-full max-w-5xl items-center justify-between glass-nav px-6 md:px-10 py-4 rounded-full border border-white/40 shadow-2xl shadow-secondary/10 pointer-events-auto">
                    <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 rotate-3">
                            <span className="material-symbols-outlined text-white text-2xl">arrow_back</span>
                        </div>
                        <span className="text-sm font-black uppercase tracking-widest text-secondary hidden sm:inline">Back to Home</span>
                    </Link>
                    <div className="flex-1 text-center">
                        <h1 className="text-xl md:text-2xl font-serif font-bold tracking-tight text-secondary">
                            LA <span className="text-primary italic">GALLERIA.</span>
                        </h1>
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
                            className="relative rounded-3xl overflow-hidden cursor-pointer group break-inside-avoid border-4 border-white shadow-xl hover:shadow-2xl transition-all"
                            whileHover={{ y: -5 }}
                            onClick={() => setSelectedImage(i)}
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/40 transition-colors duration-500 flex items-center justify-center">
                                <span className="text-white font-serif italic text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
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
                    className="fixed inset-0 z-[100] bg-secondary/95 backdrop-blur-md flex items-center justify-center p-6 sm:p-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <button
                        onClick={() => setSelectedImage(null)}
                        aria-label="Close Lightbox"
                        title="Close"
                        className="absolute top-8 right-8 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors text-white"
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
                            className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                        />
                    </motion.div>

                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center text-white space-y-2">
                        <h2 className="text-3xl font-serif italic">Trattoria Trium</h2>
                        <p className="text-white/60 text-sm font-bold uppercase tracking-[0.3em]">{GALLERY_IMAGES[selectedImage].alt}</p>
                    </div>
                </motion.div>
            )}

            {/* ─── DECORATIVE BLOBS ─── */}
            <div className="fixed top-0 right-0 w-1/3 h-1/2 bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 -z-10" />
            <div className="fixed bottom-0 left-0 w-1/2 h-1/2 bg-secondary/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/3 -z-10" />
        </div>
    );
}
