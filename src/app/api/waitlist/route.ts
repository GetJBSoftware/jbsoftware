import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { dict } from "@/lib/dictionary";
import type { Lang } from "@/lib/i18n";

const langSchema = z.enum(["en", "es"]).optional();

function langOf(value: unknown): Lang {
  const parsed = langSchema.safeParse(value);
  return parsed.success && parsed.data ? parsed.data : "en";
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const lang = langOf(
    body && typeof body === "object" && "lang" in body ? body.lang : undefined
  );
  const messages = dict[lang].api;

  const waitlistSchema = z.object({
    email: z
      .string()
      .trim()
      .toLowerCase()
      .pipe(z.email(messages.invalidEmail)),
    source: z.string().trim().max(40).optional(),
    lang: langSchema,
  });

  const parsed = waitlistSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? messages.invalidEmail },
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
      { error: messages.waitlistFailed },
      { status: 500 }
    );
  }
}
