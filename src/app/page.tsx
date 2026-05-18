"use client";

import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { getBestsellers, collections, testimonials } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { QuickViewModal } from "@/components/quick-view-modal";
import { Product } from "@/lib/data";

export default function Home() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const bestsellers = getBestsellers().slice(0, 4);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-brand-purple">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-brand-purple/40 z-10" />
          <img
            src="/images/slider.jpeg"
            alt="Luxury Moroccan Chocolate"
            className="w-full h-full object-cover scale-105"
          />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-brand-gold text-xs tracking-[0.4em] uppercase font-light mb-6 block">
              Chocobox
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-brand-offwhite tracking-wide mb-6 leading-tight">
              L'Ultime
              <br />
              <span className="font-serif italic text-gold-gradient">Cadeau de Luxe</span>
            </h1>
            <p className="text-brand-lavender/80 text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto">
              Conçu pour offrir avec élégance. Découvrez notre collection artisanale de chocolats premium inspirés du Maroc.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 glass-dark text-brand-offwhite px-8 py-4 rounded-full text-sm tracking-[0.2em] uppercase font-light hover:bg-brand-gold hover:border-brand-gold transition-all duration-500 group"
            >
              Explorer la Collection
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>


      {/* Bestsellers Section */}
      <section className="py-24 lg:py-32 bg-brand-cream relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 lg:mb-24">
            <div>
              <span className="text-brand-gold text-xs tracking-[0.2em] uppercase font-medium mb-3 block">
                Chefs-d'œuvre Signature
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-brand-purple tracking-wide">
                Meilleures Ventes
              </h2>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-brand-purple text-xs tracking-[0.2em] uppercase font-medium hover:text-brand-gold transition-colors"
            >
              Voir Tout
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {bestsellers.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-24 lg:py-32 bg-brand-purple text-brand-offwhite overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-current" preserveAspectRatio="none">
            <path d="M0,0 L100,0 L100,100 L50,100 Z" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-brand-gold text-xs tracking-[0.3em] uppercase font-light mb-4 block">
                Notre Héritage
              </span>
              <h2 className="text-4xl lg:text-5xl font-light tracking-wide mb-6 leading-tight">
                L'Art de la <br/>
                <span className="text-gold-gradient italic font-serif">Chocolaterie</span> Marocaine
              </h2>
              <p className="text-brand-lavender/70 font-light leading-relaxed mb-8 text-lg">
                Nous associons les ingrédients traditionnels marocains — safran, huile d'argan et eau de rose — au chocolat belge le plus fin. Chaque pièce est méticuleusement fabriquée à la main dans notre atelier de Marrakech pour créer une expérience cadeau transcendante.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-3 border border-brand-lavender/30 text-brand-offwhite px-8 py-3.5 rounded-full text-xs tracking-[0.2em] uppercase font-light hover:bg-brand-gold hover:border-brand-gold transition-all duration-300"
              >
                Découvrez Notre Histoire
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4 mt-12">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-brand-lavender/10">
                  <img src="https://picsum.photos/seed/craft1/600/800" alt="Craftsmanship" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square rounded-3xl overflow-hidden bg-brand-lavender/10">
                  <img src="https://picsum.photos/seed/craft2/600/600" alt="Ingredients" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="aspect-square rounded-3xl overflow-hidden bg-brand-lavender/10">
                  <img src="https://picsum.photos/seed/craft3/600/600" alt="Packaging" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-brand-lavender/10">
                  <img src="https://picsum.photos/seed/craft4/600/800" alt="Details" className="w-full h-full object-cover" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 lg:py-32 bg-brand-cream relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-brand-gold text-xs tracking-[0.2em] uppercase font-medium mb-3 block">
            Expériences Clients
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-brand-purple tracking-wide mb-16">
            Mots d'Élégance
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl text-left border border-brand-lavender/10 shadow-sm"
              >
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                  ))}
                </div>
                <p className="text-brand-purple/70 font-light text-sm leading-relaxed mb-6 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-brand-lavender/20">
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-brand-purple">{t.name}</h4>
                    <p className="text-xs text-brand-purple/40 font-light">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </main>
  );
}
