import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !secret) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const body = await req.text();
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const meta = session.metadata ?? {};

    if (meta.type === "product") {
      const userId = meta.userId;
      const productId = meta.productId;
      const amount = session.amount_total ?? 0;
      const currency = session.currency ?? "usd";
      if (userId && productId) {
        await prisma.purchase.upsert({
          where: { stripeSessionId: session.id },
          update: { status: "paid", amount, currency },
          create: {
            userId,
            productId,
            stripeSessionId: session.id,
            amount,
            currency,
            status: "paid",
          },
        });
      }
    } else if (meta.type === "investment") {
      const userId = meta.userId || null;
      const amount = Number(meta.amount) || session.amount_total || 0;
      const currency = session.currency ?? "usd";
      const projectName = meta.projectName || "JB Software roadmap";
      await prisma.investment.upsert({
        where: { stripeSessionId: session.id },
        update: { status: "paid", amount, currency },
        create: {
          userId: userId || null,
          amount,
          currency,
          stripeSessionId: session.id,
          status: "paid",
          projectName,
        },
      });
    }
  }

  return NextResponse.json({ received: true });
}
