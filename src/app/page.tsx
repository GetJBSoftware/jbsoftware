import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Download,
  TrendingUp,
  Zap,
  Shield,
  Rocket,
  Clock,
} from "lucide-react";
import { PRODUCTS } from "@/lib/products";

export default function Home() {
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="bg-black text-white">
      {/* Hero */}
      <section
        id="intro"
        className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-5xl">
          <Image
            src="/logo.jpeg"
            alt="JB Software"
            width={1408}
            height={768}
            priority
            className="mx-auto h-auto w-full max-w-xl rounded-3xl border border-white/10 shadow-[0_0_80px_rgba(255,255,255,0.08)]"
          />
          <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-zinc-300">
            <Clock size={13} className="text-amber-400" />
            Coming soon
          </p>
          <h1 className="mt-6 text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
            Software that gets out of your way.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
            We are building fast, focused desktop tools for Windows and macOS.
            Everything is in development — some tools will be free, others a
            one-time purchase. No subscriptions.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/downloads"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-8 py-3 font-medium hover:bg-zinc-200 transition"
            >
              <Download size={18} /> See what&apos;s coming
            </Link>
            <Link
              href="/investments"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-3 font-medium hover:bg-white/5 transition"
            >
              <TrendingUp size={18} /> Back the roadmap
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-500 text-xs tracking-widest">
          SCROLL
        </div>
      </section>

      {/* Value props */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="mx-auto max-w-7xl grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Zap,
              title: "Blazing fast",
              body: "Native-feeling apps that launch in milliseconds and stay out of your way.",
            },
            {
              icon: Shield,
              title: "Privacy first",
              body: "No telemetry, no tracking. Your data stays on your machine.",
            },
            {
              icon: Rocket,
              title: "One-time pricing",
              body: "Paid tools are planned as a single purchase with lifetime updates.",
            },
          ].map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-8"
            >
              <v.icon className="h-8 w-8 text-white" />
              <h3 className="mt-4 text-xl font-medium">{v.title}</h3>
              <p className="mt-2 text-zinc-400">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Downloads preview */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                Downloads
              </p>
              <h2 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight">
                What we&apos;re building
              </h2>
            </div>
            <Link
              href="/downloads"
              className="hidden md:inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white"
            >
              View roadmap <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featured.map((p) => (
              <div
                key={p.slug}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 flex flex-col"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs uppercase tracking-widest text-zinc-500">
                    {p.platform}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2 py-1 text-xs text-amber-300">
                    <Clock size={12} /> Coming soon
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-medium">{p.name}</h3>
                <p className="mt-2 text-zinc-400 flex-1">{p.description}</p>
                <p className="mt-4 text-xs uppercase tracking-widest text-zinc-500">
                  {p.type === "free" ? "Planned to be free" : "Planned paid tool"}
                </p>
                <Link
                  href="/downloads"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium hover:underline"
                >
                  Details <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investments preview */}
      <section className="py-24 px-6 border-t border-white/5 bg-gradient-to-b from-black to-zinc-950">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            Investments
          </p>
          <h2 className="mt-2 text-4xl md:text-6xl font-semibold tracking-tight">
            Back the future of JB Software.
          </h2>
          <p className="mt-6 text-lg text-zinc-400">
            Support our roadmap with a one-time contribution. Every contribution
            funds new features, new platforms and better tools for everyone.
          </p>
          <Link
            href="/investments"
            className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-8 py-3 font-medium hover:bg-zinc-200 transition"
          >
            <TrendingUp size={18} /> Become an investor
          </Link>
        </div>
      </section>
    </div>
  );
}
