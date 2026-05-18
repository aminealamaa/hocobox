export interface Product {
  id: string;
  name: string;
  nameAr?: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription: string;
  images: string[];
  category: string;
  collection: string;
  tags: string[];
  ingredients: string[];
  weight: string;
  pieces: number;
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  isLimited?: boolean;
  rating: number;
  reviews: number;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  productCount: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  avatar: string;
}

// Luxurious gradient placeholder images
const placeholderImage = (seed: number, w = 600, h = 600) =>
  `https://picsum.photos/seed/chocobox${seed}/${w}/${h}`;

export const collections: Collection[] = [
  {
    id: "eid",
    name: "Eid Collection",
    description: "Celebrate with elegance. Handcrafted boxes designed for the joy of Eid.",
    image: placeholderImage(10, 800, 600),
    slug: "eid-collection",
    productCount: 8,
  },
  {
    id: "signature",
    name: "Signature Collection",
    description: "Our timeless classics. The essence of Chocobox in every bite.",
    image: placeholderImage(20, 800, 600),
    slug: "signature-collection",
    productCount: 12,
  },
  {
    id: "moroccan",
    name: "Moroccan Flavors",
    description: "A journey through the souks. Argan, rose, saffron and ancient spices.",
    image: placeholderImage(30, 800, 600),
    slug: "moroccan-flavors",
    productCount: 6,
  },
  {
    id: "gifting",
    name: "Luxury Gifting",
    description: "Unforgettable gifts for unforgettable moments. Premium packaging included.",
    image: placeholderImage(40, 800, 600),
    slug: "luxury-gifting",
    productCount: 10,
  },
  {
    id: "limited",
    name: "Limited Edition",
    description: "Exclusive creations. Once they're gone, they're gone.",
    image: placeholderImage(50, 800, 600),
    slug: "limited-edition",
    productCount: 4,
  },
];

import productsData from "./products.json";

export const products: Product[] = productsData as Product[];

// Async functions to fetch from Neon DB via API (use these in server components)
export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch("/api/products", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  } catch {
    return products; // fallback to local JSON
  }
}

export async function fetchProduct(id: string): Promise<Product | undefined> {
  try {
    const res = await fetch(`/api/products/${id}`, { cache: "no-store" });
    if (!res.ok) return undefined;
    return res.json();
  } catch {
    return products.find((p) => p.id === id);
  }
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Fatima Al-Rashid",
    location: "Dubai, UAE",
    text: "Chocobox transformed our Eid celebration. The presentation was so exquisite that my guests thought we ordered from Paris. The saffron truffles are absolutely divine.",
    rating: 5,
    avatar: placeholderImage(2001, 100, 100),
  },
  {
    id: "2",
    name: "Sarah Bennani",
    location: "Casablanca, Morocco",
    text: "I've been gifting Chocobox to my clients for two years now. Nothing else compares. The quality, the packaging, the experience — it's pure luxury.",
    rating: 5,
    avatar: placeholderImage(2002, 100, 100),
  },
  {
    id: "3",
    name: "Aisha Mohammed",
    location: "Riyadh, KSA",
    text: "The Ramadan Lantern box brought tears to my mother's eyes. It's not just chocolate — it's an emotional experience wrapped in gold.",
    rating: 5,
    avatar: placeholderImage(2003, 100, 100),
  },
  {
    id: "4",
    name: "Yasmine El Idrissi",
    location: "Marrakech, Morocco",
    text: "As a Marrakshi, I'm proud that Chocobox brings our flavors to the world with such elegance. The argan rose pralines taste like home, but elevated.",
    rating: 5,
    avatar: placeholderImage(2004, 100, 100),
  },
];

export const faqs = [
  {
    q: "How should I store my chocolates?",
    a: "Our chocolates are best enjoyed at room temperature (18-22°C). Store in a cool, dry place away from direct sunlight. Do not refrigerate, as this can affect the texture and flavor.",
  },
  {
    q: "Do you offer international shipping?",
    a: "Yes, we ship to UAE, Saudi Arabia, Qatar, Bahrain, Kuwait, Oman, and select European countries. International orders are shipped in temperature-controlled packaging.",
  },
  {
    q: "Can I personalize my gift box?",
    a: "Absolutely. We offer custom ribbon colors, engraved messages on the box lid, and personalized cards. For corporate orders, we can include your logo on the packaging.",
  },
  {
    q: "What is your return policy?",
    a: "Due to the perishable nature of our products, we cannot accept returns. However, if your order arrives damaged, we will send a replacement immediately.",
  },
  {
    q: "How long do the chocolates stay fresh?",
    a: "Our chocolates have a shelf life of 3-4 weeks from the date of production. Each box includes a best-before date. For the finest experience, we recommend enjoying within 2 weeks.",
  },
  {
    q: "Do you cater for corporate events?",
    a: "Yes, we specialize in luxury corporate gifting. From branded boxes to large-scale event catering, our concierge team will craft a bespoke experience for your brand.",
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCollection(collectionId: string): Product[] {
  return products.filter((p) => p.collection === collectionId);
}

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getBestsellers(): Product[] {
  return products.filter((p) => p.isBestseller);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNew);
}

export function getLimitedEdition(): Product[] {
  return products.filter((p) => p.isLimited);
}

export function getRelatedProducts(productId: string, limit = 4): Product[] {
  const product = getProduct(productId);
  if (!product) return [];
  return products
    .filter((p) => p.id !== productId && (p.collection === product.collection || p.category === product.category))
    .slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.includes(q)) ||
      p.collection.includes(q)
  );
}
