"use client";

import React, { Suspense, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Gift, CheckCircle, Truck, Phone, ShoppingBag } from "lucide-react";
import * as fpixel from "@/lib/fpixel";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const hasFiredPixel = useRef(false);

  const orderId = searchParams.get("order") || "";
  const total = searchParams.get("total") || "0";
  const itemCount = searchParams.get("items") || "1";

  // Fire Meta Pixel Purchase event ONCE on page load
  useEffect(() => {
    if (hasFiredPixel.current) return;
    hasFiredPixel.current = true;

    fpixel.event("Purchase", {
      value: parseFloat(total),
      currency: "MAD",
      content_type: "product",
      num_items: parseInt(itemCount),
      order_id: orderId,
    });
  }, [total, itemCount, orderId]);

  return (
    <main className="flex-1 bg-brand-offwhite min-h-screen flex items-center justify-center py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-lg w-full"
      >
        {/* Success Card */}
        <div className="bg-white rounded-[2rem] border border-brand-lavender/10 shadow-2xl shadow-brand-purple/5 overflow-hidden">
          
          {/* Gold Header Strip */}
          <div className="bg-gradient-to-r from-brand-gold via-brand-gold-light to-brand-gold h-1.5" />

          <div className="p-8 md:p-12 text-center">
            {/* Animated Check Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
              className="w-20 h-20 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-brand-gold/20"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
              >
                <CheckCircle className="w-10 h-10 text-brand-gold" />
              </motion.div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-3xl md:text-4xl font-serif text-brand-purple tracking-wide mb-3"
            >
              Merci pour votre commande
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-brand-purple/60 font-light leading-relaxed mb-8 text-sm md:text-base"
            >
              Votre commande a été confirmée avec succès. Notre équipe vous contactera sous peu pour organiser la livraison.
            </motion.p>

            {/* Order Summary Box */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="bg-brand-offwhite rounded-2xl p-6 mb-8 border border-brand-lavender/10"
            >
              {orderId && (
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs uppercase tracking-[0.1em] text-brand-purple/40 font-medium">N° Commande</span>
                  <span className="text-sm font-medium text-brand-purple">#CH-{orderId.slice(-6).toUpperCase()}</span>
                </div>
              )}
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs uppercase tracking-[0.1em] text-brand-purple/40 font-medium">Articles</span>
                <span className="text-sm font-medium text-brand-purple">{itemCount} article{parseInt(itemCount) > 1 ? "s" : ""}</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-brand-lavender/15">
                <span className="text-xs uppercase tracking-[0.1em] text-brand-purple/40 font-medium">Montant Total</span>
                <span className="text-xl font-medium text-brand-gold">{total} MAD</span>
              </div>
            </motion.div>

            {/* Info Steps */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
            >
              <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-brand-lavender/5 border border-brand-lavender/10">
                <Phone className="w-5 h-5 text-brand-gold" />
                <span className="text-[11px] text-brand-purple/60 font-light text-center">Confirmation par téléphone</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-brand-lavender/5 border border-brand-lavender/10">
                <Gift className="w-5 h-5 text-brand-gold" />
                <span className="text-[11px] text-brand-purple/60 font-light text-center">Emballage cadeau premium</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-brand-lavender/5 border border-brand-lavender/10">
                <Truck className="w-5 h-5 text-brand-gold" />
                <span className="text-[11px] text-brand-purple/60 font-light text-center">Livraison sous 1-2 jours</span>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Link
                href="/shop"
                className="w-full bg-brand-purple text-brand-offwhite py-4 rounded-xl text-xs tracking-[0.2em] uppercase font-light hover:bg-brand-purple-light transition-colors flex items-center justify-center gap-3 shadow-lg shadow-brand-purple/20"
              >
                <ShoppingBag className="w-4 h-4" />
                Continuer vos Achats
              </Link>
            </motion.div>
          </div>
        </div>

        {/* WhatsApp support note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center text-xs text-brand-purple/40 font-light mt-6"
        >
          Des questions ? Contactez-nous sur{" "}
          <a href="https://wa.me/+212725730083" target="_blank" rel="noopener noreferrer" className="text-brand-gold underline hover:text-brand-gold-light transition-colors">
            WhatsApp
          </a>
        </motion.p>
      </motion.div>
    </main>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <main className="flex-1 bg-brand-offwhite min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-brand-purple border-t-transparent animate-spin" />
          <p className="text-brand-purple/60 font-light tracking-widest text-xs uppercase animate-pulse">Chargement...</p>
        </div>
      </main>
    }>
      <ThankYouContent />
    </Suspense>
  );
}
