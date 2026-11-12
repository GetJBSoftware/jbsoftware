import type { ReactNode } from "react";
import { getDict } from "@/lib/dictionary";
import type { Lang } from "@/lib/i18n";

export function LegalPage({
  title,
  updated,
  lang = "en",
  children,
}: {
  title: string;
  updated: string;
  lang?: Lang;
  children: ReactNode;
}) {
  const d = getDict(lang).legal;

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="px-6 pb-10 pt-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            {d.eyebrow}
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-zinc-500">
            {d.lastUpdated}: {updated}
          </p>
        </div>
      </section>
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-3xl space-y-8 text-zinc-400 [&_a]:underline [&_a]:hover:text-white [&_h2]:text-xl [&_h2]:font-medium [&_h2]:text-white [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
          {children}
        </div>
      </section>
    </div>
  );
}
