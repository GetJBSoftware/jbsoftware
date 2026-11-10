import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const waitlistSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email("Enter a valid email.")),
  source: z.string().trim().max(40).optional(),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = waitlistSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Enter a valid email." },
      { status: 400 }
    );
  }

  const { email, source } = parsed.data;

  try {
    // Idempotent: signing up twice is fine and never leaks whether the email
    // was already on the list.
    await prisma.waitlistEntry.upsert({
      where: { email },
      update: {},
      create: { email, source: source ?? "site" },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "We could not save your email. Please try again." },
      { status: 500 }
    );
  }
}
