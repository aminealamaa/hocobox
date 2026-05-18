"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { getCollection, products, Product } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { QuickViewModal } from "@/components/quick-view-modal";

export default function CollectionDetail() {
  const params = useParams();
  const slug = params?.slug as string;
  const collection = getCollection(slug);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  if (!collection) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-32 bg-brand-offwhite">
        <h1 className="text-3xl font-light text-brand-purple mb-4">Collection Introuvable</h1>
        <p className="text-brand-purple/60">La collection que vous recherchez n'existe pas.</p>
      </div>
    );
  }

  const collectionProducts = products.filter((p) => p.collection === collection.id);

  return (
    <main className="flex-1 bg-brand-offwhite">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-brand-purple/60 z-10" />
          <img
            src={collection.image}
            alt={collection.name}
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
              La Collection
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-brand-offwhite tracking-wide mb-6">
              {collection.name}
            </h1>
            <p className="text-brand-lavender/80 font-light text-lg max-w-2xl mx-auto leading-relaxed">
              {collection.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {collectionProducts.map((product, i) => (
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

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </main>
  );
}
