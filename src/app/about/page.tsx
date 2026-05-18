"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function About() {
  return (
    <main className="flex-1 bg-brand-offwhite overflow-hidden">
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-brand-purple/60 z-10" />
          <img
            src="https://picsum.photos/seed/abouthero/1920/1080"
            alt="Chocobox Heritage"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-brand-gold text-xs tracking-[0.4em] uppercase font-light mb-6 block">
              Notre Histoire
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-brand-offwhite tracking-wide mb-8 leading-tight">
              Un Héritage <br />
              <span className="font-serif italic text-gold-gradient">D'Élégance</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 lg:py-32 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl lg:text-4xl font-light text-brand-purple leading-relaxed tracking-wide"
          >
            "Nous croyons qu'un cadeau est plus qu'un objet. C'est une émotion, un souvenir, un témoignage de l'art d'offrir."
          </motion.p>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="w-16 h-px bg-brand-gold mx-auto mt-12"
          />
        </div>
      </section>

      {/* History */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden"
            >
              <img 
                src="https://picsum.photos/seed/abouthistory/800/1000" 
                alt="Marrakech Origins" 
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-brand-gold text-xs tracking-[0.3em] uppercase font-light mb-4 block">
                Les Origines
              </span>
              <h2 className="text-3xl lg:text-5xl font-light text-brand-purple tracking-wide mb-8">
                Né à Marrakech
              </h2>
              <div className="space-y-6 text-brand-purple/70 font-light leading-relaxed text-lg">
                <p>
                  Chocobox est né du désir d'élever le traditionnel échange de cadeaux marocain en un symbole mondial de luxe. Le mot "Chocobox" fait référence à un lieu de rassemblement et d'honneur pour les invités—un concept profondément ancré dans l'hospitalité arabe.
                </p>
                <p>
                  Nos fondateurs ont entrepris de capturer l'essence du Maghreb : le parfum enivrant de la fleur d'oranger dans les cours des riads, la chaleur dorée de l'huile d'argan et les précieux fils cramoisis du safran de Taliouine.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="py-24 bg-brand-purple text-brand-offwhite relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center flex-col-reverse lg:flex-row-reverse">
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden order-1 lg:order-2"
            >
              <img 
                src="https://picsum.photos/seed/aboutcraft/800/1000" 
                alt="Master Chocolatier" 
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <span className="text-brand-gold text-xs tracking-[0.3em] uppercase font-light mb-4 block">
                L'Artisanat
              </span>
              <h2 className="text-3xl lg:text-5xl font-light tracking-wide mb-8">
                Un Art Sans Compromis
              </h2>
              <div className="space-y-6 text-brand-lavender/70 font-light leading-relaxed text-lg">
                <p>
                  Nous nous associons exclusivement avec des fermes de cacao durables et des maîtres chocolatiers qui partagent notre dévouement à la perfection. Chaque ingrédient est sélectionné avec un soin obsessionnel.
                </p>
                <p>
                  Nos chocolats ne sont pas produits en masse. Ils sont fabriqués en petits lots, peints à la main et méticuleusement disposés dans nos boîtes de présentation emblématiques. Nous croyons que l'expérience du déballage doit être aussi époustouflante que le goût lui-même.
                </p>
              </div>
              <div className="mt-12">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-3 border border-brand-lavender/30 text-brand-offwhite px-8 py-4 rounded-full text-xs tracking-[0.2em] uppercase font-light hover:bg-brand-gold hover:border-brand-gold transition-all duration-300"
                >
                  Découvrez la Collection
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </main>
  );
}
