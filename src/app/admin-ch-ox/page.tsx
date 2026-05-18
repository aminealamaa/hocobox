"use client";

import React, { useState, useEffect } from "react";
import { Product } from "@/lib/data";
import { Save, Plus, Trash2, Image as ImageIcon, Lock, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // Check local storage session
    const session = localStorage.getItem("chocobox_admin_session");
    if (session === "chocobox-authenticated-admin-session") {
      setIsAuthenticated(true);
      fetchProductsData();
    } else {
      setCheckingAuth(false);
      setLoading(false);
    }
  }, []);

  const fetchProductsData = () => {
    setLoading(true);
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
          if (data.length > 0) setSelectedId(data[0].id);
        } else {
          console.error("Failed to load products:", data);
        }
        setLoading(false);
        setCheckingAuth(false);
      })
      .catch((error) => {
        console.error("API error:", error);
        setLoading(false);
        setCheckingAuth(false);
      });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setCheckingAuth(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput }),
      });
      const data = await res.json();
      
      if (res.ok && data.success) {
        localStorage.setItem("chocobox_admin_session", data.token);
        setIsAuthenticated(true);
        fetchProductsData();
      } else {
        setAuthError(data.error || "Mot de passe incorrect.");
        setCheckingAuth(false);
      }
    } catch {
      setAuthError("Erreur de connexion avec le serveur.");
      setCheckingAuth(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("chocobox_admin_session");
    setIsAuthenticated(false);
    setProducts([]);
  };

  const handleSave = async () => {
    if (!selectedProduct) return;
    setSaving(true);
    try {
      // Separate fields Prisma knows about (strip createdAt/updatedAt if present)
      const { id, createdAt, updatedAt, ...data } = selectedProduct as any;
      await fetch(`/api/products/${selectedProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      alert("Produit sauvegardé avec succès !");
    } catch (err) {
      alert("Erreur lors de la sauvegarde.");
    }
    setSaving(false);
  };

  const handleUpdate = (id: string, field: keyof Product, value: any) => {
    setProducts((prev) => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const addImage = (id: string, imageUrl: string) => {
    setProducts((prev) => prev.map(p => p.id === id ? { ...p, images: [...p.images, imageUrl] } : p));
  };

  const removeImage = (id: string, indexToRemove: number) => {
    setProducts((prev) => prev.map(p => p.id === id ? { ...p, images: p.images.filter((_, i) => i !== indexToRemove) } : p));
  };

  const addNewProduct = async () => {
    const newData = {
      name: "Nouveau Produit",
      price: 0,
      description: "",
      shortDescription: "",
      images: [],
      category: "boxes",
      collection: "signature",
      tags: [],
      ingredients: [],
      weight: "0g",
      pieces: 0,
      inStock: true,
      rating: 5.0,
      reviews: 0,
    };
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });
      const created = await res.json();
      setProducts(prev => [...prev, created]);
      setSelectedId(created.id);
    } catch {
      alert("Erreur lors de la création du produit.");
    }
  };

  const deleteProduct = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      try {
        await fetch(`/api/products/${id}`, { method: "DELETE" });
        const newProducts = products.filter(p => p.id !== id);
        setProducts(newProducts);
        if (selectedId === id) setSelectedId(newProducts[0]?.id || null);
      } catch {
        alert("Erreur lors de la suppression.");
      }
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#0d041a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-brand-gold border-t-transparent animate-spin" />
          <p className="text-brand-gold/60 font-light tracking-widest text-xs uppercase animate-pulse">Vérification de session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-radial from-[#1a0933] to-[#0d041a] flex items-center justify-center px-4 relative overflow-hidden font-sans">
        {/* Decorative gold glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-purple/20 rounded-full blur-3xl" />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative z-10 flex flex-col items-center"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif text-brand-gold tracking-[0.25em] uppercase font-light mb-2">Chocobox</h1>
            <p className="text-white/40 text-xs tracking-widest uppercase">Espace Administration Privé</p>
          </div>

          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mb-8 shadow-inner shadow-brand-gold/5">
            <Lock className="w-6 h-6 text-brand-gold" />
          </div>

          <form onSubmit={handleLogin} className="w-full space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] tracking-[0.15em] uppercase font-medium text-white/60 block">Mot de passe de sécurité</label>
              <input
                type="password"
                placeholder="Entrez votre code d'accès"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/20 text-center tracking-widest focus:outline-none focus:border-brand-gold/50 transition-all text-sm"
                required
              />
            </div>

            {authError && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs py-3 px-4 rounded-xl flex items-center gap-2 justify-center"
              >
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </motion.div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-brand-gold text-white font-medium tracking-[0.2em] text-xs uppercase rounded-2xl hover:bg-brand-gold/90 transition-all hover:shadow-lg hover:shadow-brand-gold/20 cursor-pointer text-center"
            >
              Se Connecter
            </button>
          </form>

          <p className="text-white/20 text-[10px] tracking-wider mt-8 uppercase">Chocobox &copy; 2026</p>
        </motion.div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-offwhite flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-brand-purple border-t-transparent animate-spin" />
          <p className="text-brand-purple/60 font-light tracking-widest text-xs uppercase animate-pulse">Chargement du CMS...</p>
        </div>
      </div>
    );
  }

  const selectedProduct = products.find(p => p.id === selectedId);

  return (
    <div className="flex h-screen bg-brand-offwhite font-sans">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-brand-lavender/20 flex flex-col h-full overflow-hidden shadow-xl shadow-brand-purple/5 z-10">
        <div className="p-6 border-b border-brand-lavender/20 flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-lg font-serif text-brand-purple tracking-wide">Chocobox CMS</h1>
            <button 
              onClick={handleLogout}
              className="text-[9px] tracking-widest text-red-500 uppercase hover:underline text-left mt-0.5"
            >
              Déconnexion
            </button>
          </div>
          <button onClick={addNewProduct} className="p-2 bg-brand-purple text-brand-offwhite rounded-xl hover:bg-brand-purple-light transition-colors shadow-md">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          {products.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedId(p.id)}
              className={`w-full text-left px-4 py-3 rounded-2xl transition-all duration-300 ${selectedId === p.id ? "bg-brand-purple text-brand-offwhite shadow-lg shadow-brand-purple/20 translate-x-1" : "hover:bg-brand-lavender/10 text-brand-purple border border-transparent hover:border-brand-lavender/20"}`}
            >
              <div className="font-medium truncate text-sm">{p.name}</div>
              <div className={`text-xs mt-1 ${selectedId === p.id ? "text-brand-offwhite/70" : "text-brand-gold"}`}>{p.price} MAD</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Editor */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <div className="p-6 border-b border-brand-lavender/20 bg-white flex items-center justify-between shadow-sm z-0">
          <h2 className="text-xl font-light text-brand-purple tracking-wide">Éditer le Produit</h2>
          <div className="flex items-center gap-3">
            {selectedProduct && (
              <button 
                onClick={() => deleteProduct(selectedProduct.id)}
                className="flex items-center gap-2 text-red-500/80 px-4 py-3 hover:bg-red-50 hover:text-red-600 rounded-full transition-colors text-xs tracking-[0.1em] uppercase font-medium border border-red-500/20 hover:border-red-500/50"
              >
                <Trash2 className="w-4 h-4" /> Supprimer
              </button>
            )}
            <button 
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-brand-gold text-white px-8 py-3 rounded-full text-xs tracking-[0.1em] uppercase font-medium hover:bg-brand-gold-light transition-all shadow-lg shadow-brand-gold/20"
            >
              <Save className="w-4 h-4" /> {saving ? "Sauvegarde..." : "Sauvegarder"}
            </button>
          </div>
        </div>

        {selectedProduct ? (
          <div className="flex-1 overflow-y-auto p-8 lg:p-12">
            <div className="max-w-3xl mx-auto space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.1em] text-brand-purple/60 font-medium">Nom du Produit (Name)</label>
                  <input 
                    type="text" 
                    value={selectedProduct.name}
                    onChange={(e) => handleUpdate(selectedProduct.id, "name", e.target.value)}
                    className="w-full border border-brand-lavender/30 rounded-xl px-4 py-3 bg-white focus:border-brand-purple outline-none transition-colors text-brand-purple shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.1em] text-brand-purple/60 font-medium">Prix (Price - MAD)</label>
                  <input 
                    type="number" 
                    value={selectedProduct.price}
                    onChange={(e) => handleUpdate(selectedProduct.id, "price", Number(e.target.value))}
                    className="w-full border border-brand-lavender/30 rounded-xl px-4 py-3 bg-white focus:border-brand-purple outline-none transition-colors text-brand-purple shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs uppercase tracking-[0.1em] text-brand-purple/60 font-medium">Images du Produit (Product Images)</label>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {selectedProduct.images.map((img, idx) => (
                    <div key={idx} className="relative group w-full aspect-square rounded-xl overflow-hidden border border-brand-lavender/20 shadow-sm bg-brand-lavender/5">
                      <img src={img} alt={`Produit ${idx + 1}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button 
                          onClick={() => removeImage(selectedProduct.id, idx)}
                          className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors shadow-lg scale-90 group-hover:scale-100 duration-200"
                          title="Supprimer l'image"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                  <label className="cursor-pointer bg-brand-purple/5 hover:bg-brand-purple/10 border border-brand-lavender/30 border-dashed rounded-xl w-full aspect-square flex flex-col items-center justify-center transition-colors shadow-sm">
                    <input 
                      type="file" 
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={async (e) => {
                        const files = Array.from(e.target.files || []);
                        for (const file of files) {
                          const formData = new FormData();
                          formData.append("file", file);
                          const res = await fetch("/api/upload", { method: "POST", body: formData });
                          const data = await res.json();
                          if (data.url) {
                            addImage(selectedProduct.id, data.url);
                          }
                        }
                      }}
                    />
                    <Plus className="w-8 h-8 text-brand-purple/40 mb-2" />
                    <span className="text-xs text-brand-purple/70 font-medium text-center px-2">Ajouter des images</span>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.1em] text-brand-purple/60 font-medium">Description Courte (Short Description)</label>
                <input 
                  type="text" 
                  value={selectedProduct.shortDescription}
                  onChange={(e) => handleUpdate(selectedProduct.id, "shortDescription", e.target.value)}
                  className="w-full border border-brand-lavender/30 rounded-xl px-4 py-3 bg-white focus:border-brand-purple outline-none transition-colors text-brand-purple shadow-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.1em] text-brand-purple/60 font-medium">Description Complète (Full Description)</label>
                <textarea 
                  rows={5}
                  value={selectedProduct.description}
                  onChange={(e) => handleUpdate(selectedProduct.id, "description", e.target.value)}
                  className="w-full border border-brand-lavender/30 rounded-xl px-4 py-3 bg-white focus:border-brand-purple outline-none transition-colors text-brand-purple shadow-sm resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.1em] text-brand-purple/60 font-medium">Ingrédients Clés (Key Ingredients - Un par ligne)</label>
                <textarea 
                  rows={4}
                  value={selectedProduct.ingredients?.join("\n") || ""}
                  onChange={(e) => handleUpdate(selectedProduct.id, "ingredients", e.target.value.split("\n"))}
                  className="w-full border border-brand-lavender/30 rounded-xl px-4 py-3 bg-white focus:border-brand-purple outline-none transition-colors text-brand-purple shadow-sm resize-none"
                  placeholder="Chocolat Noir 72%&#10;Amandes&#10;Pistaches..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.1em] text-brand-purple/60 font-medium">Collection</label>
                  <select 
                    value={selectedProduct.collection}
                    onChange={(e) => handleUpdate(selectedProduct.id, "collection", e.target.value)}
                    className="w-full border border-brand-lavender/30 rounded-xl px-4 py-3 bg-white focus:border-brand-purple outline-none transition-colors text-brand-purple shadow-sm"
                  >
                    <option value="signature">Signature Collection</option>
                    <option value="eid">Eid Collection</option>
                    <option value="moroccan">Moroccan Flavors</option>
                    <option value="gifting">Luxury Gifting</option>
                    <option value="limited">Limited Edition</option>
                  </select>
                </div>
                <div className="space-y-2 flex items-center pt-6">
                  <label className="flex items-center gap-3 cursor-pointer p-3 border border-brand-lavender/20 rounded-xl bg-white shadow-sm w-full">
                    <input 
                      type="checkbox" 
                      checked={selectedProduct.inStock}
                      onChange={(e) => handleUpdate(selectedProduct.id, "inStock", e.target.checked)}
                      className="w-5 h-5 text-brand-purple rounded border-brand-lavender/30 focus:ring-brand-purple accent-brand-purple"
                    />
                    <span className="text-sm font-medium text-brand-purple">En Stock (In Stock)</span>
                  </label>
                </div>
              </div>
              


            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-brand-purple/30">
            <div className="w-24 h-24 rounded-full bg-brand-lavender/10 flex items-center justify-center mb-6">
              <Plus className="w-10 h-10 text-brand-lavender/40" />
            </div>
            <p className="text-lg font-light">Sélectionnez un produit ou créez-en un nouveau.</p>
          </div>
        )}
      </div>
    </div>
  );
}
