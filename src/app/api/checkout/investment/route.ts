import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { isStripeConfigured, stripe } from "@/lib/stripe";
import { getBaseUrl } from "@/lib/url";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isStripeConfigured) {
    return NextResponse.json(
      { error: "Payments are not configured yet." },
      { status: 503 }
    );
  }

  const body = await req.json().catch(() => null);
  const cents = Number(body?.amount);
  const projectName =
    typeof body?.projectName === "string" && body.projectName.trim()
      ? body.projectName.trim().slice(0, 120)
      : "JB Software roadmap";

  if (!Number.isFinite(cents) || cents < 100) {
    return NextResponse.json(
      { error: "Minimum contribution is $1" },
      { status: 400 }
    );
  }

  if (cents > 1_000_000) {
    return NextResponse.json(
      { error: "Please contact us for contributions above $10,000." },
      { status: 400 }
    );
  }

  const baseUrl = getBaseUrl(req);

  const checkout = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: session.user.email ?? undefined,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Contribution to JB Software",
            description: projectName,
          },
          unit_amount: Math.round(cents),
        },
        quantity: 1,
      },
    ],
    metadata: {
      type: "investment",
      userId: session.user.id,
      projectName,
      amount: String(Math.round(cents)),
    },
    success_url: `${baseUrl}/investments?success=1`,
    cancel_url: `${baseUrl}/investments?canceled=1`,
  });

  return NextResponse.json({ url: checkout.url });
}
