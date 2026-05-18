"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart-store";
import Link from "next/link";
import { ArrowLeft, Lock, CreditCard, Gift, Truck } from "lucide-react";

export default function Checkout() {
  const { items, totalPrice } = useCart();
  const [step, setStep] = useState(1);

  if (items.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-32 bg-brand-offwhite">
        <h1 className="text-3xl font-light text-brand-purple mb-4">Votre Panier est Vide</h1>
        <p className="text-brand-purple/60 mb-8">Retournez à la boutique pour trouver le cadeau parfait.</p>
        <Link 
          href="/shop"
          className="bg-brand-purple text-brand-offwhite px-8 py-3 rounded-full text-xs tracking-[0.2em] uppercase font-light hover:bg-brand-purple-light transition-colors"
        >
          Continuer vos Achats
        </Link>
      </div>
    );
  }

  const deliveryFee = totalPrice >= 200 ? 0 : 25;
  const finalTotal = totalPrice + deliveryFee;

  return (
    <main className="flex-1 bg-brand-offwhite pt-8 pb-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <Link href="/shop" className="flex items-center gap-2 text-xs text-brand-purple/60 hover:text-brand-purple uppercase tracking-[0.1em] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour à la Boutique
          </Link>
          <div className="flex items-center gap-2 text-brand-gold">
            <Lock className="w-4 h-4" />
            <span className="text-xs uppercase tracking-[0.1em] font-medium">Paiement Sécurisé</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Form */}
          <div className="lg:col-span-7">
            {/* Steps Indicator */}
            <div className="flex items-center gap-4 mb-12 border-b border-brand-lavender/20 pb-6">
              <div className={`flex items-center gap-2 ${step >= 1 ? "text-brand-purple" : "text-brand-purple/30"}`}>
                <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs">1</span>
                <span className="text-xs uppercase tracking-[0.1em] font-medium">Détails</span>
              </div>
              <div className="h-px bg-brand-lavender/20 flex-1" />
              <div className={`flex items-center gap-2 ${step >= 2 ? "text-brand-purple" : "text-brand-purple/30"}`}>
                <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs">2</span>
                <span className="text-xs uppercase tracking-[0.1em] font-medium">Paiement</span>
              </div>
            </div>

            {step === 1 ? (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-2xl font-light text-brand-purple mb-6">Contact & Livraison</h2>
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                  
                  {/* Contact */}
                  <div className="bg-white p-6 rounded-3xl border border-brand-lavender/10 shadow-sm">
                    <h3 className="text-sm font-medium text-brand-purple uppercase tracking-[0.1em] mb-4">Informations de Contact</h3>
                    <div className="space-y-4">
                      <div>
                        <input type="email" placeholder="Adresse e-mail" required className="w-full border border-brand-lavender/30 rounded-xl px-4 py-3 bg-transparent focus:border-brand-purple outline-none transition-colors text-sm font-light" />
                      </div>
                      <div>
                        <input type="tel" placeholder="Numéro de téléphone" required className="w-full border border-brand-lavender/30 rounded-xl px-4 py-3 bg-transparent focus:border-brand-purple outline-none transition-colors text-sm font-light" />
                      </div>
                    </div>
                  </div>

                  {/* Delivery */}
                  <div className="bg-white p-6 rounded-3xl border border-brand-lavender/10 shadow-sm">
                    <h3 className="text-sm font-medium text-brand-purple uppercase tracking-[0.1em] mb-4">Adresse de Livraison</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="Prénom" required className="col-span-1 border border-brand-lavender/30 rounded-xl px-4 py-3 bg-transparent focus:border-brand-purple outline-none transition-colors text-sm font-light" />
                      <input type="text" placeholder="Nom" required className="col-span-1 border border-brand-lavender/30 rounded-xl px-4 py-3 bg-transparent focus:border-brand-purple outline-none transition-colors text-sm font-light" />
                      <input type="text" placeholder="Adresse" required className="col-span-2 border border-brand-lavender/30 rounded-xl px-4 py-3 bg-transparent focus:border-brand-purple outline-none transition-colors text-sm font-light" />
                      <input type="text" placeholder="Appartement, suite, etc. (optionnel)" className="col-span-2 border border-brand-lavender/30 rounded-xl px-4 py-3 bg-transparent focus:border-brand-purple outline-none transition-colors text-sm font-light" />
                      <input type="text" placeholder="Ville" required className="col-span-1 border border-brand-lavender/30 rounded-xl px-4 py-3 bg-transparent focus:border-brand-purple outline-none transition-colors text-sm font-light" />
                      <select className="col-span-1 border border-brand-lavender/30 rounded-xl px-4 py-3 bg-transparent focus:border-brand-purple outline-none transition-colors text-sm font-light appearance-none text-brand-purple/70">
                        <option>Émirats Arabes Unis</option>
                        <option>Arabie Saoudite</option>
                        <option>Qatar</option>
                        <option>Maroc</option>
                      </select>
                    </div>
                  </div>

                  {/* Delivery Method */}
                  <div className="bg-white p-6 rounded-3xl border border-brand-lavender/10 shadow-sm">
                    <h3 className="text-sm font-medium text-brand-purple uppercase tracking-[0.1em] mb-4">Méthode de Livraison</h3>
                    <div className="border border-brand-gold rounded-xl p-4 bg-brand-gold/5 flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="w-5 h-5 rounded-full border-[5px] border-brand-gold flex items-center justify-center" />
                        <div>
                          <p className="text-sm font-medium text-brand-purple flex items-center gap-2">
                            <Truck className="w-4 h-4" /> Livraison sous Température Contrôlée
                          </p>
                          <p className="text-xs text-brand-purple/60 mt-1 font-light">1-2 Jours Ouvrables</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-brand-gold">{deliveryFee === 0 ? "Offert" : `${deliveryFee} MAD`}</span>
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-brand-purple text-brand-offwhite py-4 rounded-xl text-xs tracking-[0.2em] uppercase font-light hover:bg-brand-purple-light transition-colors shadow-lg shadow-brand-purple/20">
                    Continuer vers le Paiement
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-2xl font-light text-brand-purple mb-6">Paiement</h2>
                <div className="bg-white p-6 rounded-3xl border border-brand-lavender/10 shadow-sm mb-6">
                  <div className="space-y-4">
                    <label className="flex items-center justify-between p-4 border border-brand-gold rounded-xl bg-brand-gold/5 cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="w-5 h-5 rounded-full border-[5px] border-brand-gold flex items-center justify-center" />
                        <span className="text-sm font-medium text-brand-purple flex items-center gap-2">
                          <CreditCard className="w-4 h-4" /> Carte de Crédit
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <div className="w-8 h-5 bg-brand-lavender/20 rounded text-[8px] flex items-center justify-center text-brand-purple/50">VISA</div>
                        <div className="w-8 h-5 bg-brand-lavender/20 rounded text-[8px] flex items-center justify-center text-brand-purple/50">MC</div>
                      </div>
                    </label>
                  </div>

                  {/* Dummy Card Form */}
                  <div className="mt-6 space-y-4 border-t border-brand-lavender/10 pt-6">
                    <input type="text" placeholder="Numéro de Carte" className="w-full border border-brand-lavender/30 rounded-xl px-4 py-3 bg-transparent focus:border-brand-purple outline-none transition-colors text-sm font-light" />
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="MM/AA" className="border border-brand-lavender/30 rounded-xl px-4 py-3 bg-transparent focus:border-brand-purple outline-none transition-colors text-sm font-light" />
                      <input type="text" placeholder="CVC" className="border border-brand-lavender/30 rounded-xl px-4 py-3 bg-transparent focus:border-brand-purple outline-none transition-colors text-sm font-light" />
                    </div>
                    <input type="text" placeholder="Nom sur la Carte" className="w-full border border-brand-lavender/30 rounded-xl px-4 py-3 bg-transparent focus:border-brand-purple outline-none transition-colors text-sm font-light" />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="px-6 py-4 rounded-xl border border-brand-lavender/30 text-xs tracking-[0.2em] uppercase font-light text-brand-purple hover:bg-white transition-colors">
                    Retour
                  </button>
                  <button className="flex-1 bg-brand-gold text-white py-4 rounded-xl text-xs tracking-[0.2em] uppercase font-medium hover:bg-brand-gold-light transition-colors shadow-lg shadow-brand-gold/20 flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4" /> Payer {finalTotal} MAD
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl border border-brand-lavender/20 p-6 lg:p-8 sticky top-24 shadow-xl shadow-brand-purple/5">
              <h2 className="text-lg font-light text-brand-purple tracking-wide mb-6 pb-4 border-b border-brand-lavender/20">
                Résumé de la Commande
              </h2>

              <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="w-16 h-16 rounded-xl bg-brand-lavender/5 overflow-hidden shrink-0 border border-brand-lavender/10 relative">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                      <span className="absolute -top-1 -right-1 bg-brand-purple text-white w-4 h-4 rounded-full text-[10px] flex items-center justify-center z-10">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-brand-purple truncate">{item.product.name}</h4>
                      <p className="text-xs text-brand-purple/50">{item.product.pieces} pièces</p>
                      {item.personalMessage && (
                        <p className="text-[10px] text-brand-gold mt-1 flex items-center gap-1">
                          <Gift className="w-3 h-3" /> Message cadeau inclus
                        </p>
                      )}
                    </div>
                    <span className="text-sm font-medium text-brand-gold shrink-0">
                      {item.product.price * item.quantity} MAD
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-brand-lavender/20 pt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-brand-purple/60 font-light">Sous-total</span>
                  <span className="text-brand-purple font-medium">{totalPrice} MAD</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-purple/60 font-light">Livraison</span>
                  <span className="text-brand-purple font-medium">
                    {deliveryFee === 0 ? <span className="text-brand-gold">Offert</span> : `${deliveryFee} MAD`}
                  </span>
                </div>
                <div className="flex justify-between text-lg pt-4 border-t border-brand-lavender/20 mt-4">
                  <span className="text-brand-purple font-light">Total</span>
                  <div className="text-right">
                    <span className="text-brand-gold font-medium block">{finalTotal} MAD</span>
                    <span className="text-xs text-brand-purple/40 font-light">TVA incluse</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
