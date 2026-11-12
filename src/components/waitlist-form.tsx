"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { getDict } from "@/lib/dictionary";
import type { Lang } from "@/lib/i18n";

export function WaitlistForm({
  source = "site",
  lang = "en",
}: {
  source?: string;
  lang?: Lang;
}) {
  const d = getDict(lang).waitlistForm;
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError(null);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, lang }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error ?? d.error);
        return;
      }

      setDone(true);
      setEmail("");
    } catch {
      setError(d.error);
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5 text-sm text-emerald-200">
        <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
        <p>{d.done}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="flex-1">
          <span className="sr-only">{d.emailLabel}</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={d.placeholder}
            autoComplete="email"
            className="w-full rounded-full border border-white/10 bg-black px-5 py-3 text-sm outline-none focus:border-white/30"
          />
        </label>
        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-black transition hover:bg-zinc-200 disabled:opacity-60"
        >
          {busy ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Send size={16} />
          )}
          {d.submit}
        </button>
      </div>

      {error && (
        <p className="flex items-start gap-2 text-sm text-red-300">
          <AlertCircle size={15} className="mt-0.5 shrink-0" />
          {error}
        </p>
      )}

      <p className="text-xs text-zinc-500">{d.note}</p>
    </form>
  );
}
