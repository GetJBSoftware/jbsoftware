import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const session = await auth();
  const { amount, projectName } = await req.json();

  const cents = Number(amount);
  if (!Number.isFinite(cents) || cents < 100) {
    return NextResponse.json({ error: "Minimum investment is $1" }, { status: 400 });
  }

  const checkout = await stripe.checkout.sessions.create({
    mode: "payment",
    ...(session?.user?.email ? { customer_email: session.user.email } : {}),
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Investment in JB Software",
            description: projectName || "JB Software roadmap",
          },
          unit_amount: cents,
        },
        quantity: 1,
      },
    ],
    metadata: {
      type: "investment",
      userId: session?.user?.id ?? "",
      projectName: projectName || "JB Software roadmap",
      amount: String(cents),
    },
    success_url: `${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/investments?success=1`,
    cancel_url: `${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/investments?canceled=1`,
  });

  return NextResponse.json({ url: checkout.url });
}
