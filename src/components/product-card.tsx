"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Eye, Star } from "lucide-react";
import { Product } from "@/lib/data";
import { useCart } from "@/lib/cart-store";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
  index?: number;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, index = 0, onQuickView }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addItem, toggleWishlist, isInWishlist } = useCart();
  const wishlisted = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-3xl bg-brand-lavender/5 aspect-[3/4]">
        {/* Shimmer */}
        {!imageLoaded && <div className="absolute inset-0 shimmer" />}

        <Link href={`/product/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <Badge className="bg-brand-purple text-brand-offwhite text-[10px] tracking-[0.1em] uppercase px-3 py-1 rounded-full border-0">
              Nouveau
            </Badge>
          )}
          {product.isBestseller && (
            <Badge className="bg-brand-gold text-white text-[10px] tracking-[0.1em] uppercase px-3 py-1 rounded-full border-0">
              Meilleure Vente
            </Badge>
          )}
          {product.isLimited && (
            <Badge className="bg-red-900/80 text-white text-[10px] tracking-[0.1em] uppercase px-3 py-1 rounded-full border-0">
              Limité
            </Badge>
          )}
          {product.originalPrice && (
            <Badge className="bg-brand-lavender text-brand-purple text-[10px] tracking-[0.1em] uppercase px-3 py-1 rounded-full border-0">
              Soldes
            </Badge>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleWishlist(product.id)}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors shadow-lg ${
              wishlisted
                ? "bg-brand-gold text-white"
                : "bg-white/90 text-brand-purple/60 hover:text-brand-gold"
            }`}
          >
            <Heart className={`w-4 h-4 ${wishlisted ? "fill-current" : ""}`} />
          </motion.button>
          {onQuickView && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onQuickView(product)}
              className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-brand-purple/60 hover:text-brand-purple transition-colors shadow-lg"
            >
              <Eye className="w-4 h-4" />
            </motion.button>
          )}
        </div>

        {/* Add to Cart */}
        <motion.div
          className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-3 group-hover:translate-y-0"
        >
          <button
            onClick={() => addItem(product)}
            className="w-full glass-dark text-brand-offwhite py-3 rounded-2xl text-sm tracking-[0.1em] uppercase font-medium flex items-center justify-center gap-2 hover:bg-brand-purple transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            Commander
          </button>
        </motion.div>
      </div>

      <div className="mt-5 px-1">
        <Link href={`/product/${product.id}`} className="group/link">
          <h3 className="text-xl md:text-2xl font-serif text-brand-purple group-hover/link:text-brand-gold transition-colors duration-300">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-brand-purple/40 mt-1 font-light">
          {product.shortDescription}
        </p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-brand-gold">
              {product.price} MAD
            </span>
            {product.originalPrice && (
              <span className="text-xs text-brand-purple/30 line-through">
                {product.originalPrice} MAD
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-brand-gold text-brand-gold" />
            <span className="text-xs text-brand-purple/50">{product.rating}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
