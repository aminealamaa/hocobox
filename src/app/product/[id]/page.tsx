"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Heart, Minus, Plus, Star, Gift, Truck, ShieldCheck, Check, X } from "lucide-react";
import { Product } from "@/lib/data";
import { useCart } from "@/lib/cart-store";
import { ProductCard } from "@/components/product-card";
import Image from "next/image";

export default function ProductPage() {
  const params = useParams();
  const id = params?.id as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [personalMessage, setPersonalMessage] = useState("");
  const [addGiftMessage, setAddGiftMessage] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expressForm, setExpressForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
  });

  const handleExpressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setExpressForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleExpressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    setIsSubmitting(true);
    try {
      const orderTotal = product.price * qty;
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: `${expressForm.firstName} ${expressForm.lastName}`,
          phone: expressForm.phone,
          address: expressForm.address,
          city: "—",
          total: orderTotal,
          notes: personalMessage ? `Message cadeau: ${personalMessage}` : "Paiement à la livraison",
          items: [
            {
              productId: product.id,
              quantity: qty,
              price: product.price,
            },
          ],
        }),
      });
      if (!res.ok) throw new Error("Failed to save order");
      const orderData = await res.json();
      // Redirect to thank-you page for Meta Pixel tracking
      const params = new URLSearchParams({
        order: orderData.id || "",
        total: orderTotal.toString(),
        items: qty.toString(),
      });
      router.push(`/thank-you?${params.toString()}`);
    } catch (err) {
      console.error("Express order error:", err);
      alert("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const { addItem, toggleWishlist, isInWishlist } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.id) {
          setProduct(data);
          // Fetch related products
          fetch("/api/products")
            .then((res) => res.json())
            .then((allProducts) => {
              if (Array.isArray(allProducts)) {
                const related = allProducts.filter(
                  (p) => p.id !== id && (p.collection === data.collection || p.category === data.category)
                ).slice(0, 4);
                setRelatedProducts(related);
              }
            })
            .catch(console.error);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load product:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center py-32 bg-brand-offwhite">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-brand-purple border-t-transparent animate-spin" />
          <p className="text-brand-purple/60 font-light tracking-widest text-xs uppercase animate-pulse">Chargement de votre coffret...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex-1 flex items-center justify-center py-32 bg-brand-offwhite">
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
              className="relative aspect-square rounded-3xl overflow-hidden bg-brand-lavender/5"
            >
              <Image 
                src={product.images[activeImage]} 
                alt={product.name} 
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  aria-label={`Afficher la photo ${idx + 1} du produit`}
                  className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                    activeImage === idx ? "border-brand-gold" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image 
                    src={img} 
                    alt="" 
                    fill 
                    sizes="25vw"
                    className="object-cover" 
                  />
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
              
              <div className="flex items-end gap-4 mb-6 pb-6 border-b border-brand-lavender/20">
                <span className="text-3xl font-light text-brand-gold">{product.price} MAD</span>
                {product.originalPrice && <span className="text-lg text-brand-purple/30 line-through mb-1">{product.originalPrice} MAD</span>}
              </div>

              {/* Scarcity Offer Card */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-8 p-4 bg-brand-gold/5 rounded-2xl border border-brand-gold/20 flex flex-col gap-3 shadow-sm shadow-brand-gold/5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold"></span>
                    </span>
                    <span className="text-xs font-semibold tracking-wider text-brand-gold uppercase">Offre Limitée</span>
                  </div>
                  <span className="text-xs text-brand-purple/70 font-medium">Seulement 50 coffrets disponibles ce mois-ci</span>
                </div>
                <div className="w-full bg-brand-lavender/20 h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "84%" }}
                    transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
                    className="bg-brand-gold h-full rounded-full" 
                  />
                </div>
                <div className="flex justify-between text-[11px] text-brand-purple/60 font-light">
                  <span className="flex items-center gap-1">✨ <strong className="font-semibold">42 coffrets</strong> confectionnés et réservés</span>
                  <span className="font-medium text-brand-gold">8 restants</span>
                </div>
              </motion.div>

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
              <div id="checkout-section" className="mb-8">
                {!showCheckout ? (
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex items-center justify-between w-full sm:w-32 bg-white border border-brand-lavender/20 rounded-2xl px-2 h-14">
                      <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Diminuer la quantité" className="p-3 text-brand-purple/50 hover:text-brand-purple transition-colors"><Minus className="w-4 h-4" /></button>
                      <span className="text-sm font-medium text-brand-purple">{qty}</span>
                      <button onClick={() => setQty(qty + 1)} aria-label="Augmenter la quantité" className="p-3 text-brand-purple/50 hover:text-brand-purple transition-colors"><Plus className="w-4 h-4" /></button>
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
                      aria-label="Ajouter aux favoris"
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
                    className="bg-white p-6 rounded-3xl border border-brand-gold shadow-lg shadow-brand-gold/10"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-medium text-brand-purple flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-brand-gold" />
                        Paiement Express
                      </h3>
                      <button onClick={() => setShowCheckout(false)} className="text-xs text-brand-purple/50 hover:text-brand-purple underline uppercase tracking-[0.1em]">Annuler</button>
                    </div>
                    
                    <form onSubmit={handleExpressSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" name="firstName" value={expressForm.firstName} onChange={handleExpressChange} placeholder="Prénom" required className="w-full border border-brand-lavender/30 rounded-xl px-4 py-3 bg-brand-offwhite focus:border-brand-gold outline-none transition-colors text-sm font-light" />
                        <input type="text" name="lastName" value={expressForm.lastName} onChange={handleExpressChange} placeholder="Nom" required className="w-full border border-brand-lavender/30 rounded-xl px-4 py-3 bg-brand-offwhite focus:border-brand-gold outline-none transition-colors text-sm font-light" />
                      </div>
                      <input type="tel" name="phone" value={expressForm.phone} onChange={handleExpressChange} placeholder="Numéro de Téléphone" required className="w-full border border-brand-lavender/30 rounded-xl px-4 py-3 bg-brand-offwhite focus:border-brand-gold outline-none transition-colors text-sm font-light" />
                      <textarea name="address" value={expressForm.address} onChange={handleExpressChange} placeholder="Adresse de Livraison" required rows={2} className="w-full border border-brand-lavender/30 rounded-xl px-4 py-3 bg-brand-offwhite focus:border-brand-gold outline-none transition-colors text-sm font-light resize-none" />
                      
                      <div className="flex items-center justify-between py-4 border-y border-brand-lavender/20 my-4">
                        <span className="text-sm font-light text-brand-purple">Montant Total</span>
                        <span className="text-xl font-medium text-brand-gold">{product.price * qty} MAD</span>
                      </div>

                      <button type="submit" disabled={isSubmitting} className="w-full bg-brand-purple text-brand-offwhite h-14 rounded-2xl text-xs tracking-[0.2em] uppercase font-light flex items-center justify-center gap-3 hover:bg-brand-purple-light transition-all shadow-lg shadow-brand-purple/20 disabled:opacity-50 disabled:cursor-not-allowed">
                        {isSubmitting ? "Traitement en cours..." : "Passer la Commande (Paiement à la Livraison)"}
                      </button>
                    </form>
                  </motion.div>
                )}
              </div>

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
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h3 className="text-lg font-light text-brand-purple tracking-wide mb-6">Ingrédients d'Exception</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {product.ingredients.map((ing, i) => (
              <span key={i} className="bg-brand-offwhite px-5 py-2.5 rounded-full text-xs text-brand-purple/70 font-light border border-brand-lavender/20">
                {ing}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Experience - Vertical Stack */}
      <section className="bg-brand-offwhite">
        <div className="flex flex-col">
          {(product.id === "1" 
            ? [
                { img: "/images/pralines-inside.jpeg", type: "lifestyle", review: undefined, author: undefined },
                { img: "/images/royal-chocobox-review.jpeg", type: "screenshot", review: undefined, author: undefined },
                { img: "/images/review-2.jpeg", type: "screenshot", review: undefined, author: undefined },
                { img: "/images/review-3.jpeg", type: "screenshot", review: undefined, author: undefined },
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
                  <div className="relative w-full aspect-[9/16] rounded-xl md:rounded-3xl overflow-hidden shadow-xl shadow-brand-purple/10 border border-brand-lavender/20">
                    <Image 
                      src={item.img} 
                      alt="Client Review WhatsApp" 
                      fill
                      sizes="(max-width: 768px) 100vw, 512px"
                      className="object-contain bg-white"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <Image 
                    src={item.img} 
                    alt="Visual Experience" 
                    fill
                    sizes="100vw"
                    className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
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
              setShowCheckout(true);
              setTimeout(() => {
                document.getElementById("checkout-section")?.scrollIntoView({ behavior: "smooth", block: "center" });
              }, 80);
            }}
            className="w-full bg-brand-gold text-white h-14 rounded-2xl text-sm tracking-[0.1em] uppercase font-medium flex items-center justify-center gap-3 shadow-lg shadow-brand-gold/20"
          >
            <ShoppingBag className="w-5 h-5" />
            Commander Maintenant
          </button>
        </div>
      )}


    </main>
  );
}
