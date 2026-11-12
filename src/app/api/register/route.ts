import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
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

  const registerSchema = z.object({
    name: z.string().trim().min(2, messages.nameRequired).max(80),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .pipe(z.email(messages.invalidEmail)),
    password: z
      .string()
      .min(8, messages.passwordShort)
      .max(128, messages.passwordLong),
    lang: langSchema,
  });

  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? messages.invalidDetails },
      { status: 400 }
    );
  }

  const { name, email, password } = parsed.data;

  const existing = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });
  if (existing) {
    return NextResponse.json(
      { error: messages.emailTaken },
      { status: 409 }
    );
  }

  try {
    const passwordHash = await hashPassword(password);
    await prisma.user.create({
      data: { name, email, passwordHash },
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: messages.registerFailed },
      { status: 500 }
    );
  }
}
