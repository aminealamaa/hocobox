"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { SearchModal } from "./search-modal";

const navLinks = [
  { href: "/", label: "Accueil" },
  {
    href: "/shop",
    label: "Boutique",
    children: [
      { href: "/collections/signature-collection", label: "Collection Signature" },
      { href: "/collections/eid-collection", label: "Collection Aïd" },
      { href: "/collections/moroccan-flavors", label: "Saveurs Marocaines" },
      { href: "/collections/luxury-gifting", label: "Cadeaux de Luxe" },
      { href: "/collections/limited-edition", label: "Édition Limitée" },
    ],
  },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "Notre Histoire" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { totalItems, setIsOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-brand-purple text-brand-offwhite text-center text-xs tracking-[0.2em] uppercase py-2.5 px-4 font-light">
        <span className="hidden sm:inline">Emballage Cadeau Offert Pour Toute Commande · </span>
        Livraison Gratuite À Partir de 200 MAD
      </div>

      {/* Navbar */}
      <motion.header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass shadow-lg shadow-brand-purple/5"
            : "bg-brand-offwhite/95 backdrop-blur-sm"
        }`}
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8 h-[72px]">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 -ml-2 text-brand-purple hover:text-brand-gold transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Nav Links - Desktop */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.slice(0, 3).map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="text-[13px] tracking-[0.15em] uppercase text-brand-purple/80 hover:text-brand-purple transition-colors duration-300 font-light flex items-center gap-1"
                >
                  {link.label}
                  {link.children && <ChevronDown className="w-3 h-3" />}
                </Link>
                {/* Dropdown */}
                <AnimatePresence>
                  {link.children && activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl shadow-brand-purple/10 border border-brand-lavender/20 overflow-hidden p-2"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-[12px] tracking-[0.1em] uppercase text-brand-purple/70 hover:text-brand-purple hover:bg-brand-lavender/10 rounded-xl transition-all duration-200"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Logo */}
          <Link href="/" className="flex flex-col items-center group">
            <motion.span
              className="text-xl lg:text-2xl font-light tracking-[0.3em] uppercase text-brand-purple"
              whileHover={{ letterSpacing: "0.4em" }}
              transition={{ duration: 0.4 }}
            >
              Chocobox
            </motion.span>
            <span className="text-[8px] tracking-[0.4em] uppercase text-brand-gold font-light mt-[-2px]">
              Maison du Chocolat
            </span>
          </Link>

          {/* Right Nav Links + Actions */}
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.slice(3).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[13px] tracking-[0.15em] uppercase text-brand-purple/80 hover:text-brand-purple transition-colors duration-300 font-light"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-brand-purple/70 hover:text-brand-purple transition-colors"
                aria-label="Search"
              >
                <Search className="w-[18px] h-[18px]" />
              </button>
              <Link
                href="/shop"
                className="hidden sm:block p-2 text-brand-purple/70 hover:text-brand-purple transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-[18px] h-[18px]" />
              </Link>
              <button
                onClick={() => setIsOpen(true)}
                className="relative p-2 text-brand-purple/70 hover:text-brand-purple transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag className="w-[18px] h-[18px]" />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 bg-brand-gold text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-medium"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-brand-purple/40 backdrop-blur-sm z-[60]"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-[320px] bg-brand-offwhite z-[70] flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-brand-lavender/20">
                <span className="text-lg tracking-[0.3em] uppercase text-brand-purple font-light">
                  Chocobox
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-brand-purple/70 hover:text-brand-purple"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-6 px-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-3.5 text-[14px] tracking-[0.15em] uppercase text-brand-purple/80 hover:text-brand-purple border-b border-brand-lavender/10 transition-colors"
                    >
                      {link.label}
                    </Link>
                    {link.children && (
                      <div className="pl-4">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="block py-2.5 text-[12px] tracking-[0.1em] uppercase text-brand-purple/50 hover:text-brand-gold transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
              <div className="p-6 border-t border-brand-lavender/20">
                <p className="text-[10px] tracking-[0.15em] uppercase text-brand-purple/40">
                  © 2024 Chocobox
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
