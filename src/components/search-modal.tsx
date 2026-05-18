"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { searchProducts, Product } from "@/lib/data";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.length >= 2) {
      setResults(searchProducts(query));
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-start justify-center pt-[15vh]"
        >
          <div
            className="absolute inset-0 bg-brand-purple/50 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl mx-4 bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center gap-4 px-8 py-6 border-b border-brand-lavender/20">
              <Search className="w-5 h-5 text-brand-purple/40 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Recherchez dans nos collections..."
                className="flex-1 text-lg font-light text-brand-purple bg-transparent outline-none placeholder:text-brand-purple/30"
              />
              <button
                onClick={onClose}
                className="p-1.5 text-brand-purple/40 hover:text-brand-purple transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[50vh] overflow-y-auto">
              {results.length > 0 ? (
                <div className="p-4">
                  <p className="text-[11px] tracking-[0.15em] uppercase text-brand-purple/40 px-4 mb-3">
                    {results.length} résultat{results.length !== 1 && "s"}
                  </p>
                  {results.map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={`/product/${product.id}`}
                        onClick={onClose}
                        className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-brand-lavender/10 transition-colors group"
                      >
                        <div className="w-14 h-14 rounded-xl bg-brand-lavender/10 overflow-hidden shrink-0">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-brand-purple truncate">
                            {product.name}
                          </h4>
                          <p className="text-xs text-brand-purple/50 mt-0.5">
                            {product.pieces} pièces · {product.weight}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-brand-gold">
                            {product.price} MAD
                          </span>
                          <ArrowRight className="w-4 h-4 text-brand-purple/20 group-hover:text-brand-gold transition-colors" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : query.length >= 2 ? (
                <div className="p-12 text-center">
                  <p className="text-brand-purple/40 text-sm font-light">
                    Aucun produit trouvé pour &ldquo;{query}&rdquo;
                  </p>
                </div>
              ) : (
                <div className="p-8">
                  <p className="text-[11px] tracking-[0.15em] uppercase text-brand-purple/40 mb-4">
                    Recherches Populaires
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Safran", "Aïd", "Truffes", "Chocolat Noir", "Coffret Cadeau", "Rose"].map(
                      (term) => (
                        <button
                          key={term}
                          onClick={() => setQuery(term)}
                          className="px-4 py-2 rounded-full bg-brand-lavender/10 text-xs tracking-[0.1em] uppercase text-brand-purple/60 hover:bg-brand-lavender/20 hover:text-brand-purple transition-all"
                        >
                          {term}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
