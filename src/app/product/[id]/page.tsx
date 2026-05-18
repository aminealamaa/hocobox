"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Heart, Minus, Plus, Star, Gift, Truck, ShieldCheck, Check, X } from "lucide-react";
import { getProduct, getRelatedProducts } from "@/lib/data";
import { useCart } from "@/lib/cart-store";
import { ProductCard } from "@/components/product-card";

export default function ProductPage() {
  const params = useParams();
  const id = params?.id as string;
  const product = getProduct(id);
  const relatedProducts = getRelatedProducts(id, 4);
  
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [personalMessage, setPersonalMessage] = useState("");
  const [addGiftMessage, setAddGiftMessage] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  
  const { addItem, toggleWishlist, isInWishlist } = useCart();

  if (!product) {
    return (
      <div className="flex-1 flex items-center justify-center py-32">
        <div className="text-center">
          <h1 className="text-2xl text-brand-purple font-light mb-4">Produit Introuvable</h1>
          <p className="text-brand-purple/60">La pièce exquise que vous recherchez est actuellement indisponible.</p>
        </div>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);

  return (
    <main className="flex-1 bg-brand-offwhite pb-24">
      {/* Product Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Images */}
          <div className="flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="aspect-square rounded-3xl overflow-hidden bg-brand-lavender/5"
            >
              <img 
                src={product.images[activeImage]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                    activeImage === idx ? "border-brand-gold" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Badges & Rating */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-2">
                  {product.isBestseller && <span className="bg-brand-gold text-white text-[10px] tracking-[0.1em] uppercase px-3 py-1 rounded-full">Meilleure Vente</span>}
                  {product.isNew && <span className="bg-brand-purple text-brand-offwhite text-[10px] tracking-[0.1em] uppercase px-3 py-1 rounded-full">Nouveauté</span>}
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? "fill-brand-gold text-brand-gold" : "text-brand-lavender/30"}`} />
                    ))}
                  </div>
                  <span className="text-xs text-brand-purple/50 font-light">({product.reviews} avis)</span>
                </div>
              </div>

              {/* Title & Price */}
              <h1 className="text-4xl lg:text-5xl font-serif text-brand-purple tracking-wide mb-2 leading-tight">{product.name}</h1>
              {product.nameAr && <p className="text-2xl font-serif text-brand-gold/80 mb-6" dir="rtl">{product.nameAr}</p>}
              
              <div className="flex items-end gap-4 mb-8 pb-8 border-b border-brand-lavender/20">
                <span className="text-3xl font-light text-brand-gold">{product.price} MAD</span>
                {product.originalPrice && <span className="text-lg text-brand-purple/30 line-through mb-1">{product.originalPrice} MAD</span>}
              </div>

              {/* Description */}
              <p className="text-brand-purple/70 font-light leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-4 rounded-2xl border border-brand-lavender/10">
                  <span className="block text-[10px] tracking-[0.1em] uppercase text-brand-purple/40 mb-1">Contenu</span>
                  <span className="text-sm text-brand-purple font-medium">{product.pieces} Pièces Exquises</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-brand-lavender/10">
                  <span className="block text-[10px] tracking-[0.1em] uppercase text-brand-purple/40 mb-1">Poids Net</span>
                  <span className="text-sm text-brand-purple font-medium">{product.weight}</span>
                </div>
              </div>

              {/* Personalization */}
              <div className="mb-8 p-5 bg-brand-lavender/5 rounded-2xl border border-brand-lavender/10">
                <button 
                  onClick={() => setAddGiftMessage(!addGiftMessage)}
                  className="flex items-center justify-between w-full"
                >
                  <div className="flex items-center gap-3">
                    <Gift className="w-5 h-5 text-brand-gold" />
                    <span className="text-sm font-medium text-brand-purple">Ajouter un message cadeau personnel</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${addGiftMessage ? "bg-brand-gold border-brand-gold text-white" : "border-brand-purple/20"}`}>
                    {addGiftMessage && <Check className="w-3 h-3" />}
                  </div>
                </button>
                {addGiftMessage && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 pt-4 border-t border-brand-lavender/10"
                  >
                    <textarea 
                      value={personalMessage}
                      onChange={(e) => setPersonalMessage(e.target.value)}
                      placeholder="Écrivez votre message ici. Il sera manuscrit sur une carte de luxe..."
                      className="w-full bg-white border border-brand-lavender/20 rounded-xl p-3 text-sm font-light text-brand-purple outline-none focus:border-brand-gold resize-none h-24"
                    />
                  </motion.div>
                )}
              </div>

              {/* Actions */}
              {!showCheckout ? (
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                  <div className="flex items-center justify-between w-full sm:w-32 bg-white border border-brand-lavender/20 rounded-2xl px-2 h-14">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 text-brand-purple/50 hover:text-brand-purple transition-colors"><Minus className="w-4 h-4" /></button>
                    <span className="text-sm font-medium text-brand-purple">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="p-3 text-brand-purple/50 hover:text-brand-purple transition-colors"><Plus className="w-4 h-4" /></button>
                  </div>

                  <button 
                    onClick={() => setShowCheckout(true)}
                    className="flex-1 w-full bg-brand-gold text-white h-14 rounded-2xl text-sm md:text-base tracking-[0.1em] uppercase font-medium flex items-center justify-center gap-3 hover:bg-brand-gold-light transition-all shadow-lg shadow-brand-gold/20"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Commander Maintenant
                  </button>

                  <button 
                    onClick={() => toggleWishlist(product.id)}
                    className={`w-14 h-14 shrink-0 rounded-2xl border flex items-center justify-center transition-all ${
                      wishlisted 
                        ? "bg-brand-purple border-brand-purple text-white shadow-lg shadow-brand-purple/20" 
                        : "bg-white border-brand-lavender/20 text-brand-purple/40 hover:text-brand-gold hover:border-brand-gold/30"
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${wishlisted ? "fill-current" : ""}`} />
                  </button>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mb-8 bg-white p-6 rounded-3xl border border-brand-gold shadow-lg shadow-brand-gold/10"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-brand-purple flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-brand-gold" />
                      Paiement Express
                    </h3>
                    <button onClick={() => setShowCheckout(false)} className="text-xs text-brand-purple/50 hover:text-brand-purple underline uppercase tracking-[0.1em]">Annuler</button>
                  </div>
                  
                  <form onSubmit={(e) => { e.preventDefault(); setShowThankYou(true); setShowCheckout(false); }} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="Prénom" required className="w-full border border-brand-lavender/30 rounded-xl px-4 py-3 bg-brand-offwhite focus:border-brand-gold outline-none transition-colors text-sm font-light" />
                      <input type="text" placeholder="Nom" required className="w-full border border-brand-lavender/30 rounded-xl px-4 py-3 bg-brand-offwhite focus:border-brand-gold outline-none transition-colors text-sm font-light" />
                    </div>
                    <input type="tel" placeholder="Numéro de Téléphone" required className="w-full border border-brand-lavender/30 rounded-xl px-4 py-3 bg-brand-offwhite focus:border-brand-gold outline-none transition-colors text-sm font-light" />
                    <textarea placeholder="Adresse de Livraison" required rows={2} className="w-full border border-brand-lavender/30 rounded-xl px-4 py-3 bg-brand-offwhite focus:border-brand-gold outline-none transition-colors text-sm font-light resize-none" />
                    
                    <div className="flex items-center justify-between py-4 border-y border-brand-lavender/20 my-4">
                      <span className="text-sm font-light text-brand-purple">Montant Total</span>
                      <span className="text-xl font-medium text-brand-gold">{product.price * qty} MAD</span>
                    </div>

                    <button type="submit" className="w-full bg-brand-purple text-brand-offwhite h-14 rounded-2xl text-xs tracking-[0.2em] uppercase font-light flex items-center justify-center gap-3 hover:bg-brand-purple-light transition-all shadow-lg shadow-brand-purple/20">
                      Passer la Commande (Paiement à la Livraison)
                    </button>
                  </form>
                </motion.div>
              )}

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 py-6 border-t border-brand-lavender/20">
                <div className="flex items-center gap-3">
                  <Truck className="w-4 h-4 text-brand-gold" />
                  <span className="text-xs text-brand-purple/60 font-light">Livraison sous température contrôlée</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-brand-gold" />
                  <span className="text-xs text-brand-purple/60 font-light">Paiement 100% Sécurisé</span>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* Ingredients & Details */}
      <section className="bg-white py-16 border-y border-brand-lavender/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-lg font-light text-brand-purple tracking-wide mb-6">Ingrédients d'Exception</h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing, i) => (
                  <span key={i} className="bg-brand-offwhite px-4 py-2 rounded-full text-xs text-brand-purple/70 font-light border border-brand-lavender/20">
                    {ing}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-light text-brand-purple tracking-wide mb-6">Informations sur les Allergènes</h3>
              <p className="text-sm text-brand-purple/60 font-light leading-relaxed">
                Contient du lait, du soja et des noix. Peut contenir des traces de gluten. Préparé dans une installation qui manipule des arachides, des noix et des produits laitiers. Pour des exigences alimentaires spécifiques, veuillez contacter notre équipe de conciergerie.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Experience - Vertical Stack */}
      <section className="bg-brand-offwhite">
        <div className="flex flex-col">
          {(product.id === "1" 
            ? [
                { img: "/images/pralines-inside.jpeg", type: "lifestyle" },
                { img: "/images/royal-chocobox-review.jpeg", type: "screenshot" },
                { img: "/images/review-2.jpeg", type: "screenshot" },
                { img: "/images/review-3.jpeg", type: "screenshot" },
              ]
            : [
                { img: "https://picsum.photos/seed/chocoreview1/1200/800", type: "review", review: "Qualité exceptionnelle ! Le meilleur chocolat que j'ai jamais goûté.", author: "Amina T." },
                { img: "https://picsum.photos/seed/chocoreview2/1200/800", type: "review", review: "Magnifique présentation, le cadeau parfait pour mes invités.", author: "Youssef M." },
                { img: "https://picsum.photos/seed/chocoreview3/1200/800", type: "review", review: "Un vrai goût de luxe, livraison rapide et très soignée.", author: "Salma B." },
              ]
          ).map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className={item.type === "screenshot" 
                ? "relative w-full flex items-center justify-center py-8 md:py-16 bg-white"
                : "relative w-full h-[60vh] min-h-[450px] md:h-[80vh] group overflow-hidden" 
              }
            >
              {item.type === "screenshot" ? (
                <div className="w-full max-w-lg px-4 md:px-0">
                  <img 
                    src={item.img} 
                    alt="Client Review WhatsApp" 
                    className="w-full h-auto object-contain rounded-xl md:rounded-3xl shadow-xl shadow-brand-purple/10 border border-brand-lavender/20"
                  />
                </div>
              ) : (
                <>
                  <img 
                    src={item.img} 
                    alt="Visual Experience" 
                    className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                  />
                  {item.type === "review" && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-700" />
                      <div className="absolute inset-0 flex flex-col items-center justify-end text-center p-8 pb-16 md:p-16 md:pb-24">
                        <motion.div 
                          initial={{ y: 20, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3, duration: 0.8 }}
                          className="flex gap-2 text-brand-gold mb-6"
                        >
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-5 h-5 md:w-6 md:h-6 fill-current" />
                          ))}
                        </motion.div>
                        <motion.h3 
                          initial={{ y: 20, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.5, duration: 0.8 }}
                          className="text-2xl md:text-4xl lg:text-5xl font-serif italic text-white mb-6 max-w-4xl leading-relaxed"
                        >
                          "{item.review}"
                        </motion.h3>
                        <motion.p 
                          initial={{ y: 20, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.7, duration: 0.8 }}
                          className="text-white/80 text-xs md:text-sm tracking-[0.2em] uppercase font-medium"
                        >
                          — {item.author}
                        </motion.p>
                      </div>
                    </>
                  )}
                </>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-light text-brand-purple tracking-wide mb-12 text-center">
              Vous Aimerez Aussi
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
      {/* Sticky Bottom Bar */}
      {!showCheckout && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-brand-lavender/20 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] md:hidden">
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setShowCheckout(true);
            }}
            className="w-full bg-brand-gold text-white h-14 rounded-2xl text-sm tracking-[0.1em] uppercase font-medium flex items-center justify-center gap-3 shadow-lg shadow-brand-gold/20"
          >
            <ShoppingBag className="w-5 h-5" />
            Commander Maintenant
          </button>
        </div>
      )}

      {/* Thank You Modal */}
      <AnimatePresence>
        {showThankYou && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-purple/60 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-brand-offwhite p-10 lg:p-14 rounded-3xl max-w-lg w-full text-center relative border border-brand-gold/20 shadow-2xl"
            >
              <button 
                onClick={() => setShowThankYou(false)}
                className="absolute top-6 right-6 text-brand-purple/40 hover:text-brand-purple transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-20 h-20 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-brand-gold/30">
                <Gift className="w-10 h-10 text-brand-gold" />
              </div>
              
              <h2 className="text-3xl font-light text-brand-purple tracking-wide mb-4">
                Merci pour votre commande
              </h2>
              
              <p className="text-brand-purple/70 font-light leading-relaxed mb-8">
                Votre commande a été confirmée. Nous vous contacterons sous peu pour organiser la livraison de vos chefs-d'œuvre en chocolat.
              </p>
              
              <button 
                onClick={() => setShowThankYou(false)}
                className="w-full bg-brand-gold text-white py-4 rounded-xl text-xs tracking-[0.2em] uppercase font-medium hover:bg-brand-gold-light transition-colors"
              >
                Continuer vos achats
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
