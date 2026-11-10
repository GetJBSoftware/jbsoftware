import type { ReactNode } from "react";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-black text-white min-h-screen">
      <section className="px-6 pt-20 pb-10">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            Legal
          </p>
          <h1 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight">
            {title}
          </h1>
          <p className="mt-3 text-sm text-zinc-500">Last updated: {updated}</p>
        </div>
      </section>
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-3xl space-y-8 text-zinc-400 [&_h2]:text-xl [&_h2]:font-medium [&_h2]:text-white [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_a]:underline [&_a]:hover:text-white">
          {children}
        </div>
      </section>
    </div>
  );
}
