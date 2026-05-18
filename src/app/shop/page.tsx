"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { products, collections, Product } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { QuickViewModal } from "@/components/quick-view-modal";

export default function Shop() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [activeCollection, setActiveCollection] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((p) => {
    const matchesCollection = activeCollection === "all" || p.collection === activeCollection;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCollection && matchesSearch;
  });

  return (
    <main className="flex-1 bg-brand-offwhite">
      {/* Header */}
      <section className="bg-brand-purple pt-32 pb-20 px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/shopheader/1920/400')] opacity-20 mix-blend-overlay object-cover" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-brand-offwhite tracking-wide mb-6"
          >
            Notre <span className="font-serif italic text-gold-gradient">Collection</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-brand-lavender/80 font-light text-lg"
          >
            Explorez nos chocolats méticuleusement fabriqués à la main, où l'héritage marocain rencontre le luxe moderne.
          </motion.p>
        </div>
      </section>

      {/* Shop Controls */}
      <section className="sticky top-[72px] z-40 bg-brand-offwhite/95 backdrop-blur-md border-b border-brand-lavender/20 py-4 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
            <button
              onClick={() => setActiveCollection("all")}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-xs tracking-[0.15em] uppercase font-medium transition-colors ${
                activeCollection === "all" 
                  ? "bg-brand-purple text-brand-offwhite" 
                  : "bg-white text-brand-purple hover:bg-brand-lavender/20"
              }`}
            >
              Tous les Chefs-d'œuvre
            </button>
            {collections.map(c => (
              <button
                key={c.id}
                onClick={() => setActiveCollection(c.id)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-xs tracking-[0.15em] uppercase font-medium transition-colors ${
                  activeCollection === c.id 
                    ? "bg-brand-purple text-brand-offwhite" 
                    : "bg-white text-brand-purple hover:bg-brand-lavender/20"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Filters & Search */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-purple/40" />
              <input 
                type="text"
                placeholder="Rechercher des produits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-brand-lavender/20 rounded-full pl-10 pr-4 py-2 text-sm font-light text-brand-purple placeholder:text-brand-purple/40 outline-none focus:border-brand-purple/30 transition-colors"
              />
            </div>
            <button className="flex items-center gap-2 bg-white border border-brand-lavender/20 px-4 py-2 rounded-full text-xs tracking-[0.1em] uppercase font-medium text-brand-purple hover:bg-brand-lavender/10 transition-colors">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Filtres</span>
            </button>
          </div>

        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16 px-6 lg:px-8 min-h-[50vh]">
        <div className="max-w-7xl mx-auto">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={i}
                  onQuickView={setQuickViewProduct}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-32">
              <h3 className="text-2xl font-light text-brand-purple mb-4">Aucun chef-d'œuvre trouvé</h3>
              <p className="text-brand-purple/60 font-light">
                Essayez d'ajuster votre recherche ou explorez nos autres collections.
              </p>
              <button 
                onClick={() => {setSearchQuery(""); setActiveCollection("all");}}
                className="mt-8 text-xs tracking-[0.2em] uppercase font-medium text-brand-gold hover:text-brand-purple transition-colors border-b border-brand-gold hover:border-brand-purple pb-1"
              >
                Effacer les Filtres
              </button>
            </div>
          )}
        </div>
      </section>

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </main>
  );
}
