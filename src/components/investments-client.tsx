"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TrendingUp, Loader2, Heart } from "lucide-react";

const tiers = [
  { amount: 1000, label: "$10", desc: "Coffee for the team" },
  { amount: 5000, label: "$50", desc: "Support a feature" },
  { amount: 10000, label: "$100", desc: "Power user" },
  { amount: 50000, label: "$500", desc: "Champion" },
];

export function InvestmentsClient() {
  const router = useRouter();
  const [busy, setBusy] = useState<number | null>(null);
  const [custom, setCustom] = useState("");
  const [project, setProject] = useState("JB Software roadmap");

  async function invest(amount: number) {
    setBusy(amount);
    try {
      const res = await fetch("/api/checkout/investment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, projectName: project }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else if (res.status === 401) router.push("/signin?callbackUrl=/investments");
      else alert(data.error ?? "Checkout failed");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {tiers.map((t) => (
          <button
            key={t.amount}
            onClick={() => invest(t.amount)}
            disabled={busy !== null}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-left hover:bg-white/[0.05] transition disabled:opacity-60"
          >
            <div className="text-3xl font-semibold">{t.label}</div>
            <div className="mt-1 text-sm text-zinc-400">{t.desc}</div>
            <div className="mt-4 inline-flex items-center gap-2 text-sm text-zinc-300">
              {busy === t.amount ? <Loader2 size={14} className="animate-spin" /> : <Heart size={14} />}
              Invest
            </div>
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <h3 className="text-lg font-medium">Custom amount</h3>
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center rounded-full border border-white/10 bg-black px-4">
            <span className="text-zinc-500">$</span>
            <input
              type="number"
              min="1"
              step="1"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="25"
              className="flex-1 bg-transparent px-2 py-2.5 outline-none"
            />
          </div>
          <button
            onClick={() => {
              const cents = Math.round(parseFloat(custom || "0") * 100);
              if (cents >= 100) invest(cents);
              else alert("Minimum investment is $1");
            }}
            disabled={busy !== null}
            className="rounded-full bg-white text-black px-6 py-2.5 font-medium hover:bg-zinc-200 transition disabled:opacity-60 inline-flex items-center gap-2"
          >
            {busy !== null && busy.toString() === custom ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <TrendingUp size={16} />
            )}
            Invest
          </button>
        </div>
      </div>

      <p className="text-xs text-zinc-500">
        Payments are processed securely by Stripe. Investments are one-time
        contributions and are not equity or financial instruments.
      </p>
    </div>
  );
}
