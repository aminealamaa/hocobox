"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Trash2, Gift, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/cart-store";

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalItems, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-purple/40 backdrop-blur-sm z-[80]"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[440px] bg-brand-offwhite z-[90] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-brand-lavender/15">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-brand-purple" />
                <h2 className="text-lg tracking-[0.1em] uppercase text-brand-purple font-light">
                  Votre Panier
                </h2>
                {totalItems > 0 && (
                  <span className="text-xs bg-brand-gold text-white px-2.5 py-0.5 rounded-full">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Fermer le panier"
                className="p-2 text-brand-purple/50 hover:text-brand-purple transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full px-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-brand-lavender/10 flex items-center justify-center mb-6">
                    <ShoppingBag className="w-8 h-8 text-brand-lavender/40" />
                  </div>
                  <h3 className="text-lg font-light text-brand-purple mb-2">
                    Votre panier est vide
                  </h3>
                  <p className="text-sm text-brand-purple/40 font-light mb-8 max-w-xs">
                    Découvrez nos chocolats de luxe artisanaux et trouvez le cadeau parfait.
                  </p>
                  <Link
                    href="/shop"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center gap-2 bg-brand-purple text-brand-offwhite px-8 py-3 rounded-2xl text-sm tracking-[0.1em] uppercase font-light hover:bg-brand-purple-light transition-colors"
                  >
                    Explorer la Collection
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  {items.map((item, i) => (
                    <motion.div
                      key={item.product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex gap-4 p-4 bg-white rounded-2xl border border-brand-lavender/10"
                    >
                      <div className="w-20 h-20 rounded-xl bg-brand-lavender/10 overflow-hidden shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="text-sm font-medium text-brand-purple truncate">
                              {item.product.name}
                            </h4>
                            <p className="text-xs text-brand-purple/40 mt-0.5">
                              {item.product.pieces} pièces
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            aria-label={`Supprimer ${item.product.name} du panier`}
                            className="p-1 text-brand-purple/30 hover:text-red-500 transition-colors shrink-0"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {item.personalMessage && (
                          <div className="flex items-center gap-1.5 mt-2 text-xs text-brand-gold">
                            <Gift className="w-3 h-3" />
                            <span className="truncate">{item.personalMessage}</span>
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-0.5 bg-brand-lavender/10 rounded-xl">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              aria-label="Diminuer la quantité"
                              className="p-1.5 text-brand-purple/50 hover:text-brand-purple transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-medium text-brand-purple w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              aria-label="Augmenter la quantité"
                              className="p-1.5 text-brand-purple/50 hover:text-brand-purple transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="text-sm font-medium text-brand-gold">
                            {item.product.price * item.quantity} MAD
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-brand-lavender/15 p-6 space-y-4">
                {/* Gift Message */}
                <div className="flex items-center gap-3 p-3.5 bg-brand-lavender/5 rounded-2xl border border-brand-lavender/10">
                  <Gift className="w-4 h-4 text-brand-gold shrink-0" />
                  <p className="text-xs text-brand-purple/50 font-light">
                    Emballage cadeau de luxe offert inclus
                  </p>
                </div>

                <div className="space-y-2 py-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-purple/50 font-light">Sous-total</span>
                    <span className="text-brand-purple font-medium">{totalPrice} MAD</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-purple/50 font-light">Livraison</span>
                    <span className="text-brand-purple/50 font-light text-xs">
                      {totalPrice >= 200 ? "Offert" : "25 MAD"}
                    </span>
                  </div>
                  <div className="flex justify-between text-base pt-2 border-t border-brand-lavender/10">
                    <span className="text-brand-purple font-medium">Total</span>
                    <span className="text-brand-gold font-semibold">
                      {totalPrice >= 200 ? totalPrice : totalPrice + 25} MAD
                    </span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="block w-full bg-brand-purple text-brand-offwhite text-center py-4 rounded-2xl text-sm tracking-[0.15em] uppercase font-light hover:bg-brand-purple-light transition-colors duration-300"
                >
                  Procéder au Paiement
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center py-2 text-xs tracking-[0.1em] uppercase text-brand-purple/50 hover:text-brand-purple transition-colors"
                >
                  Continuer vos Achats
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
