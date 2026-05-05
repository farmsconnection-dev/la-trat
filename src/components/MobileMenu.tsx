"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Instagram, Facebook, Phone, MapPin } from "lucide-react";
import Link from "next/link";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onReserve: () => void;
}

const menuLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "#menu" },
  { label: "Story", href: "#story" },
  { label: "Gallery", href: "/gallery" },
];

export default function MobileMenu({ isOpen, onClose, onReserve }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[200] bg-background-dark/90 backdrop-blur-xl"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm z-[201] bg-secondary border-l border-white/5 shadow-2xl p-8 flex flex-col"
          >
            <div className="flex items-center justify-between mb-12">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">Navigation</span>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="flex flex-col gap-8">
              {menuLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="text-4xl font-serif text-white italic tracking-tight hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto space-y-10">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => {
                  onReserve();
                  onClose();
                }}
                className="w-full py-4 bg-primary text-secondary rounded-full font-bold uppercase tracking-[0.2em] text-[11px]"
              >
                Reserve Table
              </motion.button>

              <div className="space-y-6">
                <div className="flex items-center gap-4 text-white/40">
                  <Phone size={14} className="text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">050 33 30 60</span>
                </div>
                <div className="flex items-center gap-4 text-white/40">
                  <MapPin size={14} className="text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-left">Academiestraat 23, Bruges</span>
                </div>
              </div>

              <div className="flex gap-6 pt-6 border-t border-white/5">
                <a href="#" className="text-white/20 hover:text-primary transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="https://www.facebook.com/trattoriatrium" className="text-white/20 hover:text-primary transition-colors">
                  <Facebook size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
