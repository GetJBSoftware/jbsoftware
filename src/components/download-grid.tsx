"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Download, Lock, Loader2, Check } from "lucide-react";
import type { Product } from "@/lib/products";

interface Props {
  products: Product[];
  owned: string[];
  isSignedIn: boolean;
}

export function DownloadGrid({ products, owned, isSignedIn }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  async function handleFree(slug: string) {
    setBusy(slug);
    window.location.href = `/api/download/${slug}`;
    setTimeout(() => setBusy(null), 1500);
  }

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

  async function handlePaidDownload(slug: string) {
    setBusy(slug);
    window.location.href = `/api/download/${slug}`;
    setTimeout(() => setBusy(null), 1500);
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => {
        const isOwned = owned.includes(p.slug);
        const loading = busy === p.slug;
        return (
          <div
            key={p.slug}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 flex flex-col"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-500">{p.platform}</span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  p.type === "free"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-amber-500/10 text-amber-400"
                }`}
              >
                {p.type === "free" ? "Free" : `$${(p.price / 100).toFixed(0)}`}
              </span>
            </div>
            <h3 className="mt-4 text-2xl font-medium">{p.name}</h3>
            <p className="mt-1 text-xs text-zinc-500">v{p.version}</p>
            <p className="mt-3 text-zinc-400 flex-1">{p.description}</p>
            <p className="mt-3 text-sm text-zinc-500">{p.longDescription}</p>

            <div className="mt-6">
              {p.type === "free" ? (
                <button
                  onClick={() => handleFree(p.slug)}
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-5 py-2.5 font-medium hover:bg-zinc-200 transition disabled:opacity-60"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                  Download
                </button>
              ) : isOwned ? (
                <button
                  onClick={() => handlePaidDownload(p.slug)}
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 text-black px-5 py-2.5 font-medium hover:bg-emerald-400 transition disabled:opacity-60"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                  Download (owned)
                </button>
              ) : (
                <button
                  onClick={() => handleBuy(p.slug)}
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-2.5 font-medium hover:bg-white/5 transition disabled:opacity-60"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Lock size={16} />}
                  Buy for ${(p.price / 100).toFixed(0)}
                </button>
              )}
            </div>
            {p.githubRelease && (
              <a
                href={p.githubRelease}
                target="_blank"
                rel="noreferrer"
                className="mt-3 text-xs text-zinc-500 hover:text-white text-center"
              >
                Release notes on GitHub
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
}
