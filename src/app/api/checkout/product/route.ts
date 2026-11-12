import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getProduct } from "@/lib/products";
import { createCheckout, isCheckoutConfigured } from "@/lib/payments";
import { getBaseUrl } from "@/lib/url";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const product = getProduct(String(body?.slug ?? ""));
  if (!product || product.type !== "paid" || product.status !== "available") {
    return NextResponse.json(
      { error: "This product is not available yet." },
      { status: 400 }
    );
  }

  if (!isCheckoutConfigured(product)) {
    return NextResponse.json(
      { error: "Checkout is not open yet. Join the launch list." },
      { status: 503 }
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

  try {
    const url = await createCheckout({
      product,
      productId: dbProduct.id,
      userId: session.user.id,
      email: session.user.email,
      baseUrl: getBaseUrl(req),
    });

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Checkout could not be started. Please try again." },
      { status: 502 }
    );
  }
}
