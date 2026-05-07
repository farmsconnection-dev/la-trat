"use client";

import { motion } from "framer-motion";
import { Download, Printer } from "lucide-react";

const MENU_DATA = {
  pizzas: [
    { name: "Margherita Extra", price: "14", desc: "San Marzano D.O.P., Mozzarella di Bufala, verse basilicum, extra vergine olijfolie." },
    { name: "Diavola Calabrese", price: "16.5", desc: "Spianata piccante, ’Nduja, zwarte olijven, fior di latte, chili-olie." },
    { name: "Tartufo e Funghi", price: "18", desc: "Witte basis, truffelcrème, wilde paddenstoelen, parmezaan, peterselie." },
    { name: "Pizza Gabriele", price: "23", desc: "Mushrooms, ham, eggplants, gorgonzola" },
    { name: "Salmone e Burrata", price: "27", desc: "Smoked salmon, fresh burrata, pistachio" }
  ],
  antipasti: [
    { name: "Burrata Pugliese", price: "12", desc: "Romige burrata, kerstomaatjes, rucola, focaccia toast." },
    { name: "Selezione di Salumi", price: "22.5", desc: "Artisanal Italian cold cuts selection" },
    { name: "Chianti Classico", price: "7 / 38", desc: "Een volle rode wijn, perfect bij onze houtoven pizza’s." },
    { name: "Nero d'Avola", price: "8 / 42", desc: "Bold Sicilian red with notes of dark cherry." },
    { name: "Pinot Grigio", price: "6 / 32", desc: "Crisp and refreshing white from Friuli." }
  ],
  dolci: [
    { 
      name: "Dolce del Giorno", 
      price: "9", 
      desc: "Zachte biscuitrol gevuld met verse room en aardbeien, afgewerkt met meringue en eetbare bloemetjes.",
      image: "https://scontent.fbru2-1.fna.fbcdn.net/v/t39.30808-6/491834512_1250940723704451_6644554787141929762_n.jpg?stp=dst-jpg_s960x960_tt6"
    },
    { 
      name: "Mousse al Cioccolato", 
      price: "8.5", 
      desc: "Huisgemaakte chocolademousse met verse aardbeien en een krokante Italiaanse cialda.",
      image: "https://scontent.fbru2-1.fna.fbcdn.net/v/t39.30808-6/685975801_1592084392923414_1908620052264736310_n.jpg?stp=c538.0.924.924a_dst-jpg_s160x160_tt6"
    },
    { 
      name: "Cannolo Siciliano", 
      price: "8", 
      desc: "Authentieke Siciliaanse cannolo gevuld met verse ricotta en pistache.",
      image: "https://scontent.fbru5-1.fna.fbcdn.net/v/t39.30808-6/684391877_1591087063023147_6135756113504949551_n.jpg"
    },
    { 
      name: "Aperitivo Speciale", 
      price: "15", 
      desc: "Selectie van Italiaanse hapjes inclusief cocktail naar keuze.",
      image: "https://scontent.fbru5-1.fna.fbcdn.net/v/t39.30808-6/678760528_1583551287110058_2668162561863960467_n.jpg"
    }
  ]
};

export default function AuthenticMenu() {
  return (
    <section id="full-menu" className="cinematic-section py-64 md:py-96 px-6 overflow-hidden">
      {/* Background Depth Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 kraft-texture opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Menu Header */}
        <div className="text-center mb-64 md:mb-80 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          >
            <span className="text-primary text-[10px] font-black uppercase tracking-[0.8em] mb-6 block">Authentic Experience</span>
            <h2 className="text-6xl md:text-8xl font-serif text-primary tracking-[0.4rem] uppercase font-bold mb-12">La Nostra Carta</h2>
            <div className="w-24 h-px bg-primary/30 mx-auto" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[6vw] gap-y-48 md:gap-y-64">
          {/* Le Pizze */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-20"
          >
            <h3 className="text-2xl md:text-3xl font-serif text-primary border-b border-primary/10 pb-8 mb-16 tracking-[0.4rem] uppercase font-bold">Le Pizze</h3>
            <div className="space-y-20">
              {MENU_DATA.pizzas.map((item) => (
                <div key={item.name} className="menu-item group cursor-default hover-glow">
                  <div className="flex justify-between items-baseline gap-4 mb-3 relative">
                    <div className="relative flex-shrink-0">
                      <span className="font-editorial text-2xl md:text-3xl text-ivory group-hover:text-primary transition-all duration-500 italic block">
                        {item.name}
                      </span>
                    </div>
                    {/* Gold Dotted Separator */}
                    <div className="flex-1 border-b border-dotted border-primary/20 mx-2 h-[1px] translate-y-[-8px]" />
                    <span className="font-serif text-xl md:text-2xl text-ivory font-bold flex-shrink-0">
                      {item.price.replace('€', '').trim()}
                    </span>
                  </div>
                  <p className="text-[10px] md:text-[11px] text-ivory/50 uppercase tracking-[0.2em] font-sans leading-relaxed max-w-[85%] transition-colors group-hover:text-ivory/70">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Antipasti & Vino */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-20"
          >
            <h3 className="text-2xl md:text-3xl font-serif text-primary border-b border-primary/10 pb-8 mb-16 tracking-[0.4rem] uppercase font-bold">Antipasti & Vino</h3>
            <div className="space-y-20">
              {MENU_DATA.antipasti.map((item) => (
                <div key={item.name} className="menu-item group cursor-default hover-glow">
                  <div className="flex justify-between items-baseline gap-4 mb-3 relative">
                    <div className="relative flex-shrink-0">
                      <span className="font-editorial text-2xl md:text-3xl text-ivory group-hover:text-primary transition-all duration-500 italic block">
                        {item.name}
                      </span>
                    </div>
                    {/* Gold Dotted Separator */}
                    <div className="flex-1 border-b border-dotted border-primary/20 mx-2 h-[1px] translate-y-[-8px]" />
                    <span className="font-serif text-xl md:text-2xl text-ivory font-bold flex-shrink-0">
                      {item.price.replace('€', '').trim()}
                    </span>
                  </div>
                  <p className="text-[10px] md:text-[11px] text-ivory/50 uppercase tracking-[0.2em] font-sans leading-relaxed max-w-[85%] transition-colors group-hover:text-ivory/70">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* I Nostri Dolci - Featured Section */}
        <div className="mt-48 md:mt-64 pt-48 border-t border-primary/10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-32"
          >
            <h3 className="text-3xl md:text-5xl font-serif text-primary tracking-[0.4rem] uppercase font-bold">I Nostri Dolci</h3>
            <p className="font-editorial text-ivory/60 italic mt-4">Con Amore dalla Cucina</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {MENU_DATA.dolci.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="menu-item group hover-glow p-8 rounded-lg transition-all duration-500"
              >
                {item.image && (
                  <div className="aspect-square mb-8 overflow-hidden rounded-sm relative">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover social-img-grade group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                  </div>
                )}
                <div className="flex justify-between items-baseline mb-4">
                  <span className="font-editorial text-xl text-ivory italic group-hover:text-primary transition-colors">
                    {item.name}
                  </span>
                  <span className="font-serif text-lg text-primary font-bold">
                    {item.price}
                  </span>
                </div>
                <p className="text-[10px] text-ivory/40 uppercase tracking-widest leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Action Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-64 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 border-t border-primary/10 pt-32"
        >
          <button className="flex items-center gap-4 text-ivory/40 hover:text-primary transition-all duration-500 group">
            <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Scarica Menù</span>
          </button>
          <div className="hidden md:block w-px h-8 bg-primary/10" />
          <button className="flex items-center gap-4 text-ivory/40 hover:text-primary transition-all duration-500 group">
            <Printer className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Stampa</span>
          </button>
        </motion.div>
      </div>
      
      {/* Decorative Side Element */}
      <div className="absolute top-1/2 -right-40 -translate-y-1/2 opacity-5 pointer-events-none hidden xl:block">
        <h4 className="text-[20rem] font-serif italic text-primary rotate-90 leading-none">Trium</h4>
      </div>
    </section>
  );
}
