"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, Check, Clock, Download, Loader2, Lock } from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";

interface Props {
  products: Product[];
  owned: string[];
  isSignedIn: boolean;
}

export function DownloadGrid({ products, owned, isSignedIn }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  async function handleBuy(slug: string) {
    if (!isSignedIn) {
      router.push("/signin?callbackUrl=/downloads");
      return;
    }
    setBusy(slug);
    try {
      const res = await fetch("/api/checkout/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const data = await res.json().catch(() => ({}));
      if (data.url) window.location.href = data.url;
      else alert(data.error ?? "Checkout is not open yet.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {products.map((p) => {
        const isOwned = owned.includes(p.slug);
        const loading = busy === p.slug;
        const available = p.status === "available";

        return (
          <div
            key={p.slug}
            id={p.slug}
            className="flex scroll-mt-24 flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-zinc-500">{p.platform}</span>
              <span
                className={`rounded-full px-2 py-1 text-xs ${
                  p.type === "free"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-amber-500/10 text-amber-400"
                }`}
              >
                {formatPrice(p)}
              </span>
            </div>

            <h3 className="mt-4 text-2xl font-medium">{p.name}</h3>
            <p className="mt-2 inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-300/80">
              <Clock size={12} /> Coming soon
            </p>
            <p className="mt-3 text-zinc-400">{p.description}</p>

            <ul className="mt-5 space-y-2 text-sm text-zinc-300">
              {p.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check size={15} className="mt-0.5 shrink-0 text-emerald-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-5 flex-1 text-sm text-zinc-500">
              {p.longDescription}
            </p>

            <div className="mt-6 space-y-3">
              {!available ? (
                <button
                  type="button"
                  disabled
                  className="inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 font-medium text-zinc-400"
                >
                  <Clock size={16} /> Coming soon
                </button>
              ) : p.type === "free" ? (
                <a
                  href={`/api/download/${p.slug}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 font-medium text-black transition hover:bg-zinc-200"
                >
                  <Download size={16} />
                  Download free
                </a>
              ) : isOwned ? (
                <a
                  href={`/api/download/${p.slug}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 font-medium text-black transition hover:bg-emerald-400"
                >
                  <Check size={16} />
                  Download (owned)
                </a>
              ) : (
                <button
                  onClick={() => handleBuy(p.slug)}
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-2.5 font-medium transition hover:bg-white/5 disabled:opacity-60"
                >
                  {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Lock size={16} />
                  )}
                  Buy for ${(p.price / 100).toFixed(0)}
                </button>
              )}

              <Link
                href="#waitlist"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2 text-sm text-zinc-400 transition hover:text-white"
              >
                <Bell size={14} /> Get notified at launch
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
