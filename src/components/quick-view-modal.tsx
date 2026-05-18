"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Star, Heart, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { Product } from "@/lib/data";
import { useCart } from "@/lib/cart-store";

interface QuickViewProps { product: Product | null; onClose: () => void; }

export function QuickViewModal({ product, onClose }: QuickViewProps) {
  const [qty, setQty] = React.useState(1);
  const { addItem, toggleWishlist, isInWishlist } = useCart();
  React.useEffect(() => { setQty(1); }, [product]);
  if (!product) return null;

  return (
    <AnimatePresence>
      {product && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-brand-purple/50 backdrop-blur-md" onClick={onClose} />
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }} transition={{ type: "spring", damping: 25 }}
            className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden">
            <button onClick={onClose} className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-brand-offwhite flex items-center justify-center text-brand-purple/50 hover:text-brand-purple">
              <X className="w-4 h-4" />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="aspect-square bg-brand-lavender/5 overflow-hidden">
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-brand-gold text-brand-gold" : "text-brand-lavender/30"}`} />
                  ))}
                  <span className="text-xs text-brand-purple/40 ml-1">({product.reviews})</span>
                </div>
                <h2 className="text-xl font-light text-brand-purple tracking-wide">{product.name}</h2>
                {product.nameAr && <p className="text-sm text-brand-gold/60 mt-1" dir="rtl">{product.nameAr}</p>}
                <p className="text-sm text-brand-purple/50 font-light leading-relaxed mt-4">{product.shortDescription}</p>
                <div className="flex items-center gap-3 mt-6">
                  <span className="text-2xl font-light text-brand-gold">{product.price} MAD</span>
                  {product.originalPrice && <span className="text-sm text-brand-purple/30 line-through">{product.originalPrice} MAD</span>}
                </div>
                <p className="text-xs text-brand-purple/40 mt-2">{product.pieces} pièces · {product.weight}</p>
                <div className="flex items-center gap-3 mt-6">
                  <div className="flex items-center bg-brand-lavender/10 rounded-2xl px-1">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2 text-brand-purple/50 hover:text-brand-purple"><Minus className="w-4 h-4" /></button>
                    <span className="w-8 text-center text-sm font-medium text-brand-purple">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="p-2 text-brand-purple/50 hover:text-brand-purple"><Plus className="w-4 h-4" /></button>
                  </div>
                  <button onClick={() => { addItem(product, qty); onClose(); }}
                    className="flex-1 bg-brand-purple text-brand-offwhite py-3.5 rounded-2xl text-sm tracking-[0.1em] uppercase font-medium flex items-center justify-center gap-2 hover:bg-brand-purple-light transition-colors">
                    <ShoppingBag className="w-5 h-5" /> Commander
                  </button>
                  <button onClick={() => toggleWishlist(product.id)}
                    className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-colors ${isInWishlist(product.id) ? "bg-brand-gold border-brand-gold text-white" : "border-brand-lavender/20 text-brand-purple/40 hover:text-brand-gold"}`}>
                    <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
                  </button>
                </div>
                <Link href={`/product/${product.id}`} onClick={onClose} className="text-xs text-brand-purple/40 hover:text-brand-gold mt-4 tracking-[0.1em] uppercase transition-colors inline-block">
                  Voir Tous les Détails →
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
