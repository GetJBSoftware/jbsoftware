import { PrismaClient } from "@prisma/client";
import { PRODUCTS } from "../src/lib/products";

const prisma = new PrismaClient();

async function main() {
  const activeSlugs = PRODUCTS.map((p) => p.slug);

  // Remove products that are no longer in the catalogue, but keep any row that
  // already has purchases so order history is never orphaned.
  const retired = await prisma.product.deleteMany({
    where: {
      slug: { notIn: activeSlugs },
      purchases: { none: {} },
    },
  });

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
  console.log(
    `Seeded ${PRODUCTS.length} products; removed ${retired.count} retired products without purchases.`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
