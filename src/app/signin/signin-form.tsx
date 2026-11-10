"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle, Loader2, LogIn } from "lucide-react";
import { GoogleMark } from "@/components/google-mark";

export function SignInForm({ googleEnabled }: { googleEnabled: boolean }) {
  const params = useSearchParams();
  const router = useRouter();
  const callbackUrl = params.get("callbackUrl") ?? "/account";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [googleBusy, setGoogleBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError(null);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      redirectTo: callbackUrl,
    });

    setBusy(false);

    if (!result?.ok) {
      setError("Wrong email or password. Please try again.");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.02] p-8">
        <h1 className="text-3xl font-semibold tracking-tight">Sign in</h1>
        <p className="mt-2 text-zinc-400">
          Access your downloads and track your investments.
        </p>

        {error && (
          <div className="mt-6 flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm text-zinc-300">Email</span>
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none focus:border-white/30"
              placeholder="you@example.com"
            />
          </label>

          <label className="block">
            <span className="text-sm text-zinc-300">Password</span>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none focus:border-white/30"
              placeholder="••••••••"
            />
          </label>

          <button
            type="submit"
            disabled={busy}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-5 py-3 font-medium hover:bg-zinc-200 transition disabled:opacity-60"
          >
            {busy ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <LogIn size={18} />
            )}
            Sign in
          </button>
        </form>

        {googleEnabled && (
          <>
            <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-widest text-zinc-600">
              <span className="h-px flex-1 bg-white/10" />
              or
              <span className="h-px flex-1 bg-white/10" />
            </div>

            <button
              type="button"
              disabled={googleBusy}
              onClick={() => {
                setGoogleBusy(true);
                void signIn("google", { redirectTo: callbackUrl });
              }}
              className="w-full inline-flex items-center justify-center gap-3 rounded-full border border-white/15 px-5 py-3 font-medium hover:bg-white/5 transition disabled:opacity-60"
            >
              {googleBusy ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <GoogleMark />
              )}
              Continue with Google
            </button>
          </>
        )}

        <p className="mt-6 text-sm text-zinc-400 text-center">
          New here?{" "}
          <Link
            href={`/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`}
            className="text-white underline underline-offset-4"
          >
            Create an account
          </Link>
        </p>

        <p className="mt-6 text-xs text-zinc-500 text-center">
          By signing in you agree to our{" "}
          <Link href="/terms" className="underline hover:text-zinc-300">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-zinc-300">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}


