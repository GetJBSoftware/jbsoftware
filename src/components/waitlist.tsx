import { Bell } from "lucide-react";
import { WaitlistForm } from "@/components/waitlist-form";

export function Waitlist({ source }: { source: string }) {
  return (
    <section className="border-t border-white/5 px-6 py-20">
      <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-10">
        <div className="grid gap-8 md:grid-cols-[1.15fr_1fr] md:items-center">
          <div>
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-zinc-500">
              <Bell size={13} /> Launch list
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Be first to know when we ship.
            </h2>
            <p className="mt-3 text-zinc-400">
              Leave your email and we&apos;ll send a single message when the
              first free and paid tools are ready to download.
            </p>
          </div>
          <WaitlistForm source={source} />
        </div>
      </div>
    </section>
  );
}
