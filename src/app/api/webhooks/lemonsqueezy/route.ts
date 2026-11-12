import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface LemonSqueezyWebhook {
  meta?: {
    event_name?: string;
    custom_data?: {
      user_id?: string;
      product_id?: string;
      product_slug?: string;
    };
  };
  data?: {
    id?: string;
    attributes?: {
      status?: string;
      total?: number;
      currency?: string;
    };
  };
}

function isValidSignature(body: string, signature: string, secret: string) {
  const digest = createHmac("sha256", secret).update(body).digest("hex");
  if (digest.length !== signature.length) return false;
  return timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
}

export async function POST(req: Request) {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  const signature = req.headers.get("x-signature");

  if (!secret || !signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const body = await req.text();
  if (!isValidSignature(body, signature, secret)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let event: LemonSqueezyWebhook;
  try {
    event = JSON.parse(body) as LemonSqueezyWebhook;
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const eventName = event.meta?.event_name;
  const orderId = event.data?.id ? String(event.data.id) : "";
  const attributes = event.data?.attributes ?? {};

  if (eventName === "order_created" && orderId) {
    const custom = event.meta?.custom_data ?? {};
    const userId = custom.user_id;
    const productId = custom.product_id;

    if (userId && productId) {
      await prisma.purchase.upsert({
        where: { providerOrderId: orderId },
        update: {
          status: attributes.status ?? "paid",
          amount: Number(attributes.total ?? 0),
          currency: attributes.currency ?? "usd",
        },
        create: {
          userId,
          productId,
          provider: "lemonsqueezy",
          providerOrderId: orderId,
          amount: Number(attributes.total ?? 0),
          currency: attributes.currency ?? "usd",
          status: attributes.status ?? "paid",
        },
      });
    }
  }

  if (eventName === "order_refunded" && orderId) {
    await prisma.purchase.updateMany({
      where: { providerOrderId: orderId },
      data: { status: "refunded" },
    });
  }

  return NextResponse.json({ received: true });
}
