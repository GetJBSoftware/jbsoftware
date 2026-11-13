import Link from "next/link";
import {
  ArrowRight,
  Check,
  Clock,
  Compass,
  Rocket,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import { PRODUCTS, formatPrice } from "@/lib/products";
import { Waitlist } from "@/components/waitlist";
import { LauncherPreview } from "@/components/launcher-preview";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "JB Software — Coming soon",
  description:
    "JB Software builds fast, focused desktop tools for Windows. A free command bar, a local search engine and a workspace manager are in development.",
  alternates: {
    canonical: "/",
    languages: { en: "/", es: "/es" },
  },
};

export default function Home() {
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="bg-black text-white">
      {/* Hero */}
      <section
        id="intro"
        className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden px-6 py-20 text-center"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-5xl">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <p className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-amber-300">
              <Clock size={13} /> Coming soon
            </p>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-zinc-300">
              <Sparkles size={13} /> Built on first principles
            </p>
          </div>
          <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            Software that gets out of your way.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400 md:text-xl">
            We are building fast, focused desktop tools for Windows. Everything
            is in development — some tools are free, others add optional paid
            licences. Pricing will be published before launch.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="#waitlist"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 font-medium text-black transition hover:bg-zinc-200"
            >
              Join the waitlist <ArrowRight size={18} />
            </Link>
            <Link
              href="/roadmap"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-3 font-medium transition hover:bg-white/5"
            >
              <Compass size={18} /> See the roadmap
            </Link>
          </div>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-zinc-500">
            <li className="inline-flex items-center gap-1.5">
              <Check size={13} /> Windows 10/11
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Check size={13} /> Free and paid tiers
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Check size={13} /> No telemetry
            </li>
          </ul>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-widest text-zinc-500">
          SCROLL
        </div>
      </section>

      {/* Value props */}
      <section className="border-t border-white/5 px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
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
              title: "Fair pricing",
              body: "Start free and upgrade only when a paid feature earns it. Pricing will be published before launch.",
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

      <LauncherPreview />

      {/* Downloads preview */}
      <section className="border-t border-white/5 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                The first three tools
              </p>
              <h2 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
                Three tools. Zero bloat.
              </h2>
              <p className="mt-3 max-w-2xl text-zinc-400">
                A free command bar for everyday file tasks, a local search
                engine that finds things by content, and a workspace manager
                that keeps your machine ready for anything.
              </p>
            </div>
            <Link
              href="/downloads"
              className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white"
            >
              All downloads <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <div
                key={p.slug}
                className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8"
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
                <p className="mt-2 flex-1 text-zinc-400">{p.description}</p>

                <ul className="mt-5 space-y-2 text-sm text-zinc-300">
                  {p.highlights.slice(0, 3).map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check size={15} className="mt-0.5 shrink-0 text-emerald-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-5">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-zinc-500">
                      Planned price
                    </p>
                    <p className="mt-1 text-lg font-medium">{formatPrice(p)}</p>
                  </div>
                  <Link
                    href={`/downloads#${p.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
                  >
                    Details <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Build in public */}
      <section className="px-6 pb-4">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-medium">Built in public.</p>
            <p className="mt-1 text-sm text-zinc-400">
              Follow progress on the roadmap, report a bug, or request a feature
              on GitHub.
            </p>
          </div>
          <a
            href={`${SITE.repo}/issues`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium transition hover:bg-white/5"
          >
            Open GitHub Issues <ArrowRight size={15} />
          </a>
        </div>
      </section>

      <Waitlist source="home" />
    </div>
  );
}
