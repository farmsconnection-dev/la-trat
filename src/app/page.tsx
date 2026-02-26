"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ClocheMenu from "@/components/ClocheMenu";
import ReservationModal from "@/components/ReservationModal";

/* ═══════════════════════════════════════════════════════
   REAL DATA — Trattoria Trium, Brugge (since 1993)
   ═══════════════════════════════════════════════════════ */

const LUNCH_DEALS = [
  {
    title: "Pizza + Soft Drink",
    price: "€15",
    options: ["Margherita with Champignons", "Margherita with Spicy Salame"],
  },
  {
    title: "Pasta + Soft Drink",
    price: "€16",
    options: [
      "Tagliatelle al Pomodoro",
      "Tagliatelle alla Gricia (guanciale & pecorino)",
    ],
  },
];

const PIZZAS = [
  { name: "Margherita", desc: "Mozzarella, tomato sauce", price: "€13.50", tag: null, img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=200&fit=crop" },
  { name: "Prosciutto", desc: "Ham, mozzarella, tomato sauce", price: "€15.50", tag: null, img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop" },
  { name: "Romana", desc: "Mozzarella, tomato sauce, ham, mushrooms", price: "€17.00", tag: null, img: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=200&h=200&fit=crop" },
  { name: "4 Formaggi", desc: "Four cheeses, tomato, mozzarella", price: "€17.50", tag: null, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=200&fit=crop" },
  { name: "4 Stagioni", desc: "Olives, artichokes, ham, mushrooms", price: "€19.50", tag: null, img: "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?w=200&h=200&fit=crop" },
  { name: "Vegetariana", desc: "Vegetable mix, mozzarella, tomato sauce", price: "€20.00", tag: "veggie", img: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=200&h=200&fit=crop" },
  { name: "Norma", desc: "Aubergine, salted ricotta, tomato sauce", price: "€21.00", tag: null, img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=200&h=200&fit=crop" },
  { name: "Calzone", desc: "Folded — mozzarella, ham, mushrooms", price: "€21.00", tag: null, img: "https://images.unsplash.com/photo-1536964549781-2af8d34e4c4b?w=200&h=200&fit=crop" },
  { name: "Diavola", desc: "Spicy salami, 'nduja, spicy cheese", price: "€22.00", tag: "spicy", img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200&h=200&fit=crop" },
  { name: "Pizza Gabriele", desc: "Mushrooms, ham, aubergines, gorgonzola", price: "€23.00", tag: "chef", img: "https://images.unsplash.com/photo-1600028068956-9876f8e7706b?w=200&h=200&fit=crop" },
  { name: "Pizza Tartufo", desc: "Truffle sauce, mushrooms, speck", price: "€23.00", tag: "premium", img: "https://images.unsplash.com/photo-1592861956120-e524fc739696?w=200&h=200&fit=crop" },
  { name: "Crudo e Rucola", desc: "Parma ham, rocket, grana padano flakes", price: "€24.50", tag: "premium", img: "https://images.unsplash.com/photo-1600028068956-9876f8e7706b?w=200&h=200&fit=crop" },
];

const PASTAS = [
  { name: "Tagliatelle Bolognese", desc: "Ragù bolognese, homemade tagliatelle", price: "€18.50", img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=200&h=200&fit=crop" },
  { name: "Bucatini all'Amatriciana", desc: "Guanciale, tomato sauce, pecorino", price: "€20.50", img: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=200&h=200&fit=crop" },
  { name: "Penne alla Norma", desc: "Aubergine, ricotta salata, tomato sauce", price: "€21.00", img: "https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb?w=200&h=200&fit=crop" },
  { name: "Spaghetti Carbonara", desc: "Guanciale, pecorino, egg — the real way", price: "€22.00", img: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=200&h=200&fit=crop" },
  { name: "Tagliatelle Arrabbiata", desc: "Burrata, grana, basil — spicy kick", price: "€22.50", img: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=200&h=200&fit=crop" },
  { name: "Tagliatella al Salmone", desc: "Salmon, cherry tomatoes, rocket pesto", price: "€23.00", img: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=200&h=200&fit=crop" },
  { name: "Salsiccia e 'Nduja", desc: "Minced sausage, 'nduja, pomodorini", price: "€24.50", img: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=200&h=200&fit=crop" },
  { name: "Spaghetti alle Vongole", desc: "Clams, pistachio pesto, lemon oil", price: "€28.00", img: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=200&h=200&fit=crop" },
];

const ANTIPASTI = [
  { name: "Burrata", desc: "Cherry tomatoes, rocket, lettuce, carrots, cucumbers", price: "€16.50", img: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=200&h=200&fit=crop" },
  { name: "Carpaccio di Bresaola", desc: "Bresaola, rocket salad, parmesan shavings", price: "€17.00", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=200&h=200&fit=crop" },
  { name: "Selezione Salumi e Formaggi", desc: "Selection of Italian cold cuts and cheeses", price: "€19.50", img: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=200&h=200&fit=crop" },
];

const DESSERTS = [
  { name: "Tiramisù", desc: "Mascarpone, biscuits, cacao", price: "€9.00", icon: "cake", img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=200&h=200&fit=crop" },
  { name: "Cannolo Siciliano", desc: "Crispy shell, sweet ricotta filling", price: "€9.00", icon: "bakery_dining", img: "https://images.unsplash.com/photo-1607478900766-efe13248b125?w=200&h=200&fit=crop" },
];

const BOX_PIZZAS = [
  {
    name: "Pizza Trium",
    label: "House Special",
    labelColor: "text-primary",
    labelBorder: "border-primary/20",
    price: "€23.00",
    rating: "5.0",
    description: "Sicilian sausage, mushrooms, spicy salami, artichokes — our iconic signature.",
    ingredients: ["Salsiccia", "Mushrooms", "Spicy Salami", "Artichokes"],
    pizzaImg: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=600&h=600&fit=crop",
  },
  {
    name: "Margherita",
    label: "La Classica",
    labelColor: "text-green-600",
    labelBorder: "border-green-600/20",
    price: "€13.50",
    rating: "4.9",
    description: "The timeless classic — San Marzano tomato, fior di latte mozzarella, fresh basil.",
    ingredients: ["Tomato", "Mozzarella", "Basil", "Olive Oil"],
    pizzaImg: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=600&h=600&fit=crop",
  },
  {
    name: "Pizza Gabriele",
    label: "Chef's Pick",
    labelColor: "text-blue-600",
    labelBorder: "border-blue-600/20",
    price: "€23.00",
    rating: "4.9",
    description: "Named after our founder — ham, mushrooms, aubergines, and gorgonzola cheese.",
    ingredients: ["Ham", "Mushrooms", "Aubergines", "Gorgonzola"],
    pizzaImg: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=600&h=600&fit=crop",
  },
  {
    name: "Pizza Tartufo",
    label: "Premium",
    labelColor: "text-amber-600",
    labelBorder: "border-amber-600/20",
    price: "€23.00",
    rating: "4.8",
    description: "Rich black truffle cream, mushrooms, and salty speck for a deep, earthy flavor.",
    ingredients: ["Truffle Cream", "Mushrooms", "Speck"],
    pizzaImg: "https://images.unsplash.com/photo-1592861956120-e524fc739696?w=600&h=600&fit=crop",
  },
  {
    name: "Diavola",
    label: "Spicy",
    labelColor: "text-red-600",
    labelBorder: "border-red-600/20",
    price: "€22.00",
    rating: "4.7",
    description: "For the brave — spicy salami, 'nduja, and chili-infused cheese.",
    ingredients: ["Spicy Salami", "'Nduja", "Chili Cheese"],
    pizzaImg: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&h=600&fit=crop",
  },
  {
    name: "Crudo e Rucola",
    label: "Fresh",
    labelColor: "text-emerald-600",
    labelBorder: "border-emerald-600/20",
    price: "€24.50",
    rating: "4.9",
    description: "Freshly sliced Parma ham, peppery rocket, and grana padano shavings added after baking.",
    ingredients: ["Parma Ham", "Rocket", "Grana Padano"],
    pizzaImg: "https://images.unsplash.com/photo-1600028068956-9876f8e7706b?w=600&h=600&fit=crop",
  },
];

const DETAIL_IMAGES = [
  { src: "/images/trium-exterior.jpg", alt: "Trattoria Trium - Gevel" },
  { src: "/images/trium-team.jpg", alt: "Trattoria Trium - Keuken & Team" },
  { src: "/images/trium-interior.jpg", alt: "Trattoria Trium - Interieur" },
];

/* ═══════════════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════════════ */

function TagBadge({ type }: { type: string | null }) {
  if (!type) return null;
  const map: Record<string, { bg: string; text: string; label: string }> = {
    spicy: { bg: "bg-red-100", text: "text-red-600", label: "🌶 Spicy" },
    veggie: { bg: "bg-green-100", text: "text-green-600", label: "🌿 Veggie" },
    chef: { bg: "bg-blue-100", text: "text-blue-600", label: "👨‍🍳 Chef" },
    premium: { bg: "bg-amber-100", text: "text-amber-700", label: "⭐ Premium" },
  };
  const s = map[type];
  if (!s) return null;
  return (
    <span className={`${s.bg} ${s.text} text-[10px] font-bold uppercase px-2 py-0.5 rounded-full`}>
      {s.label}
    </span>
  );
}

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.21, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

function SectionTitle({ icon, title, subtitle }: { icon: string; title: string; subtitle: string }) {
  return (
    <div className="text-center mb-16 px-4">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/5 mb-6">
        <span className="material-symbols-outlined text-primary text-2xl font-light">{icon}</span>
      </div>
      <h3 className="text-4xl lg:text-5xl font-serif text-secondary mb-4 leading-tight">{title}</h3>
      <div className="w-12 h-0.5 bg-primary/30 mx-auto mb-4" />
      <p className="text-secondary/60 text-sm max-w-lg mx-auto leading-relaxed font-medium uppercase tracking-widest">{subtitle}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════ */

export default function Home() {
  const [openBox, setOpenBox] = useState<number | null>(null);
  const [menuTab, setMenuTab] = useState<"antipasti" | "pizza" | "pasta" | "dolci">("pizza");
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light selection:bg-primary/10 selection:text-primary overflow-x-hidden">

      {/* ─── PREMIUM FLOATING NAV ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-8 pointer-events-none">
        <header className="flex w-full max-w-6xl items-center justify-between backdrop-blur-xl bg-white/70 px-6 md:px-12 py-5 rounded-full border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.08)] pointer-events-auto transition-all duration-500 hover:shadow-[0_12px_48px_rgba(0,0,0,0.12)]">
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 rotate-3 transition-transform group-hover:rotate-12">
              <span className="material-symbols-outlined text-white text-2xl font-light">restaurant</span>
            </div>
            <h1 className="text-xl md:text-2xl font-serif font-black tracking-tighter text-secondary">
              TRATTORIA<span className="text-primary">TRIUM</span>
            </h1>
          </a>

          <div className="hidden lg:flex items-center gap-10">
            {[
              { label: "Home", href: "/" },
              { label: "Menu", href: "#menu" },
              { label: "Story", href: "#story" },
              { label: "Gallery", href: "/gallery" },
            ].map((item) => (
              <Link key={item.label} href={item.href} className="text-[10px] font-black text-secondary/60 hover:text-primary transition-all tracking-[0.25em] uppercase relative group">
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <a href="tel:050333060" className="hidden xl:flex items-center gap-2 text-secondary/40 hover:text-secondary transition-colors text-[10px] font-black uppercase tracking-widest">
              <span className="material-symbols-outlined text-base">call</span>
              050 33 30 60
            </a>
            <button
              onClick={() => setIsReservationOpen(true)}
              className="bg-secondary text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary transition-all shadow-lg shadow-secondary/10"
            >
              Reserve
            </button>
          </div>
        </header>
      </nav>

      <main className="flex-1 w-full space-y-32 pb-32">
        {/* ─── CINEMATIC HERO ─── */}
        <section id="home" className="relative min-h-[90dvh] flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-secondary/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/3" />

          <div className="relative w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 text-center lg:text-left">
              <Reveal>
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-[0.2em] mb-8">
                  Since 1993 · Bruges
                </span>
              </Reveal>
              <Reveal delay={0.2}>
                <h2 className="text-6xl md:text-8xl xl:text-9xl font-serif text-secondary leading-[0.9] mb-8 tracking-tighter">
                  Verità <br />
                  <span className="text-primary italic font-light">Italiana.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.4}>
                <p className="text-lg md:text-xl text-secondary/60 max-w-xl mb-10 leading-relaxed font-medium">
                  Experience the soul of Sicily in the heart of Bruges. Fresh pasta,
                  wood-fired pizzas, and a family tradition spanning generations.
                </p>
              </Reveal>
              <Reveal delay={0.6}>
                <div className="flex flex-col sm:flex-row items-center gap-8 justify-center lg:justify-start">
                  <button
                    onClick={() => setIsReservationOpen(true)}
                    className="px-12 py-5 bg-primary text-white font-black text-[11px] uppercase tracking-[0.3em] rounded-full shadow-2xl shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transition-all active:scale-95"
                  >
                    Book Table
                  </button>
                  <a href="#menu" className="flex items-center gap-3 text-secondary/50 font-black hover:text-secondary transition-colors group">
                    <span className="text-[11px] uppercase tracking-[0.2em]">Explore Menu</span>
                    <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">east</span>
                  </a>
                </div>
              </Reveal>
            </div>

            <div className="flex-1 relative w-full max-w-2xl">
              <Reveal delay={0.4}>
                <div className="relative aspect-square">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white shadow-2xl rounded-3xl -rotate-6 z-10 flex items-center justify-center p-4">
                    <div className="text-center">
                      <p className="text-xs font-black text-primary uppercase mb-1">Authentic</p>
                      <p className="text-2xl font-serif text-secondary italic">Recipes</p>
                    </div>
                  </div>
                  <div className="w-full h-full rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] bg-secondary/5 border-8 border-white">
                    <motion.img
                      src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&h=1200&fit=crop"
                      alt="Signature Trium Pizza"
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 1.5, ease: [0.21, 1, 0.36, 1] }}
                    />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ─── INFO & GALLERY ─── */}
        <section id="gallery" className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1 space-y-8">
                <h3 className="text-5xl font-serif text-secondary leading-tight tracking-tighter">Authentic Sicilian <br /><span className="text-primary italic">Heritage.</span></h3>
                <p className="text-secondary/60 leading-relaxed text-lg font-medium">
                  Every dish at Trattoria Trium is a testament to our roots. From the sun-drenched flavors
                  of Sicily to the historic streets of Bruges, we bring you an experience that is bold, honest, and unforgettable.
                </p>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="rounded-3xl overflow-hidden shadow-xl aspect-square border-4 border-white">
                  <img src="/images/trium-exterior.jpg" alt="Exterior" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-3xl overflow-hidden shadow-xl aspect-square border-4 border-white">
                  <img src="/images/trium-team.jpg" alt="Team" className="w-full h-full object-cover" />
                </div>
                <div className="col-span-2 rounded-3xl overflow-hidden shadow-xl aspect-[2/1] border-4 border-white">
                  <img src="/images/trium-interior.jpg" alt="Interior" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ─── LUNCH DEALS ─── */}
        <section className="max-w-7xl mx-auto px-6">
          <Reveal>
            <SectionTitle icon="sunny" title="Pranzo Delizioso" subtitle="REFINED LUNCH SELECTIONS FOR THE AFTERNOON" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {LUNCH_DEALS.map((deal) => (
                <div key={deal.title} className="group relative bg-white border border-secondary/5 rounded-[3rem] p-10 hover:shadow-2xl hover:shadow-secondary/5 transition-all">
                  <div className="flex items-center justify-between mb-8">
                    <h4 className="text-2xl font-serif text-secondary italic">{deal.title}</h4>
                    <span className="text-3xl font-serif text-primary">{deal.price}</span>
                  </div>
                  <ul className="space-y-4">
                    {deal.options.map((opt) => (
                      <li key={opt} className="text-secondary/50 flex items-center gap-4 text-sm font-bold uppercase tracking-wide">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" /> {opt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ─── INTERACTIVE BOXES ─── */}
        <section id="specials" className="py-32 bg-secondary/[0.02] border-y border-secondary/5">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal>
              <SectionTitle icon="local_pizza" title="Our Signature Pizza" subtitle="HAND-STRETCHED, STONE-OVEN FIRED" />
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {BOX_PIZZAS.map((item, idx) => {
                const isOpen = openBox === idx;
                return (
                  <Reveal key={item.name} delay={idx * 0.1}>
                    <div
                      className="relative cursor-pointer group"
                      onClick={() => setOpenBox(isOpen ? null : idx)}
                    >
                      <div className="relative w-full">
                        <motion.div
                          className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white bg-[#faf7f3]"
                          animate={{ opacity: isOpen ? 1 : 0.4, scale: isOpen ? 1 : 0.98 }}
                        >
                          <img alt={item.name} className="w-full h-full object-contain p-6" src={item.pizzaImg} />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-40 pointer-events-none" />
                        </motion.div>

                        <AnimatePresence>
                          {!isOpen && (
                            <motion.div
                              className="absolute inset-0 z-10"
                              exit={{ y: -200, opacity: 0, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] } }}
                            >
                              <div className="w-full h-full rounded-[3rem] bg-gradient-to-br from-[#fcf9f6] to-[#f4eee8] border-2 border-[#e8dccf] shadow-2xl flex flex-col items-center justify-center p-12 relative overflow-hidden">
                                <div className="absolute inset-0 opacity-[0.05] kraft-texture" />
                                <div className="bg-primary/5 w-16 h-16 rounded-full flex items-center justify-center mb-8">
                                  <span className="material-symbols-outlined text-primary text-3xl font-light">local_pizza</span>
                                </div>
                                <div className={`bg-white px-8 py-5 rounded-2xl shadow-xl border-2 ${item.labelBorder} transform ${idx % 2 === 0 ? "-rotate-1" : "rotate-1"}`}>
                                  <p className={`text-[9px] font-black uppercase tracking-[0.3em] ${item.labelColor} mb-2 text-center`}>{item.label}</p>
                                  <h4 className="text-xl font-serif text-secondary text-center tracking-tight">{item.name}</h4>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            className="mt-6 bg-white p-10 rounded-[2.5rem] shadow-2xl border border-secondary/5 space-y-4"
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                          >
                            <div className="flex items-start justify-between">
                              <h4 className="text-2xl font-serif text-secondary italic tracking-tight">{item.name}</h4>
                              <span className="text-2xl font-serif text-primary">{item.price}</span>
                            </div>
                            <p className="text-secondary/50 text-sm leading-relaxed font-medium">{item.description}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── CLOCHE PASTA REVEAL ─── */}
        <Reveal>
          <ClocheMenu />
        </Reveal>

        {/* ─── LA CARTA (FULL MENU) ─── */}
        <section id="menu" className="max-w-5xl mx-auto px-6">
          <Reveal>
            <SectionTitle icon="menu_book" title="La Nostra Carta" subtitle="EXPLORE THE FULL DEPTH OF OUR KITCHEN" />
            <div className="flex bg-secondary/5 rounded-full p-2 mb-12 max-w-2xl mx-auto">
              {(["antipasti", "pizza", "pasta", "dolci"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setMenuTab(tab)}
                  className={`flex-1 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${menuTab === tab ? "bg-white text-secondary shadow-lg shadow-secondary/5" : "text-secondary/30 hover:text-secondary/60"}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
              {(menuTab === "pizza" ? PIZZAS : menuTab === "pasta" ? PASTAS : menuTab === "antipasti" ? ANTIPASTI : DESSERTS).map((item) => (
                <div key={item.name} className="bg-white rounded-[4rem] p-10 border border-secondary/5 flex flex-col sm:flex-row items-center gap-12 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all group">
                  <div className="w-56 h-56 rounded-[3rem] overflow-hidden shadow-2xl bg-secondary/5 shrink-0 border-8 border-white group-hover:rotate-2 transition-transform duration-700">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <h4 className="text-2xl font-serif text-secondary italic tracking-tight">{item.name}</h4>
                        {"tag" in item && <TagBadge type={(item as any).tag} />}
                      </div>
                      <span className="text-3xl font-serif text-primary">{item.price}</span>
                    </div>
                    <p className="text-secondary/40 text-[12px] font-bold leading-relaxed uppercase tracking-widest">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ─── UNIFIED PREMIUM FINALE (STORY + FOOTER) ─── */}
        <section id="story" className="bg-secondary text-white pt-40 pb-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
            <div className="absolute inset-0 dot-pattern" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6">
            {/* Story Part */}
            <div className="max-w-4xl mx-auto text-center mb-40">
              <Reveal>
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-12">
                  SINCE 1993
                </span>
                <h3 className="text-6xl md:text-7xl font-serif mb-12 italic leading-tight tracking-tighter">La Famiglia è tutto.</h3>
                <p className="text-white/40 text-xl leading-relaxed font-light mb-16 max-w-2xl mx-auto">
                  From Gabriele&apos;s passion for the perfect dough to Noemi&apos;s artisanal pastries,
                  Trattoria Trium is more than a restaurant. It&apos;s a shared table where the soul of Sicily meets the heart of Bruges.
                </p>
              </Reveal>
            </div>

            {/* Footer Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 items-start pt-20 border-t border-white/5">
              {/* Column 1: Logo & Vision */}
              <div className="space-y-6">
                <a href="#home" className="inline-block group">
                  <h1 className="text-3xl font-serif font-black tracking-tighter">
                    TRATTORIA<span className="text-primary">TRIUM.</span>
                  </h1>
                </a>
                <p className="text-white/30 text-[14px] leading-relaxed font-medium uppercase tracking-wider">
                  Sicilian soul,<br />Bruges heart.
                </p>
              </div>

              {/* Column 2: Opening Hours */}
              <div className="space-y-6">
                <h5 className="font-bold text-[10px] uppercase tracking-[0.2em] text-primary">Hours</h5>
                <ul className="space-y-3 text-[15px] font-medium text-white/40">
                  <li className="flex justify-between border-b border-white/5 pb-2">
                    <span>Tue – Sat</span>
                    <span className="text-white/80">12:00 – 21:30</span>
                  </li>
                  <li className="flex justify-between text-white/20">
                    <span>Sun – Mon</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>

              {/* Column 3: Contact */}
              <div className="space-y-6">
                <h5 className="font-bold text-[10px] uppercase tracking-[0.2em] text-primary">Contact</h5>
                <ul className="space-y-4 text-[15px] font-medium text-white/40">
                  <li>
                    <p className="text-white/80 mb-1">050 33 30 60</p>
                    <p className="text-[12px] opacity-50">Direct Line</p>
                  </li>
                  <li>
                    <p className="text-white/80 mb-1">trattoria.trium@skynet.be</p>
                    <p className="text-[12px] opacity-50">Email Support</p>
                  </li>
                </ul>
              </div>

              {/* Column 4: Location & Social */}
              <div className="space-y-6 lg:text-right">
                <h5 className="font-bold text-[10px] uppercase tracking-[0.2em] text-primary">Location</h5>
                <p className="text-white/40 text-[15px] font-medium leading-relaxed mb-6">
                  Academiestraat 23<br />
                  8000 Brugge, Belgium
                </p>
                <div className="flex lg:justify-end gap-6 text-[11px] font-black uppercase tracking-[0.2em]">
                  <a href="#" className="text-white/40 hover:text-primary transition-colors">Instagram</a>
                  <a href="#" className="text-white/40 hover:text-primary transition-colors">Facebook</a>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-white/5 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/10">
                © {new Date().getFullYear()} TRATTORIA TRIUM · AUTHENTIC SICILIAN KITCHEN
              </p>
            </div>
          </div>
        </section>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/10">
          © {new Date().getFullYear()} TRATTORIA TRIUM · MADE WITH PASSION FOR AUTHENTIC TASTE
        </p>
    </div>
          </div >
        </footer >
      </main >

    {/* ─── CENTRAL FLOATING CTA (RESERVE TABLE NOW) ─── */ }
    < div className = "fixed bottom-10 left-1/2 -translate-x-1/2 z-50 pointer-events-none w-full max-w-[280px]" >
      <button
        onClick={() => setIsReservationOpen(true)}
        className="w-full bg-[#d35400] text-white py-[20px] rounded-full font-bold text-[12px] uppercase tracking-[0.25em] shadow-[0_20px_40px_-10px_rgba(211,84,0,0.6)] hover:shadow-[0_25px_50px_-12px_rgba(211,84,0,0.8)] hover:-translate-y-1 transition-all active:scale-95 pointer-events-auto"
      >
        Reserve Table Now
      </button>
      </div >

    <ReservationModal
      isOpen={isReservationOpen}
      onClose={() => setIsReservationOpen(false)}
    />
    </div >
  );
}
