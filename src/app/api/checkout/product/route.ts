import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getProduct } from "@/lib/products";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id || !session.user.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await req.json();
  const product = getProduct(slug);
  if (!product || product.type !== "paid") {
    return NextResponse.json({ error: "Invalid product" }, { status: 400 });
  }

  // Ensure product exists in DB
  const dbProduct = await prisma.product.upsert({
    where: { slug: product.slug },
    update: {
      name: product.name,
      description: product.description,
      longDescription: product.longDescription,
      price: product.price,
      currency: product.currency,
      type: product.type,
      downloadUrl: product.downloadUrl,
      githubRelease: product.githubRelease,
      image: product.image,
      featured: product.featured ?? false,
    },
    create: {
      slug: product.slug,
      name: product.name,
      description: product.description,
      longDescription: product.longDescription,
      price: product.price,
      currency: product.currency,
      type: product.type,
      downloadUrl: product.downloadUrl,
      githubRelease: product.githubRelease,
      image: product.image,
      featured: product.featured ?? false,
    },
  });

  // Already owned?
  const existing = await prisma.purchase.findUnique({
    where: { userId_productId: { userId: session.user.id, productId: dbProduct.id } },
  });
  if (existing?.status === "paid") {
    return NextResponse.json({ error: "Already owned" }, { status: 400 });
  }

  const checkout = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: session.user.email,
    line_items: [
      {
        price_data: {
          currency: product.currency,
          product_data: {
            name: product.name,
            description: product.description,
          },
          unit_amount: product.price,
        },
        quantity: 1,
      },
    ],
    metadata: {
      type: "product",
      slug: product.slug,
      productId: dbProduct.id,
      userId: session.user.id,
    },
    success_url: `${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/downloads?success=1`,
    cancel_url: `${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/downloads?canceled=1`,
  });

  return NextResponse.json({ url: checkout.url });
}
