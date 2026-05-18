// @ts-nocheck
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const connectionString = "postgresql://neondb_owner:npg_9tFNQ0GPgbHA@ep-sparkling-hat-al88bskl-pooler.c-3.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing products
  await prisma.product.deleteMany();

  // Insert The Royal Chocobox
  const product = await prisma.product.create({
    data: {
      id: "1",
      name: "Royal Chocobox",
      nameAr: "شوكوبوكس الملكي",
      price: 249,
      originalPrice: 340,
      description:
        "Our flagship creation. 25 handcrafted pralines nestled in a velvet-lined box with genuine leather finishing. Each piece tells a story of Moroccan artistry, from the saffron-infused ganache to the rose petal truffles. A gift that speaks of refined taste and timeless elegance.",
      shortDescription: "25-piece luxury praline collection in leather box",
      images: [
        "/uploads/msa7_katba_dyal_smiyat.com_202605181051-1779096712447-832267391.webp",
        "/uploads/badal_smiyat_chocodiamnt.com_bi__202605181116-1779096720761-306868586.webp",
        "/uploads/Dark_Royal_Purple_White_Lavender_202605181203-1779098642043-726278329.webp",
        "/uploads/Dark_Purple_White_Lavender_Colors_202605181205-1779098763575-121256776.webp",
        "/uploads/khali_image_clean_les_chocolate_202605181221-1779099701086-566399361.webp"
      ],
      category: "boxes",
      collection: "signature",
      tags: ["bestseller", "gift", "premium"],
      ingredients: [
        "Belgian Dark Chocolate 72%",
        "Moroccan Argan Oil",
        "Saffron",
        "Rose Water",
        "Pistachio",
        "Almond",
        "Honey",
      ],
      weight: "480g",
      pieces: 25,
      inStock: true,
      isBestseller: true,
      rating: 4.9,
      reviews: 127,
    },
  });

  console.log("✅ Created product:", product.name);
  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
