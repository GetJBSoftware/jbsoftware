import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { PRODUCTS } from "@/lib/products";
import { DownloadGrid } from "@/components/download-grid";
import { ArrowRight, Clock } from "lucide-react";
import { Waitlist } from "@/components/waitlist";
import { lhref } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Descargas — JB Software",
  description:
    "JB Launcher (gratis), JB Search (demo gratis + licencia de pago) y JB Workplace (freemium) están en desarrollo. Únete a la lista de lanzamiento.",
  alternates: {
    canonical: "/es/downloads",
    languages: { en: "/downloads", es: "/es/downloads" },
  },
  openGraph: {
    title: "Descargas — JB Software",
    description:
      "JB Launcher (gratis), JB Search (demo gratis + licencia de pago) y JB Workplace (freemium) están en desarrollo.",
    url: "/es/downloads",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Descargas — JB Software",
    description:
      "JB Launcher (gratis), JB Search (demo gratis + licencia de pago) y JB Workplace (freemium) están en desarrollo.",
    images: ["/og.png"],
  },
};

export default async function DownloadsPageEs() {
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
            Descargas
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-6xl">
            Tres herramientas, muy pronto.
          </h1>
          <p className="mt-4 max-w-2xl text-zinc-400">
            JB Launcher es completamente gratis. JB Search incluye una demo
            gratuita y una licencia de pago opcional. JB Workplace se puede
            descargar gratis, con funciones Pro para flujos de trabajo
            avanzados. Todo sigue en desarrollo: no habrá descargas ni pagos
            hasta que esté listo.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <p className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-amber-300">
              <Clock size={13} /> Próximamente
            </p>
            <Link
              href={lhref("es", "/roadmap")}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-zinc-300 transition hover:bg-white/[0.06]"
            >
              Ver el roadmap <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <DownloadGrid
            products={PRODUCTS}
            owned={owned}
            isSignedIn={!!session?.user}
            lang="es"
          />
        </div>
      </section>

      <Waitlist source="downloads" lang="es" />
    </div>
  );
}
