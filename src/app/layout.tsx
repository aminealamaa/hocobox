import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-store";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-serif", weight: ['300', '400', '500', '600', '700'], style: ['normal', 'italic'] });

export const metadata: Metadata = {
  title: "Chocobox | Luxury Moroccan Chocolate",
  description: "The ultimate luxury gift. Discover our artisanal collection of Moroccan-inspired premium chocolates, handcrafted in Marrakech.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${cormorant.variable} font-sans min-h-screen flex flex-col bg-brand-offwhite text-brand-purple antialiased selection:bg-brand-lavender selection:text-brand-purple`}>
        <CartProvider>
          <Navbar />
          <CartDrawer />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
