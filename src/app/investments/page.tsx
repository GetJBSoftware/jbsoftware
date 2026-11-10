import { InvestmentsClient } from "@/components/investments-client";

export default function InvestmentsPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <section className="px-6 pt-20 pb-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            Investments
          </p>
          <h1 className="mt-2 text-4xl md:text-6xl font-semibold tracking-tight">
            Back the future of JB Software.
          </h1>
          <p className="mt-4 text-zinc-400 max-w-2xl">
            Support our roadmap with a one-time investment. Every contribution
            funds new features, new platforms and better tools for everyone.
          </p>
        </div>
      </section>
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-4xl">
          <InvestmentsClient />
        </div>
      </section>
    </div>
  );
}
