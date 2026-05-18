"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { collections } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export default function CollectionsPage() {
  return (
    <main className="flex-1 bg-brand-offwhite">
      {/* Header */}
      <section className="bg-brand-purple pt-32 pb-20 px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-brand-offwhite tracking-wide mb-6"
          >
            Collections <span className="font-serif italic text-gold-gradient">Sélectionnées</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-brand-lavender/80 font-light text-lg"
          >
            Découvrez nos assortiments méticuleusement sélectionnés, chacun conçu pour un moment de luxe spécifique.
          </motion.p>
        </div>
      </section>

      {/* Collections List */}
      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
        {collections.map((collection, i) => (
          <div key={collection.id} className={`flex flex-col lg:flex-row gap-12 lg:gap-24 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
            
            <motion.div 
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex-1 w-full"
            >
              <div className="relative aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden group">
                <div className="absolute inset-0 bg-brand-purple/20 group-hover:bg-brand-purple/10 transition-colors duration-500 z-10" />
                <img 
                  src={collection.image} 
                  alt={collection.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex-1"
            >
              <span className="text-brand-gold text-xs tracking-[0.3em] uppercase font-light mb-4 block">
                {collection.productCount} Chefs-d'œuvre
              </span>
              <h2 className="text-3xl lg:text-5xl font-light text-brand-purple tracking-wide mb-6">
                {collection.name}
              </h2>
              <p className="text-brand-purple/60 font-light leading-relaxed text-lg mb-8 max-w-lg">
                {collection.description}
              </p>
              <Link
                href={`/collections/${collection.slug}`}
                className="inline-flex items-center gap-3 border border-brand-purple text-brand-purple px-8 py-4 rounded-full text-xs tracking-[0.2em] uppercase font-light hover:bg-brand-purple hover:text-brand-offwhite transition-all duration-300"
              >
                Explorer la Collection
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

          </div>
        ))}
      </section>
    </main>
  );
}
