import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getProduct } from "@/lib/products";
import { isStripeConfigured, stripe } from "@/lib/stripe";
import { getBaseUrl } from "@/lib/url";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id || !session.user.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isStripeConfigured) {
    return NextResponse.json(
      { error: "Payments are not configured yet." },
      { status: 503 }
    );
  }

  const body = await req.json().catch(() => null);
  const product = getProduct(String(body?.slug ?? ""));
  if (!product || product.type !== "paid" || product.status !== "available") {
    return NextResponse.json(
      { error: "This product is not available yet." },
      { status: 400 }
    );
  }

  // Ensure the product exists in the database before creating the purchase.
  const dbProduct = await prisma.product.upsert({
    where: { slug: product.slug },
    update: {
      name: product.name,
      description: product.description,
      longDescription: product.longDescription,
      price: product.price,
      currency: product.currency,
      type: product.type,
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
      image: product.image,
      featured: product.featured ?? false,
    },
  });

  const existing = await prisma.purchase.findUnique({
    where: {
      userId_productId: {
        userId: session.user.id,
        productId: dbProduct.id,
      },
    },
  });
  if (existing?.status === "paid") {
    return NextResponse.json({ error: "Already owned" }, { status: 400 });
  }

  const baseUrl = getBaseUrl(req);

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
    success_url: `${baseUrl}/downloads?success=1`,
    cancel_url: `${baseUrl}/downloads?canceled=1`,
  });

  return NextResponse.json({ url: checkout.url });
}
