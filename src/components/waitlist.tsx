import { Bell, Gift } from "lucide-react";
import { WaitlistForm } from "@/components/waitlist-form";
import { getDict } from "@/lib/dictionary";
import type { Lang } from "@/lib/i18n";

export function Waitlist({
  source,
  lang = "en",
}: {
  source: string;
  lang?: Lang;
}) {
  const d = getDict(lang).waitlist;

  return (
    <section
      id="waitlist"
      className="scroll-mt-20 border-t border-white/5 px-6 py-20"
    >
      <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-10">
        <div className="grid gap-8 md:grid-cols-[1.15fr_1fr] md:items-center">
          <div>
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-zinc-500">
              <Bell size={13} /> {d.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              {d.titleLine1}
              <br />
              {d.titleLine2}
            </h2>
            <p className="mt-3 text-zinc-400">{d.body}</p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-300">
              <Gift size={13} /> {d.perk}
            </p>
          </div>
          <WaitlistForm source={source} lang={lang} />
        </div>
      </div>
    </section>
  );
}
