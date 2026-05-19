"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function WhatsappFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Show a small tooltip/teaser after 3 seconds, then hide it after 12 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);
    const hideTimer = setTimeout(() => {
      setIsOpen(false);
    }, 12000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!mounted) return null;

  const phoneNumber = "212725730083";
  const message = "Bonjour Chocobox ! Je souhaite obtenir plus d'informations sur vos chocolats premium.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="glass-dark border border-brand-lavender/20 text-brand-offwhite px-4 py-2.5 rounded-2xl text-xs tracking-wide shadow-xl flex items-center gap-2.5 group cursor-pointer hover:border-brand-gold/50 transition-all duration-300 max-w-[280px]"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <div>
              <p className="font-medium text-brand-offwhite">Besoin d'aide ?</p>
              <p className="text-[10px] text-brand-lavender/70">Discutez avec nous sur WhatsApp</p>
            </div>
          </motion.a>
        )}
      </AnimatePresence>

      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 1,
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => setIsOpen(true)}
        className="w-14 h-14 bg-gradient-to-tr from-emerald-500 to-emerald-400 hover:from-emerald-600 hover:to-emerald-500 text-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(16,185,129,0.3)] hover:shadow-[0_8px_35px_rgb(16,185,129,0.55)] cursor-pointer transition-all duration-300 relative border border-emerald-400/20"
        aria-label="Contact us on WhatsApp"
      >
        {/* Pulsing Outer Rings */}
        <span className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping pointer-events-none" style={{ animationDuration: '3s' }} />

        {/* WhatsApp Icon SVG */}
        <svg
          className="w-7 h-7 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.031 2C6.479 2 2 6.478 2 12.03c0 1.91.533 3.69 1.455 5.228L2 22l4.888-1.28A9.967 9.967 0 0012.03 22c5.55 0 10.03-4.478 10.03-10.03C22.062 6.478 17.58 2 12.03 2zm0 1.682c4.625 0 8.349 3.723 8.349 8.349 0 4.625-3.724 8.35-8.349 8.35a8.31 8.31 0 01-4.485-1.306l-.32-.19-2.948.772.787-2.876-.21-.334a8.303 8.303 0 01-1.173-4.415c0-4.626 3.723-8.35 8.35-8.35zm-3.81 3.82c-.146 0-.383.056-.584.275-.2.22-.767.75-.767 1.83 0 1.08.785 2.126.894 2.272.11.147 1.547 2.362 3.748 3.313.524.226.932.361 1.25.462.525.167 1.003.143 1.38.088.422-.062 1.296-.53 1.478-1.042.183-.513.183-.953.128-1.043-.055-.09-.2-.146-.421-.256-.22-.11-1.297-.64-1.498-.713-.2-.073-.347-.11-.495.11-.147.22-.566.713-.694.86-.128.146-.256.164-.477.054-.22-.11-.93-.342-1.77-1.092-.654-.583-1.096-1.304-1.224-1.524-.128-.22-.014-.339.097-.449.1-.1.22-.256.33-.384.11-.128.147-.22.22-.366.073-.146.037-.275-.018-.384-.055-.11-.495-1.192-.678-1.632-.18-.43-.377-.37-.514-.377z" />
        </svg>
      </motion.a>
    </div>
  );
}
