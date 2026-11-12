import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  Clock,
  Code2,
  Rocket,
  Shield,
  Zap,
} from "lucide-react";
import { PRODUCTS, formatPrice } from "@/lib/products";
import { Waitlist } from "@/components/waitlist";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Roadmap — JB Software",
  description:
    "Follow what we are building: JB Launcher, JB Optimizer Pro and the path to launch.",
};

const milestones = [
  {
    version: "v0.1",
    title: "Launcher core",
    status: "In progress" as const,
    body: "App indexing, instant search and keyboard navigation. The foundation of JB Launcher.",
    items: ["Local index with no telemetry", "Keyboard-first search", "Windows 10/11 support"],
  },
  {
    version: "v0.2",
    title: "Launcher beta",
    status: "Next" as const,
    body: "A signed installer, auto-updates and the settings people actually need.",
    items: ["Signed Windows installer", "Auto-update channel", "Theme and hotkey settings"],
  },
  {
    version: "v0.3",
    title: "Optimizer engine",
    status: "Planned" as const,
    body: "Safe, reversible tuning for JB Optimizer Pro, built on the same local-first rules.",
    items: ["Reversible cleanup", "Startup and background tuning", "Restore points before changes"],
  },
  {
    version: "v1.0",
    title: "Public launch",
    status: "Planned" as const,
    body: "JB Launcher goes free. JB Optimizer Pro goes on sale as a one-time purchase.",
    items: ["Free launcher download", "One-time Optimizer Pro licence", "Launch-list discount"],
  },
];

const statusStyles = {
  "In progress": "border-amber-500/20 bg-amber-500/10 text-amber-300",
  Next: "border-sky-500/20 bg-sky-500/10 text-sky-300",
  Planned: "border-white/10 bg-white/[0.03] text-zinc-400",
};

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <section className="px-6 pb-12 pt-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            Roadmap
          </p>
          <h1 className="mt-2 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
            Build in public. Ship in small steps.
          </h1>
          <p className="mt-4 max-w-2xl text-zinc-400">
            No vague promises and no fake launch dates. Here is what is actually
            in progress, what comes next, and what we are deliberately not
            building yet.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-amber-300">
              <Clock size={12} /> In progress
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1.5 text-sky-300">
              <Circle size={12} /> Next
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-zinc-400">
              <Circle size={12} /> Planned
            </span>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {PRODUCTS.map((product) => (
            <div
              key={product.slug}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-zinc-500">
                    {product.platform}
                  </p>
                  <h2 className="mt-2 text-2xl font-medium">{product.name}</h2>
                </div>
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs ${
                    product.type === "free"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-amber-500/10 text-amber-400"
                  }`}
                >
                  {formatPrice(product)}
                </span>
              </div>
              <p className="mt-3 text-sm text-zinc-400">{product.description}</p>
              <Link
                href={`/downloads#${product.slug}`}
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium hover:underline"
              >
                Product details <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-white/5 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            The path to v1.0
          </h2>
          <p className="mt-3 max-w-2xl text-zinc-400">
            Scope is intentionally small. Each milestone ships only when it is
            stable enough to be useful.
          </p>

          <ol className="mt-10 space-y-4">
            {milestones.map((milestone, index) => (
              <li key={milestone.version} className="relative pl-8">
                {index < milestones.length - 1 && (
                  <span className="absolute left-[11px] top-8 h-[calc(100%+1rem)] w-px bg-white/10" />
                )}
                <span className="absolute left-0 top-6 grid h-6 w-6 place-items-center rounded-full border border-white/10 bg-black">
                  <span className="h-2 w-2 rounded-full bg-white/60" />
                </span>
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs text-zinc-500">
                      {milestone.version}
                    </span>
                    <h3 className="text-xl font-medium">{milestone.title}</h3>
                    <span
                      className={`rounded-full border px-2.5 py-1 text-xs ${
                        statusStyles[milestone.status]
                      }`}
                    >
                      {milestone.status}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-zinc-400">{milestone.body}</p>
                  <ul className="mt-4 grid gap-2 text-sm text-zinc-300 sm:grid-cols-3">
                    {milestone.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2
                          size={14}
                          className="mt-0.5 shrink-0 text-zinc-500"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-white/5 px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <Zap className="h-6 w-6" />
            <h3 className="mt-4 font-medium">Fast by default</h3>
            <p className="mt-2 text-sm text-zinc-400">
              If a feature makes launch slower or the UI noisier, it does not
              ship.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <Shield className="h-6 w-6" />
            <h3 className="mt-4 font-medium">Local-first</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Core features work offline. No telemetry and no account required
              for the free launcher.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <Rocket className="h-6 w-6" />
            <h3 className="mt-4 font-medium">One-time pricing</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Paid tools are a single purchase. Payments will be handled by Lemon
              Squeezy at launch.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Changelog
          </h2>
          <div className="mt-8 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="font-mono text-zinc-500">November 2026</span>
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300">
                  Website
                </span>
              </div>
              <p className="mt-3 text-zinc-400">
                The public roadmap and launch list are live. JB Launcher and JB
                Optimizer Pro are in development.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="font-mono text-zinc-500">Next</span>
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-zinc-400">
                  No public release yet
                </span>
              </div>
              <p className="mt-3 text-zinc-400">
                The first public changelog entry will appear when JB Launcher
                enters beta. Until then, the GitHub issue tracker is the place to
                report bugs and request features.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={`${SITE.repo}/issues`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 font-medium transition hover:bg-white/5"
            >
              <Code2 size={16} /> GitHub Issues
            </a>
            <Link
              href="/community"
              className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-zinc-300 transition hover:text-white"
            >
              Community <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Waitlist source="roadmap" />
    </div>
  );
}
