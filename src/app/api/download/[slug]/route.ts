import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getProduct } from "@/lib/products";
import { getBaseUrl } from "@/lib/url";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (
    !product ||
    product.status !== "available" ||
    !product.downloadUrl
  ) {
    return NextResponse.json(
      { error: "This download is not available yet." },
      { status: 404 }
    );
  }

  if (product.type === "free") {
    return NextResponse.redirect(product.downloadUrl);
  }

  const session = await auth();
  if (!session?.user?.id) {
    const url = new URL("/signin", getBaseUrl(req));
    url.searchParams.set("callbackUrl", "/downloads");
    return NextResponse.redirect(url);
  }

  const purchase = await prisma.purchase.findFirst({
    where: {
      userId: session.user.id,
      product: { slug },
      status: "paid",
    },
    select: { id: true },
  });

  if (!purchase) {
    return NextResponse.json({ error: "Purchase required" }, { status: 403 });
  }

  return NextResponse.redirect(product.downloadUrl);
}
