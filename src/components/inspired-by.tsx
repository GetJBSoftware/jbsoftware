import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";

const principles = ["First principles", "Ship fast", "Make the future exciting"];

export function InspiredBy() {
  return (
    <section id="inspired" className="border-t border-white/5 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="ml-auto max-w-3xl">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] via-white/[0.02] to-transparent p-px">
            <div className="rounded-[calc(1.5rem-1px)] bg-black/70 p-6 md:p-8">
              <div className="flex flex-col gap-6 sm:flex-row">
                <div className="shrink-0">
                  <Image
                    src="/elon-musk.jpg"
                    alt="Elon Musk"
                    width={800}
                    height={988}
                    sizes="128px"
                    className="h-40 w-32 rounded-2xl border border-white/10 object-cover object-top grayscale transition duration-500 hover:grayscale-0"
                  />
                </div>

                <div className="min-w-0">
                  <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-zinc-500">
                    <Sparkles size={13} /> Inspired by
                  </p>
                  <h2 className="mt-2 text-2xl font-medium tracking-tight md:text-3xl">
                    Elon Musk
                  </h2>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-zinc-500">
                    Engineer · Founder · First-principles thinker
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                    We like the way he frames a problem: strip it down to its
                    physics, question every assumption, then build the simplest
                    version that actually works. And we like that he treats the
                    future as something you build rather than predict. JB
                    Software is a small attempt at that mindset — fewer features,
                    less noise, and tools that feel inevitable.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {principles.map((p) => (
                      <span
                        key={p}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-zinc-400"
                      >
                        {p}
                      </span>
                    ))}
                  </div>

                  <a
                    href="https://en.wikipedia.org/wiki/Elon_Musk"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-1 text-sm text-zinc-300 underline-offset-4 hover:text-white hover:underline"
                  >
                    Read about him <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              <p className="mt-6 border-t border-white/5 pt-4 text-[11px] leading-relaxed text-zinc-600">
                A tribute, not an endorsement. JB Software is not affiliated with
                Elon Musk, Tesla, SpaceX or X. Photo: U.S. Air Force / Trevor
                Cokley, public domain.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
