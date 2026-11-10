import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { PRODUCTS } from "@/lib/products";
import { DownloadGrid } from "@/components/download-grid";

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
            Software for every workflow.
          </h1>
          <p className="mt-4 text-zinc-400 max-w-2xl">
            Free tools you can use today. Premium tools you pay for once and own
            forever. Sign in to download paid software on any device.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <DownloadGrid products={PRODUCTS} owned={owned} isSignedIn={!!session?.user} />
        </div>
      </section>
    </div>
  );
}
