"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Users, Clock, CheckCircle2 } from "lucide-react";

interface ReservationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
    const [step, setStep] = useState<"form" | "success">("form");
    const [formData, setFormData] = useState({
        date: "",
        time: "",
        guests: "2",
        name: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep("success");
    };

    const formVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: [0.21, 1, 0.36, 1] as const,
            },
        }),
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12 overflow-hidden"
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-secondary/40 backdrop-blur-xl"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 40 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="relative w-full max-w-xl bg-background-dark/95 backdrop-blur-2xl rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden border border-white/5"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            aria-label="Close Reservation Modal"
                            className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center hover:bg-primary hover:text-secondary group transition-all duration-300 z-[60] shadow-2xl"
                        >
                            <X className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                        </button>

                        <div className="p-10 sm:p-14">
                            <AnimatePresence mode="wait">
                                {step === "form" ? (
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="space-y-12"
                                    >
                                        <div className="space-y-3">
                                            <motion.h2
                                                custom={0} variants={formVariants} initial="hidden" animate="visible"
                                                className="text-5xl font-serif text-white tracking-tight"
                                            >
                                                Prenota un <span className="text-primary italic font-light">Tavolo.</span>
                                            </motion.h2>
                                            <motion.p
                                                custom={1} variants={formVariants} initial="hidden" animate="visible"
                                                className="text-white/40 text-[11px] font-bold uppercase tracking-[0.3em]"
                                            >
                                                AUTHENTIC SICILIAN EXPERIENCE · BRUGES
                                            </motion.p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-8">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                                <motion.div custom={2} variants={formVariants} initial="hidden" animate="visible" className="space-y-3">
                                                    <label htmlFor="res-date" className="text-[10px] font-black uppercase tracking-widest text-primary/60 flex items-center gap-2">
                                                        <Calendar className="w-3 h-3" /> Date
                                                    </label>
                                                    <input
                                                        id="res-date"
                                                        required
                                                        type="date"
                                                        min={new Date().toISOString().split("T")[0]}
                                                        className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-5 text-sm font-bold text-white focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                                        value={formData.date}
                                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                                    />
                                                    {formData.date && [0, 1].includes(new Date(formData.date).getDay()) && (
                                                        <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mt-2 px-1">
                                                            We are closed on Sun & Mon
                                                        </p>
                                                    )}
                                                </motion.div>
                                                <motion.div custom={3} variants={formVariants} initial="hidden" animate="visible" className="space-y-3">
                                                    <label htmlFor="res-time" className="text-[10px] font-black uppercase tracking-widest text-primary/60 flex items-center gap-2">
                                                        <Clock className="w-3 h-3" /> Time
                                                    </label>
                                                    <select
                                                        id="res-time"
                                                        required
                                                        className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-5 text-sm font-bold text-white focus:ring-2 focus:ring-primary/20 transition-all outline-none appearance-none"
                                                        value={formData.time}
                                                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                                    >
                                                        <option value="" className="bg-secondary">Select time</option>
                                                        <option value="12:00" className="bg-secondary">12:00</option>
                                                        <option value="13:00" className="bg-secondary">13:00</option>
                                                        <option value="18:00" className="bg-secondary">18:00</option>
                                                        <option value="19:00" className="bg-secondary">19:00</option>
                                                        <option value="20:00" className="bg-secondary">20:00</option>
                                                    </select>
                                                </motion.div>
                                            </div>

                                            <motion.div custom={4} variants={formVariants} initial="hidden" animate="visible" className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-primary/60 flex items-center gap-2">
                                                    <Users className="w-3 h-3" /> Guests
                                                </label>
                                                <div className="grid grid-cols-4 gap-4">
                                                    {["1", "2", "3", "4+"].map((num) => (
                                                        <button
                                                            key={num}
                                                            type="button"
                                                            onClick={() => setFormData({ ...formData, guests: num })}
                                                            className={`py-4 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all ${formData.guests === num ? "bg-primary text-secondary shadow-lg shadow-primary/20" : "bg-white/5 text-white/30 hover:bg-white/10"}`}
                                                        >
                                                            {num}
                                                        </button>
                                                    ))}
                                                </div>
                                            </motion.div>

                                            <motion.div custom={5} variants={formVariants} initial="hidden" animate="visible" className="space-y-3">
                                                <label htmlFor="res-name" className="text-[10px] font-black uppercase tracking-widest text-primary/60">Full Name</label>
                                                <input
                                                    id="res-name"
                                                    required
                                                    type="text"
                                                    placeholder="Gabriele Trium"
                                                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-5 text-sm font-bold text-white placeholder-white/10 focus:ring-2 focus:ring-primary/20 transition-all outline-none font-sans"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                />
                                            </motion.div>

                                            <motion.button
                                                custom={6} variants={formVariants} initial="hidden" animate="visible"
                                                type="submit"
                                                disabled={formData.date ? [0, 1].includes(new Date(formData.date).getDay()) : false}
                                                className="w-full bg-primary text-secondary py-6 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] shadow-xl shadow-primary/10 hover:bg-white hover:-translate-y-0.5 transition-all mt-8 disabled:opacity-20 disabled:pointer-events-none"
                                            >
                                                Confirm Reservation
                                            </motion.button>
                                        </form>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-12 space-y-10"
                                    >
                                        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-10 border border-primary/20">
                                            <CheckCircle2 className="w-12 h-12 text-primary" />
                                        </div>
                                        <div className="space-y-5">
                                            <h2 className="text-6xl font-serif text-white italic tracking-tight font-light">Grazie <span className="text-primary not-italic font-bold">Mille!</span></h2>
                                            <p className="text-white/40 text-[11px] font-bold uppercase tracking-[0.3em] max-w-xs mx-auto leading-loose">
                                                Your table for {formData.guests} has been requested for {formData.date} at {formData.time}.
                                            </p>
                                        </div>
                                        <div className="pt-10">
                                            <button
                                                onClick={onClose}
                                                className="px-12 py-4 border border-white/10 rounded-full text-[9px] font-bold uppercase tracking-widest text-white/40 hover:bg-white hover:text-secondary transition-all"
                                            >
                                                Close Window
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Decorative bottom bar */}
                        <div className="h-2 bg-primary w-full opacity-50" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
