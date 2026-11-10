import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getProduct } from "@/lib/products";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product || !product.downloadUrl) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (product.type === "free") {
    return NextResponse.redirect(product.downloadUrl);
  }

  const session = await auth();
  if (!session?.user?.id) {
    const url = new URL("/signin", process.env.NEXTAUTH_URL ?? "http://localhost:3000");
    url.searchParams.set("callbackUrl", `/downloads`);
    return NextResponse.redirect(url);
  }

  const purchase = await prisma.purchase.findUnique({
    where: { userId_productId: { userId: session.user.id, productId: slug } },
  }).catch(() => null);

  // productId stored as slug? We use slug as productId in purchase? Need align.
  // We'll instead look up by product slug via relation. Fallback query below.
  if (!purchase) {
    // try by product relation
    const p = await prisma.purchase.findFirst({
      where: { userId: session.user.id, product: { slug }, status: "paid" },
    });
    if (!p) {
      return NextResponse.json({ error: "Purchase required" }, { status: 403 });
    }
  } else if (purchase.status !== "paid") {
    return NextResponse.json({ error: "Purchase required" }, { status: 403 });
  }

  return NextResponse.redirect(product.downloadUrl);
}
