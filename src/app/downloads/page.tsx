import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { PRODUCTS } from "@/lib/products";
import { DownloadGrid } from "@/components/download-grid";
import { ArrowRight, Clock } from "lucide-react";
import { Waitlist } from "@/components/waitlist";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Downloads — JB Software",
  description:
    "JB Launcher (free) and JB Optimizer Pro (one-time purchase) are in development. Join the launch list.",
};

export default async function DownloadsPage() {
  const session = await auth();
  let owned: string[] = [];
  if (session?.user?.id) {
    const purchases = await prisma.purchase.findMany({
      where: { userId: session.user.id, status: "paid" },
      include: { product: { select: { slug: true } } },
    });
    owned = purchases.map((p) => p.product.slug);
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="px-6 pb-12 pt-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            Downloads
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-6xl">
            Two tools, shipping soon.
          </h1>
          <p className="mt-4 max-w-2xl text-zinc-400">
            JB Launcher is planned as a free download. JB Optimizer Pro is a
            one-time purchase with lifetime updates. Both are still in
            development — no downloads or payments until they are ready.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <p className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-amber-300">
              <Clock size={13} /> Coming soon
            </p>
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-zinc-300 transition hover:bg-white/[0.06]"
            >
              View the roadmap <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl">
          <DownloadGrid
            products={PRODUCTS}
            owned={owned}
            isSignedIn={!!session?.user}
          />
        </div>
      </section>

      <Waitlist source="downloads" />
    </div>
  );
}
