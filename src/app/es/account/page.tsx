import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getDict } from "@/lib/dictionary";
import { lhref } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Cuenta — JB Software",
  description: "Gestiona tu cuenta de JB Software.",
  alternates: {
    canonical: "/es/account",
    languages: { en: "/account", es: "/es/account" },
  },
};

export default async function AccountPageEs() {
  const session = await auth();
  if (!session?.user) {
    redirect(`${lhref("es", "/signin")}?callbackUrl=${encodeURIComponent("/es/account")}`);
  }

  const purchases = await prisma.purchase.findMany({
    where: { userId: session.user.id },
    include: { product: true },
    orderBy: { createdAt: "desc" },
  });

  const d = getDict("es").account;
  const statusLabels: Record<string, string> = {
    paid: d.statusPaid,
    pending: d.statusPending,
    refunded: d.statusRefunded,
  };

  return (
    <div className="min-h-screen bg-black px-6 pb-24 pt-20 text-white">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-semibold tracking-tight">{d.title}</h1>
        <div className="mt-6 flex items-center gap-4">
          {session.user.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={session.user.image}
              alt=""
              className="h-16 w-16 rounded-full"
            />
          )}
          <div>
            <div className="text-xl font-medium">{session.user.name}</div>
            <div className="text-zinc-400">{session.user.email}</div>
          </div>
        </div>

        <h2 className="mt-12 text-2xl font-medium">{d.yourSoftware}</h2>
        {purchases.length === 0 ? (
          <p className="mt-3 text-zinc-400">
            {d.empty}{" "}
            <Link href={lhref("es", "/downloads")} className="underline">
              {d.seeComing}
            </Link>
            .
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-white/5">
            {purchases.map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between py-4"
              >
                <div>
                  <div className="font-medium">{p.product.name}</div>
                  <div className="text-sm text-zinc-500">
                    {statusLabels[p.status] ?? p.status} · $
                    {(p.amount / 100).toFixed(2)}
                  </div>
                </div>
                {p.status === "paid" && (
                  <Link
                    href={`/api/download/${p.product.slug}`}
                    className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200"
                  >
                    {d.download}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-sm text-zinc-400">
          <p className="font-medium text-white">{d.launchList}</p>
          <p className="mt-2">
            {d.launchBody}{" "}
            <Link
              href={lhref("es", "/#waitlist")}
              className="underline hover:text-white"
            >
              {d.join}
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
