"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle, Loader2, UserPlus } from "lucide-react";
import { GoogleMark } from "@/components/google-mark";
import { getDict } from "@/lib/dictionary";
import { lhref, type Lang } from "@/lib/i18n";

export function SignUpForm({
  googleEnabled,
  lang = "en",
}: {
  googleEnabled: boolean;
  lang?: Lang;
}) {
  const params = useSearchParams();
  const router = useRouter();
  const d = getDict(lang).auth;
  const accountPath = lhref(lang, "/account");
  const callbackUrl = params.get("callbackUrl") ?? accountPath;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [googleBusy, setGoogleBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError(d.passwordsMismatch);
      return;
    }

    setBusy(true);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, lang }),
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setBusy(false);
      setError(data.error ?? d.genericError);
      return;
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      redirectTo: callbackUrl,
    });

    setBusy(false);

    if (!result?.ok) {
      router.push(
        `${lhref(lang, "/signin")}?callbackUrl=${encodeURIComponent(callbackUrl)}`
      );
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6 py-20 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.02] p-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          {d.signUpTitle}
        </h1>
        <p className="mt-2 text-zinc-400">{d.signUpSubtitle}</p>

        {error && (
          <div className="mt-6 flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm text-zinc-300">{d.name}</span>
            <input
              type="text"
              autoComplete="name"
              required
              minLength={2}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none focus:border-white/30"
              placeholder={d.namePlaceholder}
            />
          </label>

          <label className="block">
            <span className="text-sm text-zinc-300">{d.email}</span>
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none focus:border-white/30"
              placeholder={d.emailPlaceholder}
            />
          </label>

          <label className="block">
            <span className="text-sm text-zinc-300">{d.password}</span>
            <input
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none focus:border-white/30"
              placeholder={d.passwordHint}
            />
          </label>

          <label className="block">
            <span className="text-sm text-zinc-300">{d.confirmPassword}</span>
            <input
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none focus:border-white/30"
              placeholder={d.confirmPlaceholder}
            />
          </label>

          <button
            type="submit"
            disabled={busy}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 font-medium text-black transition hover:bg-zinc-200 disabled:opacity-60"
          >
            {busy ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <UserPlus size={18} />
            )}
            {d.signUpButton}
          </button>
        </form>

        {googleEnabled && (
          <>
            <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-widest text-zinc-600">
              <span className="h-px flex-1 bg-white/10" />
              {d.or}
              <span className="h-px flex-1 bg-white/10" />
            </div>

            <button
              type="button"
              disabled={googleBusy}
              onClick={() => {
                setGoogleBusy(true);
                void signIn("google", { redirectTo: callbackUrl });
              }}
              className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/15 px-5 py-3 font-medium transition hover:bg-white/5 disabled:opacity-60"
            >
              {googleBusy ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <GoogleMark />
              )}
              {d.googleSignUp}
            </button>
          </>
        )}

        <p className="mt-6 text-center text-sm text-zinc-400">
          {d.alreadyHave}{" "}
          <Link
            href={`${lhref(lang, "/signin")}?callbackUrl=${encodeURIComponent(
              callbackUrl
            )}`}
            className="text-white underline underline-offset-4"
          >
            {d.signInLink}
          </Link>
        </p>

        <p className="mt-6 text-center text-xs text-zinc-500">
          {d.agreementSignUp}{" "}
          <Link
            href={lhref(lang, "/terms")}
            className="underline hover:text-zinc-300"
          >
            {d.terms}
          </Link>{" "}
          {d.and}{" "}
          <Link
            href={lhref(lang, "/privacy")}
            className="underline hover:text-zinc-300"
          >
            {d.privacy}
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
