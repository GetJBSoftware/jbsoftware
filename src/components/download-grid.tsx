"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Download, Lock, Loader2, Check, Clock } from "lucide-react";
import type { Product } from "@/lib/products";

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
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert(data.error ?? "Checkout failed");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => {
        const isOwned = owned.includes(p.slug);
        const loading = busy === p.slug;
        const available = p.status === "available";

        return (
          <div
            key={p.slug}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 flex flex-col"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-zinc-500">{p.platform}</span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  p.type === "free"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-amber-500/10 text-amber-400"
                }`}
              >
                {p.type === "free" ? "Free" : "Paid"}
              </span>
            </div>

            <h3 className="mt-4 text-2xl font-medium">{p.name}</h3>
            <p className="mt-2 inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-300/80">
              <Clock size={12} /> Coming soon
            </p>
            <p className="mt-3 text-zinc-400 flex-1">{p.description}</p>
            <p className="mt-3 text-sm text-zinc-500">{p.longDescription}</p>

            <div className="mt-6">
              {!available ? (
                <button
                  type="button"
                  disabled
                  className="w-full inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 font-medium text-zinc-400"
                >
                  <Clock size={16} /> Coming soon
                </button>
              ) : p.type === "free" ? (
                <a
                  href={`/api/download/${p.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-5 py-2.5 font-medium hover:bg-zinc-200 transition"
                >
                  <Download size={16} />
                  Download
                </a>
              ) : isOwned ? (
                <a
                  href={`/api/download/${p.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 text-black px-5 py-2.5 font-medium hover:bg-emerald-400 transition"
                >
                  <Check size={16} />
                  Download (owned)
                </a>
              ) : (
                <button
                  onClick={() => handleBuy(p.slug)}
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-2.5 font-medium hover:bg-white/5 transition disabled:opacity-60"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Lock size={16} />}
                  {p.type === "paid" && p.price > 0
                    ? `Buy for $${(p.price / 100).toFixed(0)}`
                    : "Buy"}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
