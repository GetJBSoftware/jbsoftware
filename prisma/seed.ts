import { PrismaClient } from "@prisma/client";
import { PRODUCTS } from "../src/lib/products";

const prisma = new PrismaClient();

async function main() {
  for (const p of PRODUCTS) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        description: p.description,
        longDescription: p.longDescription,
        price: p.price,
        currency: p.currency,
        type: p.type,
        downloadUrl: p.downloadUrl ?? null,
        githubRelease: p.githubRelease ?? null,
        image: p.image ?? null,
        featured: p.featured ?? false,
      },
      create: {
        slug: p.slug,
        name: p.name,
        description: p.description,
        longDescription: p.longDescription,
        price: p.price,
        currency: p.currency,
        type: p.type,
        downloadUrl: p.downloadUrl ?? null,
        githubRelease: p.githubRelease ?? null,
        image: p.image ?? null,
        featured: p.featured ?? false,
      },
    });
  }
  console.log("Seeded products");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
