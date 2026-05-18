"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Camera, MessageSquare } from "lucide-react";

export default function Contact() {
  return (
    <main className="flex-1 bg-brand-offwhite">
      {/* Header */}
      <section className="bg-brand-purple pt-32 pb-20 px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-brand-offwhite tracking-wide mb-6"
          >
            Contactez-<span className="font-serif italic text-gold-gradient">nous</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-brand-lavender/80 font-light text-lg"
          >
            Notre équipe de conciergerie est à votre service pour des demandes sur mesure et des cadeaux d'entreprise.
          </motion.p>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-light text-brand-purple tracking-wide mb-12">
              Se Connecter avec la Maison
            </h2>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-lavender/20 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5 text-brand-purple" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-brand-purple uppercase tracking-[0.1em] mb-1">Conciergerie WhatsApp</h3>
                  <p className="text-brand-purple/60 font-light mb-2">Disponible de 9h à 20h</p>
                  <a href="#" className="text-brand-gold hover:text-brand-purple transition-colors">+971 50 000 0000</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-lavender/20 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-brand-purple" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-brand-purple uppercase tracking-[0.1em] mb-1">Demandes par E-mail</h3>
                  <p className="text-brand-purple/60 font-light mb-2">Pour les commandes générales et d'entreprise</p>
                  <a href="mailto:hello@chocobox.com" className="text-brand-gold hover:text-brand-purple transition-colors">hello@chocobox.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-lavender/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-brand-purple" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-brand-purple uppercase tracking-[0.1em] mb-1">L'Atelier</h3>
                  <p className="text-brand-purple/60 font-light leading-relaxed">
                    Avenue Mohammed VI, Gueliz<br/>
                    Marrakech, Morocco
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <h3 className="text-xs font-medium text-brand-purple uppercase tracking-[0.2em] mb-6">Suivez Notre Voyage</h3>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 rounded-full border border-brand-lavender/40 flex items-center justify-center text-brand-purple hover:bg-brand-purple hover:text-brand-offwhite transition-all duration-300">
                  <Camera className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white p-8 lg:p-12 rounded-3xl border border-brand-lavender/20 shadow-xl shadow-brand-purple/5"
          >
            <h2 className="text-2xl font-light text-brand-purple tracking-wide mb-8">
              Envoyer un Message
            </h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-[0.1em] text-brand-purple/60 mb-2">Prénom</label>
                  <input type="text" className="w-full border-b border-brand-lavender/40 py-2 bg-transparent focus:border-brand-purple outline-none transition-colors text-brand-purple font-light" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.1em] text-brand-purple/60 mb-2">Nom</label>
                  <input type="text" className="w-full border-b border-brand-lavender/40 py-2 bg-transparent focus:border-brand-purple outline-none transition-colors text-brand-purple font-light" />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.1em] text-brand-purple/60 mb-2">Adresse E-mail</label>
                <input type="email" className="w-full border-b border-brand-lavender/40 py-2 bg-transparent focus:border-brand-purple outline-none transition-colors text-brand-purple font-light" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.1em] text-brand-purple/60 mb-2">Type de Demande</label>
                <select className="w-full border-b border-brand-lavender/40 py-2 bg-transparent focus:border-brand-purple outline-none transition-colors text-brand-purple font-light appearance-none">
                  <option>Demande Générale</option>
                  <option>Statut de la Commande</option>
                  <option>Cadeaux d'Entreprise</option>
                  <option>Presse et Médias</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.1em] text-brand-purple/60 mb-2">Message</label>
                <textarea rows={4} className="w-full border-b border-brand-lavender/40 py-2 bg-transparent focus:border-brand-purple outline-none transition-colors text-brand-purple font-light resize-none" />
              </div>
              <button type="button" className="w-full bg-brand-purple text-brand-offwhite py-4 rounded-xl text-xs tracking-[0.2em] uppercase font-light hover:bg-brand-gold transition-colors mt-4">
                Envoyer le Message
              </button>
            </form>
          </motion.div>

        </div>
      </section>
    </main>
  );
}
