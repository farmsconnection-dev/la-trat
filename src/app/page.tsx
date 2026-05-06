"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import ReservationModal from "@/components/ReservationModal";
import ScrollHero from "@/components/ScrollHero";
import PizzaSlider from "@/components/PizzaSlider";
import AuthenticMenu from "@/components/AuthenticMenu";
import DoughSection from "@/components/DoughSection";
import SmoothScroll from "@/components/SmoothScroll";
import {
  Instagram, Facebook, Utensils,
  MapPin, Clock, Phone, ChevronDown, ChefHat,
  ArrowRight, Star, History, Pizza, Wind, Sparkles,
  Search, ShoppingBag, Users
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  return <>{children}</>;
}

/* ═══════════════════════════════════════════════════════
   REAL DATA — Trattoria Trium, Brugge (since 1993)
   ═══════════════════════════════════════════════════════ */

const LUNCH_DEALS = [
  {
    id: 1,
    name: "Classic Pizza Deal",
    desc: "A freshly baked pizza paired with a refreshing soft drink.",
    price: "€15",
    options: ["Pizza of your choice", "Softdrink or Water"],
    img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/06/74/c6/caption.jpg?w=800&q=80"
  },
  {
    id: 2,
    name: "Authentic Pasta Deal",
    desc: "A hearty bowl of pasta paired with a refreshing soft drink.",
    price: "€16",
    options: ["Pasta of your choice", "Softdrink or Water"],
    img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/80/0f/f2/caption.jpg?w=800&q=80"
  },
];

const PASTA_MENU = [
  { name: "Cacio e Pepe", desc: "The ultimate Roman classic. Fresh pasta with Pecorino Romano and freshly ground black pepper.", price: "€21.00", img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/80/0f/f2/caption.jpg?w=1200&h=-1&s=1", tag: "chef" },
  { name: "Spaghetti alle Vongole", desc: "Weekly fresh Vongole Veraci with garlic, white wine, and a touch of parsley.", price: "€26.00", img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/d2/a7/4b/caption.jpg?w=1200&h=-1&s=1", tag: "premium" },
  { name: "Pasta alla Norma", desc: "A tribute to the island: Tomato sauce, tender eggplant, and salted ricotta cheese.", price: "€21.00", img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/d2/a7/48/caption.jpg?w=1200&h=-1&s=1", tag: "chef" },
  { name: "Ossobuco alla Milanese", desc: "Homemade veal shank, slow-braised for hours in white wine and vegetables.", price: "€32.00", img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/d2/a7/49/caption.jpg?w=1200&h=-1&s=1", tag: "premium" },
  { name: "Bucatini all'Amatriciana", desc: "Guanciale, tomato sauce, pecorino — a timeless classic.", price: "€20.50", img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/06/74/c8/caption.jpg?w=1200&h=-1&s=1", tag: null },
  { name: "Spaghetti Carbonara", desc: "Guanciale, pecorino, egg — prepared the authentic way.", price: "€22.00", img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/06/74/c7/caption.jpg?w=1200&h=-1&s=1", tag: null },
];

const ANTIPASTI = [
  { name: "Selezione di Salumi", desc: "Artisanal Italian cold cuts selection", price: "€22.50", img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/fb/1c/71/starter-so-small.jpg?w=800&q=80", tag: null },
  { name: "Selezione di Formaggi", desc: "Curated variety of Italian cheeses", price: "€22.50", img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/43/3a/c2/caption.jpg?w=800&q=80", tag: null },
  { name: "Sarde a Beccafico", desc: "Sardines stuffed with fennel, breadcrumbs, and pine nuts", price: "€20.00", img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/d2/a7/47/caption.jpg?w=800&q=80", tag: "chef" },
  { name: "Burrata", desc: "Fresh burrata, cherry tomatoes, rocket", price: "€18.00", img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/06/74/c5/caption.jpg?w=800&q=80", tag: "veggie" },
  { name: "Carpaccio di Bresaola", desc: "Cured beef, rocket, parmesan shavings", price: "€20.50", img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/d2/a7/46/caption.jpg?w=800&q=80", tag: null },
];

const PIZZA_SPECIALS = [
  {
    id: 1,
    name: "Sicilian Heritage",
    description: "Our signature dough topped with fresh burrata, pistachios, and smoked salmon.",
    img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/33/23/80/a0/caption.jpg?w=800&q=80"
  },
  {
    id: 2,
    name: "Norma Redefined",
    description: "A tribute to the islands: Eggplant, salted ricotta, and slow-simmered pomodoro.",
    img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/d2/a7/48/caption.jpg?w=800&q=80"
  },
  {
    id: 3,
    name: "Vongole Verace",
    description: "The sea meets the fire: Fresh clams, garlic, and cherry tomatoes on a crisp base.",
    img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/d2/a7/4b/caption.jpg?w=800&q=80"
  }
];

const PIZZAS = [
  { name: "Margherita", desc: "Mozzarella, tomato sauce, fresh basil", price: "€12.50", tag: null, img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/06/74/c6/caption.jpg?w=1200&h=-1&s=1" },
  { name: "Pizza Tartufo", desc: "Black truffle, buffalo mozzarella, and fresh rucola on 48-hour leavened dough.", price: "€24.00", tag: "premium", img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/33/23/80/a0/caption.jpg?w=1200&h=-1&s=1" },
  { name: "Pizza Gabriele", desc: "Mushrooms, ham, eggplants, and gorgonzola.", price: "€23.00", tag: "chef", img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/31/15/09/9e/caption.jpg?w=1200&h=-1&s=1" },
  { name: "Calzone Special", desc: "Francesco's signature folded pizza with secret Italian fillings.", price: "€24.50", tag: "chef", img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/d2/a7/4a/caption.jpg?w=1200&h=-1&s=1" },
  { name: "4 Stagioni", desc: "Olives, artichokes, ham, and mushrooms.", price: "€19.50", tag: null, img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/6f/e5/45/caption.jpg?w=1200&h=-1&s=1" },
  { name: "Vegetariana", desc: "Seasonal vegetable mix, mozzarella, and tomato sauce.", price: "€22.00", tag: "veggie", img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/06/74/c5/caption.jpg?w=1200&h=-1&s=1" },
  { name: "Salmone e Burrata", desc: "Smoked salmon, fresh burrata, pistachio, and rucola.", price: "€27.00", tag: "premium", img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/43/3a/c2/caption.jpg?w=1200&h=-1&s=1" },
  { name: "Pizza Norma", desc: "Eggplant, salted ricotta, and tomato sauce.", price: "€21.00", tag: null, img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/d2/a7/48/caption.jpg?w=1200&h=-1&s=1" },
];

const DESSERTS = [
  { name: "Tiramisù", desc: "Mascarpone, biscuits, cacao", price: "€9.00", icon: "cake", img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/d2/a7/45/caption.jpg?w=800&q=80" },
  { name: "Cannolo Siciliano", desc: "Crispy shell, sweet ricotta filling", price: "€9.00", icon: "bakery_dining", img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/d2/a7/44/caption.jpg?w=800&q=80" },
  { name: "Crostata di Marmellata", desc: "Homemade artisanal jam tart — a Sicilian classic", price: "€9.00", icon: "cake", img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/d2/a7/43/caption.jpg?w=800&q=80" },
];

const TESTIMONIALS = [
  {
    name: "C.S.",
    date: "May 2026",
    rating: 5,
    text: "Authentic Italian restaurant. Class service and kindness worthy of the best: Sicilian specialities like stuffed sardines and fennel salad. We'll be back!",
    source: "TripAdvisor"
  },
  {
    name: "Italian Traveler",
    date: "April 2026",
    rating: 5,
    text: "The best Italian meal I have had for a long time! The decor is simple, but the restaurant has a very good atmosphere - a lot of the other diners were Italian, always a good sign!",
    source: "TripAdvisor"
  },
  {
    name: "Local Patron",
    date: "November 2024",
    rating: 5,
    text: "Super pizza with a perfect crust. Italian staff, very friendly and authentic. Adequate prices and a very clean, welcoming local spot.",
    source: "TripAdvisor"
  }
];function Logo({ className = "", light = true }: { className?: string; light?: boolean }) {
  return (
    <div className={`flex flex-col ${className} group`}>
      <div className="relative">
        <div className="absolute -top-1 md:-top-2 left-0 w-full h-[1px] md:h-[2px] flex opacity-70 group-hover:opacity-100 transition-all duration-700">
          <div className="w-1/6 h-full bg-[#009246]" />
          <div className="flex-1 h-full bg-white" />
          <div className="w-1/6 h-full bg-[#ce2b37]" />
        </div>
        <span className={`font-script text-3xl md:text-4xl lg:text-5xl block leading-none pt-2`}>
          <span className="text-[#009246]">T</span>
          <span className="text-noir-silver">ri</span>
          <span className="text-[#ce2b37]">um</span>
        </span>
      </div>
      <div className={`flex items-center gap-1.5 md:gap-2 mt-1 md:mt-2 px-1 opacity-40 group-hover:opacity-70 transition-all duration-700 whitespace-nowrap ${light ? 'text-noir-silver' : 'text-background-dark'}`}>
        <span className="text-[5px] md:text-[7px] font-black uppercase tracking-[0.5em]">Bruges Trattoria</span>
        <div className="w-1 h-1 rounded-full bg-primary/40" />
        <span className="text-[5px] md:text-[7px] font-black uppercase tracking-[0.5em]">Since 1993</span>
      </div>
    </div>
  );
}

function TagBadge({ type }: { type: string | null }) {
  if (!type) return null;
  const map: Record<string, { bg: string; text: string; label: string }> = {
    spicy: { bg: "bg-red-500/10", text: "text-red-400", label: "🌶 Spicy" },
    veggie: { bg: "bg-green-500/10", text: "text-green-400", label: "🌿 Veggie" },
    chef: { bg: "bg-blue-500/10", text: "text-blue-400", label: "👨‍🍳 Chef" },
    premium: { bg: "bg-amber-500/10", text: "text-amber-400", label: "⭐ Premium" },
  };
  const s = map[type];
  if (!s) return null;
  return (
    <span className={`${s.bg} ${s.text} text-[9px] font-bold uppercase px-2.5 py-1 rounded-full border border-current/10 inner-elevate backdrop-blur-md`}>
      {s.label}
    </span>
  );
}

function CurtainReveal({ onComplete }: { onComplete: () => void }) {
  const container = useRef(null);
  const leftCurtain = useRef(null);
  const rightCurtain = useRef(null);
  const logoRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: onComplete
    });

    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "power2.out"
    })
      .to(logoRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        delay: 0.5,
        ease: "power2.in"
      })
      .to([leftCurtain.current, rightCurtain.current], {
        width: 0,
        duration: 1.8,
        ease: "expo.inOut",
        stagger: 0.1
      });
  }, { scope: container });

  return (
    <div ref={container} className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none overflow-hidden bg-transparent">
      <div className="absolute inset-0 flex overflow-hidden">
        <div ref={leftCurtain} className="h-full w-1/2 bg-background-dark origin-left" />
        <div ref={rightCurtain} className="h-full w-1/2 bg-background-dark origin-right" />
      </div>
      <div ref={logoRef} className="opacity-0 relative z-10 scale-125 md:scale-150">
        <Logo className="items-center" />
      </div>
    </div>
  );
}

const Reveal = ({ children, y = 30, x = 0, delay = 0, stagger = false }: { children: React.ReactNode; y?: number; x?: number; delay?: number; stagger?: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const target = stagger ? Array.from(ref.current.children) : ref.current;

    gsap.from(target, {
      y: y,
      x: x,
      opacity: 0,
      duration: 1,
      delay: delay || 0.3, // Specific 0.3s delay as requested
      stagger: stagger ? 0.2 : 0,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%", // Fade in when 'almost' there
      }
    });
  }, { scope: ref });

  return <div ref={ref} style={{ transitionDelay: `${delay}s` }}>{children}</div>;
};

function SectionTitle({ icon, title, subtitle, onClick, isOpen }: { icon: string; title: string; subtitle: string; onClick?: () => void; isOpen?: boolean }) {
  return (
    <div className="text-center mb-12 md:mb-24 px-4 overflow-hidden relative">
      <Reveal y={20}>
        <button
          onClick={onClick}
          className={`inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 mb-6 md:mb-8 border border-primary/20 backdrop-blur-md transition-all duration-500 outline-none inner-elevate ${onClick ? 'cursor-pointer hover:bg-primary-hover shadow-lg shadow-primary/5 hover:shadow-primary/20 group' : 'pointer-events-none'}`}
        >
          <span className={`material-symbols-outlined text-primary text-xl md:text-2xl font-light transition-all duration-500 ${onClick ? 'group-hover:text-secondary' : ''} ${isOpen === false ? 'rotate-180' : ''}`}>
            {icon}
          </span>
        </button>
      </Reveal>
      <Reveal delay={0.1} y={20}>
        <h3 className="text-4xl md:text-6xl lg:text-8xl font-serif mb-4 md:mb-6 leading-tight tracking-[0.2em] uppercase text-ivory drop-shadow-2xl">{title}</h3>
      </Reveal>
      <Reveal delay={0.2} y={10}>
        <div className="w-12 md:w-16 h-px bg-primary/40 mx-auto mb-6 md:mb-8" />
        <p className="text-primary text-[10px] md:text-[12px] max-w-lg mx-auto leading-relaxed font-black uppercase tracking-[0.5em] md:tracking-[0.6em]">{subtitle}</p>
      </Reveal>
    </div>
  );
}

export default function Home() {
  const [menuTab, setMenuTab] = useState<"antipasti" | "pizza" | "pasta" | "dolci">("pizza");
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCurtain, setShowCurtain] = useState(true);
  const [isMenuExpanded, setIsMenuExpanded] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <SmoothScroll>
    <div className="relative flex min-h-screen w-full flex-col bg-transparent selection:bg-primary/20 selection:text-white overflow-x-hidden">
      {showCurtain && <CurtainReveal onComplete={() => setShowCurtain(false)} />}

      <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-700 ease-[0.25,0.46,0.45,0.94] ${isScrolled ? "p-4" : "p-6 md:p-12"}`}>
        <header className={`flex w-full max-w-7xl mx-auto items-center justify-between transition-all duration-700 px-6 md:px-10 py-6 md:py-8 rounded-full border border-white/5 backdrop-blur-[10px] ${isScrolled
          ? "bg-black/60 shadow-3xl"
          : "bg-black/20 shadow-none"
          }`}>
          <a href="#home" className="flex items-center gap-6 group" aria-label="Home">
            <Logo />
          </a>

          <div className="hidden lg:flex items-center gap-12">
            {[
              { label: "Home", href: "/" },
              { label: "Menu", href: "#menu" },
              { label: "Story", href: "#story" },
              { label: "Gallery", href: "/gallery" },
            ].map((item) => (
              <Link key={item.label} href={item.href} className="text-[14px] font-bold transition-all tracking-[0.2em] uppercase relative group text-noir-silver hover:text-primary font-sans">
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-500 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <div className={`hidden md:flex flex-col items-end transition-all duration-700 ${isScrolled ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"}`}>
              <a href="tel:050333060" className="text-noir-silver/40 hover:text-white transition-colors text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5 font-sans group">
                <span className="material-symbols-outlined text-sm text-primary group-hover:scale-110 transition-transform">call</span>
                050 33 30 60
              </a>
            </div>
            <button
              onClick={() => setIsReservationOpen(true)}
              className={`px-6 md:px-8 py-2 md:py-3 rounded-full text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-300 font-sans btn-amber-glow ${isScrolled ? "shadow-lg shadow-primary/10" : ""}`}
            >
              Reserve
            </button>
          </div>
        </header>
      </nav>

      {/* ─── MOBILE QUICK CALL ─── */}
      <motion.a
        href="tel:050333060"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-24 right-6 z-[1000] md:hidden flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 backdrop-blur-xl border border-white/10 text-white shadow-2xl overflow-hidden group"
      >
        <motion.div
          className="absolute inset-0 bg-primary/20 rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="material-symbols-outlined text-xl relative z-10 group-hover:scale-110 transition-transform">call</span>
      </motion.a>

      <main className="flex-1 w-full">
        {/* ─── CINEMATIC SCROLL HERO ─── */}
        <ScrollHero onReserve={() => setIsReservationOpen(true)} />

        {/* ─── THE SOUL OF THE DOUGH ─── */}
        <DoughSection />

        {/* ─── OVERLAPPING CONTENT SECTIONS ─── */}
        <div className="section-overlap">
          {/* ─── FOCUS PIZZA SLIDER ─── */}
          <section id="signature-pizzas" className="cinematic-section">
          {/* Background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,_rgba(255,191,0,0.03)_0%,_transparent_70%)] pointer-events-none" />

          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <Reveal y={50} delay={0.5}>
              <div className="text-center mb-16 md:mb-24">
                <span className="inline-block text-primary text-[10px] md:text-[11px] font-black uppercase tracking-[0.6em] mb-8">
                  From our Sicilian Soul
                </span>
                <h2 className="text-6xl md:text-8xl lg:text-10xl font-serif leading-[0.8] tracking-[0.3rem] uppercase text-ivory">
                  Signature
                  <br />
                  <span className="text-primary italic font-light font-editorial lowercase tracking-normal">Pizzas.</span>
                </h2>
                <div className="w-16 h-px bg-primary/40 mx-auto mt-12" />
              </div>
            </Reveal>

            <PizzaSlider />

            {/* CTA */}
            <Reveal delay={0.5} y={20}>
              <div className="text-center mt-12 md:mt-20">
                <a href="#menu" className="inline-flex items-center gap-4 text-primary/60 hover:text-primary text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-300 group">
                  <span>View Full Menu</span>
                  <span className="w-8 h-px bg-primary/20 group-hover:w-16 group-hover:bg-primary transition-all duration-500" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─── AUTHENTIC FULL MENU ─── */}
        <div id="menu">
          <AuthenticMenu />
        </div>
      </div>

        {/* ─── HERITAGE SECTION ─── */}
        <section id="story" className="cinematic-section">
          <div className="absolute inset-0 kraft-texture opacity-[0.03] pointer-events-none" />
          <div className="relative flex flex-col md:flex-row gap-20 items-center">
            <div className="flex-1 space-y-10">
              <Reveal y={40}>
                <div className="space-y-8">
                  <h3 className="text-5xl lg:text-7xl font-serif leading-[1] md:leading-[0.9] tracking-tighter italic font-light drop-shadow-2xl">
                    The <span className="text-primary not-italic font-bold">Sicilian</span> soul <br />
                    <span className="text-white/60">in the heart of Bruges.</span>
                  </h3>
                  <p className="text-ivory/50 leading-relaxed text-base md:text-lg font-normal max-w-md font-sans">
                    Since 1993, Trattoria Trium has been a cornerstone of authentic Italian dining in Bruges. Under Francesco Migliore's leadership, we bring the fire of Sicily to the Academiestraat, with dough leavened for 48 hours and a passion for pure, fresh ingredients.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.2} y={20}>
                <div className="pt-12 border-t border-white/10 grid grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <h6 className="text-[9px] font-bold uppercase tracking-[0.4em] text-primary">Kitchen Hours</h6>
                    <div className="space-y-0.5 font-sans">
                      <p className="text-white font-bold text-[10px] uppercase tracking-widest">Wednesday – Sunday</p>
                      <p className="text-ivory/50 font-serif text-xl italic tracking-tight">09:30 – 15:00</p>
                      <p className="text-ivory/50 font-serif text-xl italic tracking-tight">18:00 – 21:30</p>
                    </div>
                  </div>
                  <div className="space-y-3 opacity-40">
                    <h6 className="text-[9px] font-bold uppercase tracking-[0.4em] text-ivory">Closure</h6>
                    <div className="space-y-0.5 font-sans">
                      <p className="text-ivory font-bold text-[10px] uppercase tracking-widest">Monday – Tuesday</p>
                      <p className="text-ivory/50 font-serif text-xl italic tracking-tight">Closed</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-4 md:gap-5 scale-100 md:scale-105 md:translate-x-10">
              <Reveal delay={0.3} y={40}>
                <div className="rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[3/4] border-[6px] md:border-[10px] border-white/5 bg-white/5 group relative">
                  <img src="https://images.unsplash.com/photo-1579684947550-22e945225d9a?w=800&fit=crop" alt="Heritage" className="w-full h-full object-cover brightness-75 group-hover:brightness-100 transition-all duration-[1.5s]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background-dark/60 via-transparent to-transparent opacity-80" />
                </div>
              </Reveal>
              <Reveal delay={0.5} y={40}>
                <div className="rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[3/5] border-[10px] border-white/5 bg-white/5 translate-y-16 group relative">
                  <motion.img
                    src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&fit=crop"
                    alt="Authentic Kitchen"
                    className="w-full h-full object-cover brightness-90 group-hover:scale-110 transition-transform duration-[2s]"
                    style={{ y: useTransform(useScroll().scrollYProgress, [0, 1], [-40, 40]) }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent opacity-80" />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ─── THE TEAM SECTION ─── */}
        <section className="cinematic-section">
          <SectionTitle icon="groups" title="Incontra il Team" subtitle="THE PASSIONATE SOULS BEHIND TRIUM" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: "Francesco Migliore", role: "Owner & Chef", desc: "The visionary leader since 1993, bringing the authentic taste of Sicily to Bruges.", img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&fit=crop" },
              { name: "Gabriele Migliore", role: "Head of Pizza", desc: "A master of the dough, Gabriele ensures every pizza carries the family's legacy.", img: "https://images.unsplash.com/photo-1595273670150-db0a3d39074f?w=600&fit=crop" },
              { name: "Luca Migliore", role: "Hospitality Manager", desc: " Luca ensures every guest feels the warmth of a true Italian home.", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&fit=crop" },
            ].map((member, idx) => (
              <Reveal key={member.name} delay={idx * 0.2} y={30}>
                <div className="group relative">
                  <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border-8 border-white/5 bg-white/5 mb-8 shadow-2xl transition-all duration-700 group-hover:border-primary/20">
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover brightness-75 group-hover:brightness-100 group-hover:scale-110 transition-all duration-[2s]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  </div>
                  <h4 className="text-2xl font-serif text-ivory tracking-wider mb-2">{member.name}</h4>
                  <p className="text-primary text-[9px] font-black uppercase tracking-[0.4em] mb-4">{member.role}</p>
                  <p className="text-ivory/40 text-[11px] leading-relaxed uppercase tracking-widest">{member.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ─── LUNCH DEALS ─── */}
        <section className="cinematic-section">
          <Reveal y={40}>
            <SectionTitle icon="wb_sunny" title="Pranzo Delizioso" subtitle="REFINED LUNCH SELECTIONS FOR THE AFTERNOON" />
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {LUNCH_DEALS.map((deal, idx) => (
              <Reveal key={deal.id} delay={idx * 0.2} y={30}>
                <div className="group relative bg-transparent border-l border-white/5 pl-12 py-8 hover:border-primary/40 transition-all duration-700">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-3xl md:text-4xl font-editorial italic tracking-tight font-light text-ivory">{deal.name}</h4>
                    <span className="text-2xl font-serif text-primary font-bold italic">{deal.price.replace('€', '')}</span>
                  </div>
                  <ul className="space-y-6">
                    {deal.options.map((opt) => (
                      <li key={opt} className="text-white/40 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] font-sans">
                        <span className="w-1 h-1 rounded-full bg-primary/40" /> {opt}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>



        {/* ─── CINEMATIC STORY (VIDEO BG) ─── */}
        <section id="heritage" className="cinematic-section">
          <div className="absolute inset-0 z-0">
            {/* Muted auto-playing video placeholder behavior with a high-end image */}
            <div className="absolute inset-0 bg-[url('/images/kitchen-heritage.jpg')] bg-cover bg-fixed bg-center scale-110 opacity-30 group-hover:scale-100 transition-transform duration-[5s] ease-out" />
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-background-dark" />
            <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <Reveal y={40}>
              <span className="inline-block px-6 py-2 rounded-full border border-white/10 text-primary text-[9px] font-bold uppercase tracking-[0.5em] mb-12 backdrop-blur-md bg-white/5">
                Our Legacy
              </span>
              <h3 className="text-4xl md:text-6xl lg:text-8xl font-serif mb-8 md:mb-12 italic tracking-tighter leading-[0.9] md:leading-[0.85] font-light">
                La Famiglia <br />
                <span className="text-primary not-italic font-bold tracking-tight">è tutto.</span>
              </h3>
              <p className="text-ivory/50 text-sm md:text-lg lg:text-xl leading-relaxed font-normal mb-10 md:mb-14 max-w-2xl mx-auto uppercase tracking-[0.2em] italic px-4 md:px-0">
                From Gabriele’s passion to Noemi’s artisanal soul, Trattoria Trium is a testament to the Sicilian fire that burns in the heart of Bruges.
              </p>
              <div className="w-16 h-px bg-primary/30 mx-auto" />
            </Reveal>
          </div>
        </section>

        {/* ─── TESTIMONIALS SECTION ─── */}
        <section id="testimonials" className="cinematic-section">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,191,0,0.02)_0%,_transparent_70%)] pointer-events-none" />
          <div className="max-w-7xl mx-auto">
            <Reveal y={30}>
              <SectionTitle 
                icon="reviews" 
                title="La Voce dei Nostri Ospiti" 
                subtitle="VOICES FROM OUR SICILIAN TABLE" 
              />
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
              {TESTIMONIALS.map((t, i) => (
                <Reveal key={t.name} delay={i * 0.15} y={40}>
                  <div className="group relative flex flex-col items-center text-center opacity-90">
                    <span className="quote-icon mb-4">“</span>
                    <blockquote className="review-quote text-ivory/80 text-xl md:text-2xl lg:text-3xl font-light mb-12 max-w-sm">
                      {t.text}
                    </blockquote>
                    <div className="pt-8 border-t border-primary/10 w-24">
                      <p className="text-primary font-bold text-[9px] uppercase tracking-[0.4em] mb-1">{t.name}</p>
                      <p className="text-ivory/20 text-[7px] font-black uppercase tracking-[0.2em]">{t.source}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── REFINED DARK FOOTER ─── */}
        <footer id="location" className="bg-background-dark text-white pt-20 md:pt-32 pb-12 md:pb-16 relative overflow-hidden border-t border-white/5">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/[0.03] blur-[140px] rounded-full translate-x-1/2 -translate-y-1/2" />

          <div className="relative max-w-7xl mx-auto px-6">
            <Reveal stagger y={40}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 py-12 md:py-20">
                <div className="space-y-6 md:space-y-8">
                  <Logo />
                  <p className="text-white/50 text-[10px] font-bold uppercase tracking-[0.4em] leading-loose font-sans">
                    AUTHENTIC SICILIAN<br />EXPERIENCE SINCE 1993
                  </p>
                </div>

                <div className="space-y-8">
                  <h5 className="font-serif italic text-2xl text-primary tracking-tight">Opening Hours</h5>
                  <ul className="space-y-6 text-[12px] font-bold uppercase tracking-[0.2em] text-white/50">
                    <li className="flex justify-between border-b border-white/5 pb-4">
                      <span className="font-sans">Wed – Sun</span>
                      <div className="flex flex-col items-end">
                        <span className="text-[#FDFDD0] font-serif italic text-xl">09:30 – 15:00</span>
                        <span className="text-[#FDFDD0] font-serif italic text-xl">18:00 – 21:30</span>
                      </div>
                    </li>
                    <li className="flex justify-between text-white/20 italic">
                      <span className="font-sans">Mon – Tue</span>
                      <span className="font-serif capitalize">Closed</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-8">
                  <h5 className="font-serif italic text-2xl text-primary tracking-tight">Contact Us</h5>
                  <ul className="space-y-8 text-[12px] font-bold uppercase tracking-[0.2em] text-white/50">
                    <li>
                      <p className="text-white text-2xl font-serif italic mb-1 tracking-tight">050 33 30 60</p>
                      <p className="text-[9px] opacity-40 uppercase tracking-[0.4em] font-sans">Bruges Direct Line</p>
                    </li>
                    <li>
                      <p className="text-white text-2xl font-serif italic mb-1 tracking-tight lowercase underline decoration-primary/30 underline-offset-8">trium@skynet.be</p>
                      <p className="text-[9px] opacity-40 uppercase tracking-[0.4em] font-sans">General Inquiries</p>
                    </li>
                  </ul>
                </div>

                <div className="space-y-8 lg:text-right">
                  <h5 className="font-serif italic text-2xl text-primary tracking-tight">Our Home</h5>
                  <p className="text-white/50 text-[12px] font-bold uppercase tracking-[0.25em] leading-loose mb-10 font-sans">
                    Academiestraat 23<br />
                    8000 Brugge, Belgium
                  </p>
                  <div className="flex lg:justify-end gap-10">
                    {[
                      { name: "Instagram", Icon: Instagram },
                      { name: "Facebook", Icon: Facebook, href: "https://www.facebook.com/trattoriatrium" }
                    ].map(item => (
                      <a
                        key={item.name}
                        href={item.href || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 hover:text-primary transition-all duration-500 group font-sans"
                      >
                        <item.Icon size={16} strokeWidth={1.5} className="transition-transform group-hover:scale-110" />
                        <span>{item.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="pt-16 md:pt-24 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
              <div className="flex flex-col items-center md:items-start gap-4">
                <p className="font-script text-3xl text-primary/70">A presto!</p>
                <div className="flex flex-col gap-1">
                  <p className="text-[8px] font-bold uppercase tracking-[0.6em] text-white/30 text-center md:text-left font-sans">
                    © 2026 TRATTORIA TRIUM · REFINING TRADITION
                  </p>
                  <ClientOnly>
                    <div className="flex items-center justify-center md:justify-start gap-3 mt-4 group cursor-default">
                      <div className="relative flex items-center justify-center w-5 h-5">
                        <Sparkles className="text-primary/40 w-2.5 h-2.5 absolute group-hover:text-primary transition-all duration-1000 group-hover:scale-125" />
                        <motion.div
                          className="absolute inset-0 border border-primary/10 rounded-full"
                          animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />
                      </div>
                      <span className="text-[7px] font-black uppercase tracking-[0.8em] text-white/10 group-hover:text-white/40 transition-all duration-1000">
                        Digital Soul by Antigravity
                      </span>
                    </div>
                  </ClientOnly>
                </div>
              </div>
              <div className="flex gap-12 font-sans">
                {["Privacy", "Terms"].map(p => (
                  <p key={p} className="text-[8px] font-bold uppercase tracking-[0.4em] text-white/40 transition-colors hover:text-white cursor-pointer">{p}</p>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* ─── MOBILE QUICK CTA (FAB) ─── */}
      <button 
        onClick={() => setIsReservationOpen(true)}
        className="md:hidden fixed bottom-8 right-8 z-[120] bg-primary text-black p-5 rounded-full shadow-3xl shadow-primary/20 hover:bg-primary-hover active:scale-95 transition-all duration-300"
      >
        <Utensils className="w-6 h-6" />
      </button>

      {/* ─── CENTRAL FLOATING CTA (RESERVE) ─── */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[110] pointer-events-none w-full max-w-[320px]"
          >
            <motion.button
              onClick={() => setIsReservationOpen(true)}
              className="w-full bg-primary text-black py-6 md:py-8 rounded-full font-black text-[10px] md:text-[11px] uppercase tracking-[0.4em] shadow-[0_30px_60px_-15px_rgba(255,191,0,0.4)] hover:bg-primary-hover transition-all active:scale-95 pointer-events-auto border border-primary/20"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Reserve Table Now
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />
    </div>
    </SmoothScroll>
  );
}
