import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { PRODUCTS } from "@/lib/products";
import { DownloadGrid } from "@/components/download-grid";
import { Clock } from "lucide-react";
import { Waitlist } from "@/components/waitlist";

export const dynamic = "force-dynamic";

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
    <div className="bg-black text-white min-h-screen">
      <section className="px-6 pt-20 pb-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            Downloads
          </p>
          <h1 className="mt-2 text-4xl md:text-6xl font-semibold tracking-tight">
            What we&apos;re building next.
          </h1>
          <p className="mt-4 text-zinc-400 max-w-2xl">
            Everything below is still in development. Some tools are planned to
            be free; others will be a one-time purchase. No subscriptions, no
            nonsense — just software we would use ourselves.
          </p>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-amber-300">
            <Clock size={13} /> Roadmap · Coming soon
          </p>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl">
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
