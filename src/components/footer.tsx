"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Camera, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  shop: [
    { label: "All Products", href: "/shop" },
    { label: "Collection Signature", href: "/collections/signature-collection" },
    { label: "Collection Aïd", href: "/collections/eid-collection" },
    { label: "Saveurs Marocaines", href: "/collections/moroccan-flavors" },
    { label: "Cadeaux de Luxe", href: "/collections/luxury-gifting" },
    { label: "Édition Limitée", href: "/collections/limited-edition" },
  ],
  maison: [
    { label: "Notre Histoire", href: "/about" },
    { label: "Artisanat", href: "/about" },
    { label: "Nous Contacter", href: "/contact" },
    { label: "Cadeaux d'Entreprise", href: "/contact" },
  ],
  help: [
    { label: "Expédition & Livraison", href: "/contact" },
    { label: "Politique de Retour", href: "/contact" },
    { label: "FAQ", href: "/contact" },
    { label: "Politique de Confidentialité", href: "/" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-brand-purple text-brand-offwhite">
      {/* Newsletter Section */}
      <div className="border-b border-brand-lavender/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl lg:text-3xl font-light tracking-wide">
                Join <span className="text-gold-gradient">Chocobox</span>
              </h3>
              <p className="text-brand-lavender/60 text-sm font-light mt-2 max-w-md">
                Soyez les premiers à découvrir les nouvelles collections, les offres exclusives et l'art du cadeau de luxe.
              </p>
            </div>
            <div className="flex w-full max-w-md">
              <input
                type="email"
                placeholder="Votre adresse e-mail"
                className="flex-1 bg-white/5 border border-brand-lavender/20 rounded-l-2xl px-6 py-3.5 text-sm font-light text-brand-offwhite placeholder:text-brand-lavender/30 outline-none focus:border-brand-gold/50 transition-colors"
              />
              <button className="bg-brand-gold hover:bg-brand-gold-light text-white px-8 py-3.5 rounded-r-2xl text-sm tracking-[0.1em] uppercase font-light transition-colors duration-300 whitespace-nowrap">
                S'abonner
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block group">
              <motion.span
                className="text-2xl font-light tracking-[0.3em] uppercase"
                whileHover={{ letterSpacing: "0.4em" }}
                transition={{ duration: 0.4 }}
              >
                Chocobox
              </motion.span>
              <span className="block text-[9px] tracking-[0.4em] uppercase text-brand-gold font-light mt-[-2px]">
                Maison du Chocolat
              </span>
            </Link>
            <p className="text-brand-lavender/50 text-sm font-light leading-relaxed mt-6 max-w-sm">
              Né au Maroc, conçu pour le monde. Chaque pièce célèbre l'héritage, l'artisanat et l'art intemporel du cadeau de luxe.
            </p>
            <div className="flex items-center gap-4 mt-8">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Suivez-nous sur Instagram"
                className="w-10 h-10 rounded-full border border-brand-lavender/20 flex items-center justify-center text-brand-lavender/50 hover:text-brand-gold hover:border-brand-gold/50 transition-all duration-300"
              >
                <Camera className="w-4 h-4" />
              </a>
              <a
                href="mailto:hello@chocobox.com"
                aria-label="Envoyez-nous un e-mail"
                className="w-10 h-10 rounded-full border border-brand-lavender/20 flex items-center justify-center text-brand-lavender/50 hover:text-brand-gold hover:border-brand-gold/50 transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/971500000000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contactez-nous sur WhatsApp"
                className="w-10 h-10 rounded-full border border-brand-lavender/20 flex items-center justify-center text-brand-lavender/50 hover:text-brand-gold hover:border-brand-gold/50 transition-all duration-300"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-brand-lavender/40 mb-6">
              Boutique
            </h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-light text-brand-lavender/60 hover:text-brand-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-brand-lavender/40 mb-6">
              Maison
            </h4>
            <ul className="space-y-3">
              {footerLinks.maison.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-light text-brand-lavender/60 hover:text-brand-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-brand-lavender/40 mb-6">
              Aide
            </h4>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-light text-brand-lavender/60 hover:text-brand-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <h4 className="text-[11px] tracking-[0.2em] uppercase text-brand-lavender/40 mb-3">
                Nous Visiter
              </h4>
              <div className="flex items-start gap-2 text-brand-lavender/50">
                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                <p className="text-xs font-light leading-relaxed">
                  Gueliz, Marrakech<br />
                  Morocco
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-brand-lavender/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] tracking-[0.1em] text-brand-lavender/30 font-light">
            © 2024 Chocobox. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[10px] tracking-[0.1em] text-brand-lavender/30 font-light">
              Visa
            </span>
            <span className="text-[10px] tracking-[0.1em] text-brand-lavender/30 font-light">
              Mastercard
            </span>
            <span className="text-[10px] tracking-[0.1em] text-brand-lavender/30 font-light">
              Apple Pay
            </span>
            <span className="text-[10px] tracking-[0.1em] text-brand-lavender/30 font-light">
              Tabby
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
