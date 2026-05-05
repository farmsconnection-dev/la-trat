"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import ReservationModal from "@/components/ReservationModal";
import ScrollHero from "@/components/ScrollHero";
import {
  Instagram, Facebook, Utensils,
  MapPin, Clock, Phone, ChevronDown, ChefHat,
  ArrowRight, Star, History, Pizza, Wind, Sparkles,
  Search, ShoppingBag
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
    img: "https://images.unsplash.com/photo-1574071318508-1cdbab80ad38?w=800&q=80"
  },
  {
    id: 2,
    name: "Authentic Pasta Deal",
    desc: "A hearty bowl of pasta paired with a refreshing soft drink.",
    price: "€16",
    options: ["Pasta of your choice", "Softdrink or Water"],
    img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80"
  },
];

const PASTA_MENU = [
  { name: "Pappardelle con Tonno", desc: "Tuna, pistachio, pomodorini confit, mint, caramelized onion", price: "€26.00", img: "/images/dishes/tonno.png", tag: "chef" },
  { name: "Pasta alla Norma", desc: "Tomato sauce, tender eggplant, salted ricotta cheese", price: "€21.00", img: "/images/dishes/norma.png", tag: "chef" },
  { name: "Spaghetti alle Vongole", desc: "Premium clams, cherry tomatoes, garlic, parsley", price: "€28.00", img: "/images/gallery/fb_vongole.jpg", tag: "premium" },
  { name: "Linguine Scoglio", desc: "North Sea mussels, king prawns, chili", price: "€28.50", img: "https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?w=800&h=800&fit=crop", tag: null },
  { name: "Gnocchi al Tartufo", desc: "Black truffle, parmesan cream, wild mushrooms", price: "€31.00", img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=800&fit=crop", tag: "premium" },
  { name: "Bucatini all'Amatriciana", desc: "Guanciale, tomato sauce, pecorino", price: "€20.50", img: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&h=800&fit=crop", tag: null },
  { name: "Spaghetti Carbonara", desc: "Guanciale, pecorino, egg — the real way", price: "€22.00", img: "/images/dishes/carbonara.png", tag: null },
];

const ANTIPASTI = [
  { name: "Selezione di Salumi", desc: "Artisanal Italian cold cuts selection", price: "€22.50", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=200&h=200&fit=crop", tag: null },
  { name: "Selezione di Formaggi", desc: "Curated variety of Italian cheeses", price: "€22.50", img: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=200&h=200&fit=crop", tag: null },
  { name: "Sarde a Beccafico", desc: "Sardines stuffed with fennel, breadcrumbs, and pine nuts", price: "€20.00", img: "/images/dishes/sarde.png", tag: "chef" },
  { name: "Burrata", desc: "Fresh burrata, cherry tomatoes, rocket", price: "€18.00", img: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&h=200&fit=crop", tag: "veggie" },
  { name: "Carpaccio di Bresaola", desc: "Cured beef, rocket, parmesan shavings", price: "€20.50", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=200&h=200&fit=crop", tag: null },
];

const PIZZA_SPECIALS = [
  {
    id: 1,
    name: "Sicilian Heritage",
    description: "Our signature dough topped with fresh burrata, pistachios, and smoked salmon.",
    img: "https://images.unsplash.com/photo-1574071318508-1cdbab80ad38?w=800&q=80"
  },
  {
    id: 2,
    name: "Norma Redefined",
    description: "A tribute to the islands: Eggplant, salted ricotta, and slow-simmered pomodoro.",
    img: "/images/dishes/norma.png"
  },
  {
    id: 3,
    name: "Vongole Verace",
    description: "The sea meets the fire: Fresh clams, garlic, and cherry tomatoes on a crisp base.",
    img: "/images/dishes/vongole.png"
  }
];

const PIZZAS = [
  { name: "Margherita", desc: "Mozzarella, tomato sauce", price: "€12.50", tag: null, img: "https://images.unsplash.com/photo-1574071318508-1cdbad80ad002?w=200&h=200&fit=crop" },
  { name: "Prosciutto", desc: "Ham, mozzarella, tomato sauce", price: "€15.50", tag: null, img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop" },
  { name: "Romana", desc: "Mozzarella, tomato sauce, ham, mushrooms", price: "€17.00", tag: null, img: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=200&h=200&fit=crop" },
  { name: "4 Formaggi", desc: "Four cheeses, tomato, mozzarella", price: "€17.50", tag: null, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=200&fit=crop" },
  { name: "4 Stagioni", desc: "Olives, artichokes, ham, mushrooms", price: "€19.50", tag: null, img: "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?w=200&h=200&fit=crop" },
  { name: "Vegetariana", desc: "Vegetable mix, mozzarella, tomato sauce", price: "€22.00", tag: "veggie", img: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=200&h=200&fit=crop" },
  { name: "Napoli", desc: "Tomato, mozzarella, anchovies, capers", price: "€20.00", tag: null, img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=200&h=200&fit=crop" },
  { name: "C'à Sasizza", desc: "Tomato, mozzarella, sausage, broccoli rabe", price: "€22.50", tag: "chef", img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200&h=200&fit=crop" },
  { name: "Pizza Gabriele", desc: "Mushrooms, ham, aubergines, gorgonzola", price: "€23.00", tag: "chef", img: "https://images.unsplash.com/photo-1600028068956-9876f8e7706b?w=200&h=200&fit=crop" },
  { name: "Salmone e Burrata", desc: "Salmone, burrata, pistacchio e rucola", price: "€27.00", tag: "premium", img: "https://images.unsplash.com/photo-1592861956120-e524fc739696?w=200&h=200&fit=crop" },
  { name: "Pizza Norma", desc: "Aubergine, salted ricotta, tomato sauce", price: "€21.00", tag: null, img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=200&h=200&fit=crop" },
];

/* ═══════════════════════════════════════════════════════
   DESSERT DATA
   ═══════════════════════════════════════════════════════ */

const DESSERTS = [
  { name: "Tiramisù", desc: "Mascarpone, biscuits, cacao", price: "€9.00", icon: "cake", img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=400&fit=crop" },
  { name: "Cannolo Siciliano", desc: "Crispy shell, sweet ricotta filling", price: "€9.00", icon: "bakery_dining", img: "https://images.unsplash.com/photo-1607478900766-efe13248b125?w=400&h=400&fit=crop" },
  { name: "Crostata di Marmellata", desc: "Homemade artisanal jam tart — a Sicilian classic", price: "€9.00", icon: "cake", img: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&h=400&fit=crop" },
  { name: "Baba al Rum", desc: "Traditional neapolitan sponge cake soaked in rum", price: "€11.00", icon: "bakery_dining", img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=400&fit=crop" },
];

/* ═══════════════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════════════ */

function Logo({ className = "", light = true }: { className?: string; light?: boolean }) {
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
          <span className="text-white">ri</span>
          <span className="text-[#ce2b37]">um</span>
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
    <span className={`${s.bg} ${s.text} text-[9px] font-bold uppercase px-2.5 py-1 rounded-full border border-current/20 backdrop-blur-md`}>
      {s.label}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════
   PREMIUM COMPONENTS & ANIMATIONS
   ═══════════════════════════════════════════════════════ */

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
      duration: 1.5,
      delay: delay,
      stagger: stagger ? 0.15 : 0,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 95%",
      }
    });
  }, { scope: ref });

  return <div ref={ref}>{children}</div>;
};

function SectionTitle({ icon, title, subtitle, onClick, isOpen }: { icon: string; title: string; subtitle: string; onClick?: () => void; isOpen?: boolean }) {
  return (
    <div className="text-center mb-12 md:mb-24 px-4 overflow-hidden relative">
      <Reveal y={20}>
        <button
          onClick={onClick}
          className={`inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 mb-6 md:mb-8 border border-primary/20 backdrop-blur-md transition-all duration-500 outline-none ${onClick ? 'cursor-pointer hover:bg-primary shadow-lg shadow-primary/5 hover:shadow-primary/20 group' : 'pointer-events-none'}`}
        >
          <span className={`material-symbols-outlined text-primary text-xl md:text-2xl font-light transition-all duration-500 ${onClick ? 'group-hover:text-secondary' : ''} ${isOpen === false ? 'rotate-180' : ''}`}>
            {icon}
          </span>
        </button>
      </Reveal>
      <Reveal delay={0.1} y={20}>
        <h3 className="text-3xl md:text-5xl lg:text-7xl font-serif text-white mb-4 md:mb-6 leading-tight tracking-tight">{title}</h3>
      </Reveal>
      <Reveal delay={0.2} y={10}>
        <div className="w-12 md:w-16 h-px bg-primary/40 mx-auto mb-6 md:mb-8" />
        <p className="text-white/60 text-[11px] md:text-[13px] max-w-lg mx-auto leading-relaxed font-black uppercase tracking-[0.3em] md:tracking-[0.4em]">{subtitle}</p>
      </Reveal>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════ */

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
    <div className="relative flex min-h-screen w-full flex-col bg-background-dark selection:bg-primary/20 selection:text-white overflow-x-hidden">
      {showCurtain && <CurtainReveal onComplete={() => setShowCurtain(false)} />}

      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-[0.25,0.46,0.45,0.94] ${isScrolled ? "p-4" : "p-6 md:p-12"}`}>
        <header className={`flex w-full max-w-7xl mx-auto items-center justify-between transition-all duration-700 px-6 md:px-10 py-6 md:py-8 rounded-full ${isScrolled
          ? "backdrop-blur-2xl bg-background-dark/85 border border-white/10 shadow-3xl"
          : "bg-transparent border-transparent shadow-none"
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
              <Link key={item.label} href={item.href} className="text-[14px] font-bold transition-all tracking-[0.2em] uppercase relative group text-white hover:text-primary font-sans">
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-500 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <div className={`hidden md:flex flex-col items-end transition-all duration-700 ${isScrolled ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"}`}>
              <a href="tel:050333060" className="text-white/60 hover:text-white transition-colors text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5 font-sans group">
                <span className="material-symbols-outlined text-sm text-primary group-hover:scale-110 transition-transform">call</span>
                050 33 30 60
              </a>
            </div>
            <button
              onClick={() => setIsReservationOpen(true)}
              className={`px-6 md:px-8 py-2 md:py-3 rounded-full text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-700 font-sans ${isScrolled ? "bg-primary text-secondary hover:bg-white shadow-lg shadow-primary/10" : "bg-white text-secondary hover:bg-primary hover:text-white"}`}
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
        className="fixed top-24 right-6 z-[100] md:hidden flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 backdrop-blur-xl border border-white/10 text-white shadow-2xl overflow-hidden group"
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

        {/* ─── REST OF PAGE ─── */}
        <section id="signature-pizzas" className="relative z-50 bg-[#0a0805] py-24 md:py-32 px-6 overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,_rgba(210,130,50,0.06)_0%,_transparent_70%)] pointer-events-none" />

          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <Reveal y={30}>
              <div className="text-center mb-20 md:mb-28">
                <span className="inline-block text-primary text-[10px] md:text-[11px] font-black uppercase tracking-[0.5em] mb-6">
                  From the Wood-Fired Oven
                </span>
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[0.9] tracking-tighter">
                  Our Signature
                  <br />
                  <span className="text-primary italic font-light">Pizzas.</span>
                </h2>
                <div className="w-16 h-px bg-primary/40 mx-auto mt-10" />
              </div>
            </Reveal>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  num: "01",
                  name: "Sicilian Heritage",
                  desc: "Fresh burrata, Sicilian pistachios, smoked salmon on our signature slow-proofed dough.",
                  price: "€27.00",
                  tag: "Chef's Pick",
                  img: "/images/signature-pizza-burrata.png"
                },
                {
                  num: "02",
                  name: "Norma Redefined",
                  desc: "A tribute to Sicily: slow-simmered pomodoro, glistening eggplant, salted ricotta, fresh basil.",
                  price: "€21.00",
                  tag: "Vegetarian",
                  img: "/images/signature-pizza-norma.png"
                },
                {
                  num: "03",
                  name: "Vongole Verace",
                  desc: "The sea on dough: fresh clams, cherry tomatoes, white wine reduction, garlic, parsley.",
                  price: "€28.00",
                  tag: "Premium",
                  img: "/images/signature-pizza-vongole.png"
                },
              ].map((pizza, i) => (
                <Reveal key={pizza.num} delay={i * 0.15} y={40}>
                  <motion.div
                    className="group relative rounded-[2.5rem] overflow-hidden border border-white/8 bg-white/[0.03] backdrop-blur-sm cursor-pointer"
                    whileHover={{ y: -8, scale: 1.01 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden">
                      <motion.img
                        src={pizza.img}
                        alt={pizza.name}
                        className="w-full h-full object-cover brightness-75 group-hover:brightness-90 transition-all duration-700"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                      {/* Number overlay */}
                      <span className="absolute top-6 left-6 text-[10px] font-black uppercase tracking-[0.4em] text-white/30">{pizza.num}</span>
                      {/* Tag */}
                      <span className="absolute top-6 right-6 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-[9px] font-black uppercase tracking-[0.25em] backdrop-blur-md">
                        {pizza.tag}
                      </span>
                      {/* Bottom gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    </div>

                    {/* Card content */}
                    <div className="p-8 md:p-10">
                      <h3 className="text-2xl md:text-3xl font-serif text-white italic tracking-tight mb-3 group-hover:text-primary transition-colors duration-500">
                        {pizza.name}
                      </h3>
                      <p className="text-white/40 text-[12px] leading-relaxed font-sans mb-8">
                        {pizza.desc}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-serif text-primary font-light italic">{pizza.price}</span>
                        <button
                          onClick={() => setIsReservationOpen(true)}
                          className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-white/50 hover:text-primary transition-colors duration-300 group/btn"
                        >
                          Order
                          <span className="w-6 h-px bg-white/30 group-hover/btn:w-10 group-hover/btn:bg-primary transition-all duration-300" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>

            {/* CTA */}
            <Reveal delay={0.5} y={20}>
              <div className="text-center mt-16 md:mt-24">
                <a href="#menu" className="inline-flex items-center gap-4 text-white/40 hover:text-white text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-300 group">
                  <span>View Full Menu</span>
                  <span className="w-8 h-px bg-white/20 group-hover:w-16 group-hover:bg-primary transition-all duration-500" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─── HERITAGE SECTION ─── */}
        <section id="story" className="relative max-w-7xl mx-auto px-6 py-32 overflow-hidden rounded-[4rem] bg-white/[0.02] border border-white/5 scroll-mt-32 md:scroll-mt-48">
          <div className="absolute inset-0 kraft-texture opacity-[0.03] pointer-events-none" />
          <div className="relative flex flex-col md:flex-row gap-20 items-center">
            <div className="flex-1 space-y-10">
              <Reveal x={-40}>
                <div className="space-y-8">
                  <h3 className="text-5xl lg:text-7xl font-serif text-white leading-[1] md:leading-[0.9] tracking-tighter italic font-light drop-shadow-2xl">
                    The <span className="text-primary not-italic font-bold">Sicilian</span> soul <br />
                    <span className="text-white/60">in the heart of Bruges.</span>
                  </h3>
                  <p className="text-white/50 leading-relaxed text-base md:text-lg font-normal max-w-md font-sans">
                    Every dish at Trattoria Trium is a testament to our roots. From the sun-drenched flavors
                    of Sicily to the historic streets of Bruges, we bring honesty to the table.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.2} y={20}>
                <div className="pt-12 border-t border-white/10 grid grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <h6 className="text-[9px] font-bold uppercase tracking-[0.4em] text-primary">Kitchen Hours</h6>
                    <div className="space-y-0.5 font-sans">
                      <p className="text-white font-bold text-[10px] uppercase tracking-widest">Tue – Saturday</p>
                      <p className="text-white/50 font-serif text-xl italic tracking-tight">12:00 – 14:30</p>
                      <p className="text-white/50 font-serif text-xl italic tracking-tight">18:00 – 21:30</p>
                    </div>
                  </div>
                  <div className="space-y-3 opacity-40">
                    <h6 className="text-[9px] font-bold uppercase tracking-[0.4em] text-white">Closure</h6>
                    <div className="space-y-0.5 font-sans">
                      <p className="text-white font-bold text-[10px] uppercase tracking-widest">Sun – Monday</p>
                      <p className="text-white/50 font-serif text-xl italic tracking-tight">Closed</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-4 md:gap-5 scale-100 md:scale-105 md:translate-x-10">
              <Reveal delay={0.3} x={30}>
                <div className="rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[3/4] border-[6px] md:border-[10px] border-white/5 bg-white/5 group relative">
                  <img src="https://images.unsplash.com/photo-1579684947550-22e945225d9a?w=800&fit=crop" alt="Heritage" className="w-full h-full object-cover brightness-75 group-hover:brightness-100 transition-all duration-[1.5s]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background-dark/60 via-transparent to-transparent opacity-80" />
                </div>
              </Reveal>
              <Reveal delay={0.5} y={40}>
                <div className="rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[3/5] border-[10px] border-white/5 bg-white/5 translate-y-16 group relative">
                  <motion.img
                    src="/images/kitchen-flame.jpg"
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

        {/* ─── LUNCH DEALS ─── */}
        <section className="max-w-7xl mx-auto px-6">
          <SectionTitle icon="wb_sunny" title="Pranzo Delizioso" subtitle="REFINED LUNCH SELECTIONS FOR THE AFTERNOON" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {LUNCH_DEALS.map((deal, idx) => (
              <Reveal key={deal.id} delay={idx * 0.2} y={30}>
                <div className="group relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-10 hover:bg-white/10 transition-all duration-700 shadow-2xl">
                  <div className="flex items-center justify-between mb-10">
                    <h4 className="text-2xl font-serif text-white italic tracking-tight font-medium">{deal.name}</h4>
                    <span className="text-3xl font-serif text-primary font-light italic">{deal.price}</span>
                  </div>
                  <ul className="space-y-4">
                    {deal.options.map((opt) => (
                      <li key={opt} className="text-white/60 flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest font-sans">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40" /> {opt}
                      </li>
                    ))}
                  </ul>
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-10 transition-opacity duration-1000">
                    <span className="material-symbols-outlined text-primary text-6xl">restaurant</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>


        {/* ─── LA CARTA (FULL MENU) ─── */}
        <section id="menu" className="max-w-7xl mx-auto px-6 scroll-mt-40">
          <SectionTitle
            icon="menu_book"
            title="La Nostra Carta"
            subtitle="EXPLORE THE FULL DEPTH OF OUR KITCHEN"
            onClick={() => setIsMenuExpanded(!isMenuExpanded)}
            isOpen={isMenuExpanded}
          />

          <AnimatePresence>
            {isMenuExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="flex bg-white/5 rounded-full p-1 md:p-1.5 mb-12 md:mb-16 max-w-xl mx-auto border border-white/10 backdrop-blur-2xl">
                  {(["antipasti", "pizza", "pasta", "dolci"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setMenuTab(tab)}
                      className={`flex-1 py-3 md:py-4 rounded-full text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] transition-all duration-700 font-sans ${menuTab === tab
                        ? "bg-primary text-secondary shadow-2xl"
                        : "text-white/50 hover:text-white/80"
                        }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pb-20">
                  {(menuTab === "pizza" ? PIZZAS : menuTab === "pasta" ? PASTA_MENU : menuTab === "antipasti" ? ANTIPASTI : DESSERTS).map((item, idx) => (
                    <Reveal key={item.name} delay={(idx % 3) * 0.15}>
                      <div className="bg-white/5 backdrop-blur-2xl rounded-[3.5rem] p-10 border border-white/5 flex flex-col items-center gap-10 transition-all duration-700 hover:bg-white/10 group shadow-2xl">
                        <div className="w-56 h-56 rounded-[3rem] overflow-hidden shadow-2xl bg-white/10 shrink-0 border-[10px] border-white/5 group-hover:rotate-2 group-hover:scale-105 transition-all duration-[1s]">
                          <img src={item.img} alt={item.name} className="w-full h-full object-cover brightness-75 group-hover:brightness-100 transition-all duration-[1.5s]" />
                        </div>
                        <div className="text-center space-y-5">
                          <div className="flex flex-col items-center gap-2">
                            {"tag" in item && <TagBadge type={(item as any).tag} />}
                            <h4 className="text-2xl lg:text-3xl font-serif text-white italic tracking-tight font-medium">{item.name}</h4>
                          </div>
                          <p className="text-white/60 text-[9px] md:text-[11px] font-bold leading-relaxed uppercase tracking-[0.2em] md:tracking-[0.25em] max-w-[220px] mx-auto min-h-[3rem] font-sans">{item.desc}</p>
                          <div className="pt-5 border-t border-white/10 w-1/3 mx-auto">
                            <span className="text-3xl font-serif text-primary font-light tracking-tight italic">{item.price}</span>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* ─── CINEMATIC STORY (VIDEO BG) ─── */}
        <section id="heritage" className="relative py-80 bg-background-dark overflow-hidden group">
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
              <h3 className="text-4xl md:text-6xl lg:text-8xl font-serif text-white mb-8 md:mb-12 italic tracking-tighter leading-[0.9] md:leading-[0.85] font-light">
                La Famiglia <br />
                <span className="text-primary not-italic font-bold tracking-tight">è tutto.</span>
              </h3>
              <p className="text-white/50 text-sm md:text-lg lg:text-xl leading-relaxed font-normal mb-10 md:mb-14 max-w-2xl mx-auto uppercase tracking-[0.2em] italic px-4 md:px-0">
                From Gabriele’s passion to Noemi’s artisanal soul, Trattoria Trium is a testament to the Sicilian fire that burns in the heart of Bruges.
              </p>
              <div className="w-16 h-px bg-primary/30 mx-auto" />
            </Reveal>
          </div>
        </section>

        {/* ─── REFINED DARK FOOTER ─── */}
        <footer className="bg-background-dark text-white pt-20 md:pt-32 pb-12 md:pb-16 relative overflow-hidden border-t border-white/5">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/[0.03] blur-[140px] rounded-full translate-x-1/2 -translate-y-1/2" />

          <div className="relative max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 py-12 md:py-20">
              <div className="space-y-6 md:space-y-8">
                <Logo />
                <p className="text-white/50 text-[10px] font-bold uppercase tracking-[0.4em] leading-loose">
                  AUTHENTIC SICILIAN<br />EXPERIENCE SINCE 1993
                </p>
              </div>

              <div className="space-y-8">
                <h5 className="font-serif italic text-2xl text-primary tracking-tight">Opening Hours</h5>
                <ul className="space-y-6 text-[12px] font-bold uppercase tracking-[0.2em] text-white/50">
                  <li className="flex justify-between border-b border-white/5 pb-4">
                    <span className="font-sans">Tue – Sat</span>
                    <span className="text-white font-serif italic text-xl">12:00 – 14:30</span>
                    <span className="text-white font-serif italic text-xl">18:00 – 21:30</span>
                  </li>
                  <li className="flex justify-between text-white/20 italic">
                    <span className="font-sans">Sun – Mon</span>
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
              className="w-full bg-secondary text-white py-6 md:py-8 rounded-full font-black text-[10px] md:text-[11px] uppercase tracking-[0.4em] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] hover:shadow-[0_45px_100px_-20px_rgba(0,0,0,0.6)] transition-all active:scale-95 pointer-events-auto border border-white/5"
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
  );
}
