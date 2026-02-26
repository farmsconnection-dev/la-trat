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
                        className="relative w-full max-w-xl bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            aria-label="Close Reservation Modal"
                            className="absolute top-8 right-8 w-12 h-12 rounded-full border border-secondary/5 flex items-center justify-center hover:bg-secondary/5 transition-colors z-10"
                        >
                            <X className="w-5 h-5 text-secondary" />
                        </button>

                        <div className="p-10 sm:p-12">
                            <AnimatePresence mode="wait">
                                {step === "form" ? (
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="space-y-10"
                                    >
                                        <div className="space-y-2">
                                            <motion.h2
                                                custom={0} variants={formVariants} initial="hidden" animate="visible"
                                                className="text-4xl font-serif text-secondary"
                                            >
                                                Prenota un <span className="text-primary italic">Tavolo.</span>
                                            </motion.h2>
                                            <motion.p
                                                custom={1} variants={formVariants} initial="hidden" animate="visible"
                                                className="text-secondary/50 text-sm font-medium"
                                            >
                                                Join us for an authentic Sicilian experience in the heart of Bruges.
                                            </motion.p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                <motion.div custom={2} variants={formVariants} initial="hidden" animate="visible" className="space-y-2">
                                                    <label htmlFor="res-date" className="text-[10px] font-black uppercase tracking-widest text-secondary/40 flex items-center gap-2">
                                                        <Calendar className="w-3 h-3" /> Date
                                                    </label>
                                                    <input
                                                        id="res-date"
                                                        required
                                                        type="date"
                                                        min={new Date().toISOString().split("T")[0]}
                                                        className="w-full bg-secondary/5 border-none rounded-2xl px-5 py-4 text-sm font-bold text-secondary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                                        value={formData.date}
                                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                                    />
                                                    {formData.date && [0, 1].includes(new Date(formData.date).getDay()) && (
                                                        <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest mt-2 px-1">
                                                            We are closed on Sun & Mon
                                                        </p>
                                                    )}
                                                </motion.div>
                                                <motion.div custom={3} variants={formVariants} initial="hidden" animate="visible" className="space-y-2">
                                                    <label htmlFor="res-time" className="text-[10px] font-black uppercase tracking-widest text-secondary/40 flex items-center gap-2">
                                                        <Clock className="w-3 h-3" /> Time
                                                    </label>
                                                    <select
                                                        id="res-time"
                                                        required
                                                        className="w-full bg-secondary/5 border-none rounded-2xl px-5 py-4 text-sm font-bold text-secondary focus:ring-2 focus:ring-primary/20 transition-all outline-none appearance-none"
                                                        value={formData.time}
                                                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                                    >
                                                        <option value="">Select time</option>
                                                        <option value="12:00">12:00</option>
                                                        <option value="13:00">13:00</option>
                                                        <option value="18:00">18:00</option>
                                                        <option value="19:00">19:00</option>
                                                        <option value="20:00">20:00</option>
                                                    </select>
                                                </motion.div>
                                            </div>

                                            <motion.div custom={4} variants={formVariants} initial="hidden" animate="visible" className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 flex items-center gap-2">
                                                    <Users className="w-3 h-3" /> Guests
                                                </label>
                                                <div className="grid grid-cols-4 gap-3">
                                                    {["1", "2", "3", "4+"].map((num) => (
                                                        <button
                                                            key={num}
                                                            type="button"
                                                            onClick={() => setFormData({ ...formData, guests: num })}
                                                            className={`py-3 rounded-xl text-sm font-black transition-all ${formData.guests === num ? "bg-primary text-white shadow-lg shadow-primary/25" : "bg-secondary/5 text-secondary/40 hover:bg-secondary/10"}`}
                                                        >
                                                            {num}
                                                        </button>
                                                    ))}
                                                </div>
                                            </motion.div>

                                            <motion.div custom={5} variants={formVariants} initial="hidden" animate="visible" className="space-y-2">
                                                <label htmlFor="res-name" className="text-[10px] font-black uppercase tracking-widest text-secondary/40">Full Name</label>
                                                <input
                                                    id="res-name"
                                                    required
                                                    type="text"
                                                    placeholder="Gabriele Trium"
                                                    className="w-full bg-secondary/5 border-none rounded-2xl px-5 py-4 text-sm font-bold text-secondary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                />
                                            </motion.div>

                                            <motion.button
                                                custom={6} variants={formVariants} initial="hidden" animate="visible"
                                                type="submit"
                                                disabled={formData.date ? [0, 1].includes(new Date(formData.date).getDay()) : false}
                                                className="w-full bg-primary text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all mt-6 disabled:opacity-30 disabled:pointer-events-none"
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
                                        className="text-center py-10 space-y-8"
                                    >
                                        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-10">
                                            <CheckCircle2 className="w-12 h-12 text-primary" />
                                        </div>
                                        <div className="space-y-4">
                                            <h2 className="text-5xl font-serif text-secondary italic">Grazie Mille!</h2>
                                            <p className="text-secondary/50 text-lg max-w-xs mx-auto">
                                                Your table for {formData.guests} has been requested for {formData.date} at {formData.time}.
                                            </p>
                                        </div>
                                        <div className="pt-10">
                                            <button
                                                onClick={onClose}
                                                className="px-12 py-4 border-2 border-secondary/10 rounded-full text-xs font-black uppercase tracking-widest text-secondary hover:bg-secondary hover:text-white transition-all"
                                            >
                                                Close Window
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Decorative bottom bar */}
                        <div className="h-2 bg-gradient-to-r from-primary to-primary/60 w-full" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
