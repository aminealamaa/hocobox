"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart-store";
import Link from "next/link";
import { ArrowLeft, Lock, CreditCard, Gift, Truck } from "lucide-react";
import * as fpixel from "@/lib/fpixel";

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [purchaseAmount, setPurchaseAmount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    country: "Maroc",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Track InitiateCheckout conversion when user loads the page with items in cart
  useEffect(() => {
    if (items.length > 0) {
      fpixel.event("InitiateCheckout", {
        content_ids: items.map((item) => item.product.id),
        num_items: items.reduce((sum, item) => sum + item.quantity, 0),
        value: totalPrice,
        currency: "MAD",
      });
    }
  }, []);

  const deliveryFee = totalPrice >= 200 ? 0 : 25;
  const finalTotal = totalPrice + deliveryFee;

  const handlePayment = async () => {
    setIsSubmitting(true);
    try {
      const orderItems = items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      }));

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: `${formData.firstName} ${formData.lastName}`,
          phone: formData.phone,
          address: formData.apartment ? `${formData.address}, ${formData.apartment}` : formData.address,
          city: formData.city,
          total: finalTotal,
          notes: `Email: ${formData.email} | Pays: ${formData.country}`,
          items: orderItems,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save order to database");
      }

      // Save total price for the success screen
      setPurchaseAmount(finalTotal);

      // Track standard Purchase event with Meta Pixel
      fpixel.event("Purchase", {
        value: finalTotal,
        currency: "MAD",
        content_ids: items.map((item) => item.product.id),
        content_type: "product",
        num_items: items.reduce((sum, item) => sum + item.quantity, 0),
      });

      // Clear the cart
      clearCart();

      // Advance to order success step
      setStep(3);
    } catch (err) {
      console.error("Order submission error:", err);
      alert("Une erreur est survenue lors de l'enregistrement de votre commande. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0 && step !== 3) {
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

  if (step === 3) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 px-6 bg-brand-offwhite">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-md w-full bg-white p-8 rounded-3xl border border-brand-lavender/10 shadow-xl text-center"
        >
          <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center text-brand-gold mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-3xl font-light text-brand-purple mb-4">Commande Confirmée</h1>
          <p className="text-brand-purple/70 text-sm mb-6 leading-relaxed font-light">
            Merci pour votre confiance. Votre commande a été enregistrée avec succès sous le numéro <strong>#CH-{Math.floor(100000 + Math.random() * 900000)}</strong>.
          </p>
          <div className="bg-brand-offwhite p-5 rounded-2xl mb-8 text-left border border-brand-lavender/10">
            <h4 className="text-xs uppercase tracking-[0.1em] font-medium text-brand-purple/60 mb-2">Résumé du Paiement</h4>
            <div className="flex justify-between text-sm font-medium text-brand-purple">
              <span className="font-light">Montant Payé</span>
              <span className="text-brand-gold font-semibold">{purchaseAmount} MAD</span>
            </div>
          </div>
          <Link 
            href="/shop"
            className="w-full bg-brand-purple text-brand-offwhite py-4 rounded-xl text-xs tracking-[0.2em] uppercase font-light hover:bg-brand-purple-light transition-colors block text-center shadow-lg shadow-brand-purple/20"
          >
            Continuer vos Achats
          </Link>
        </motion.div>
      </div>
    );
  }

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
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Adresse e-mail" 
                          required 
                          className="w-full border border-brand-lavender/30 rounded-xl px-4 py-3 bg-transparent focus:border-brand-purple outline-none transition-colors text-sm font-light" 
                        />
                      </div>
                      <div>
                        <input 
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Numéro de téléphone" 
                          required 
                          className="w-full border border-brand-lavender/30 rounded-xl px-4 py-3 bg-transparent focus:border-brand-purple outline-none transition-colors text-sm font-light" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Delivery */}
                  <div className="bg-white p-6 rounded-3xl border border-brand-lavender/10 shadow-sm">
                    <h3 className="text-sm font-medium text-brand-purple uppercase tracking-[0.1em] mb-4">Adresse de Livraison</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Prénom" 
                        required 
                        className="col-span-1 border border-brand-lavender/30 rounded-xl px-4 py-3 bg-transparent focus:border-brand-purple outline-none transition-colors text-sm font-light" 
                      />
                      <input 
                        type="text" 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Nom" 
                        required 
                        className="col-span-1 border border-brand-lavender/30 rounded-xl px-4 py-3 bg-transparent focus:border-brand-purple outline-none transition-colors text-sm font-light" 
                      />
                      <input 
                        type="text" 
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Adresse" 
                        required 
                        className="col-span-2 border border-brand-lavender/30 rounded-xl px-4 py-3 bg-transparent focus:border-brand-purple outline-none transition-colors text-sm font-light" 
                      />
                      <input 
                        type="text" 
                        name="apartment"
                        value={formData.apartment}
                        onChange={handleChange}
                        placeholder="Appartement, suite, etc. (optionnel)" 
                        className="col-span-2 border border-brand-lavender/30 rounded-xl px-4 py-3 bg-transparent focus:border-brand-purple outline-none transition-colors text-sm font-light" 
                      />
                      <input 
                        type="text" 
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Ville" 
                        required 
                        className="col-span-1 border border-brand-lavender/30 rounded-xl px-4 py-3 bg-transparent focus:border-brand-purple outline-none transition-colors text-sm font-light" 
                      />
                      <select 
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="col-span-1 border border-brand-lavender/30 rounded-xl px-4 py-3 bg-transparent focus:border-brand-purple outline-none transition-colors text-sm font-light appearance-none text-brand-purple/70"
                      >
                        <option value="Émirats Arabes Unis">Émirats Arabes Unis</option>
                        <option value="Arabie Saoudite">Arabie Saoudite</option>
                        <option value="Qatar">Qatar</option>
                        <option value="Maroc">Maroc</option>
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
                  <button onClick={() => setStep(1)} disabled={isSubmitting} className="px-6 py-4 rounded-xl border border-brand-lavender/30 text-xs tracking-[0.2em] uppercase font-light text-brand-purple hover:bg-white transition-colors disabled:opacity-50">
                    Retour
                  </button>
                  <button 
                    onClick={handlePayment}
                    disabled={isSubmitting}
                    className="flex-1 bg-brand-gold text-white py-4 rounded-xl text-xs tracking-[0.2em] uppercase font-medium hover:bg-brand-gold-light transition-colors shadow-lg shadow-brand-gold/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Lock className="w-4 h-4" /> {isSubmitting ? "Traitement..." : `Payer ${finalTotal} MAD`}
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

