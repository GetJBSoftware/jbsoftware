import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) redirect("/signin?callbackUrl=/account");

  const purchases = await prisma.purchase.findMany({
    where: { userId: session.user.id },
    include: { product: true },
    orderBy: { createdAt: "desc" },
  });

  const investments = await prisma.investment.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="bg-black text-white min-h-screen px-6 pt-20 pb-24">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-semibold tracking-tight">Account</h1>
        <div className="mt-6 flex items-center gap-4">
          {session.user.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={session.user.image} alt="" className="h-16 w-16 rounded-full" />
          )}
          <div>
            <div className="text-xl font-medium">{session.user.name}</div>
            <div className="text-zinc-400">{session.user.email}</div>
          </div>
        </div>

        <h2 className="mt-12 text-2xl font-medium">Your software</h2>
        {purchases.length === 0 ? (
          <p className="mt-3 text-zinc-400">
            No purchases yet. <Link href="/downloads" className="underline">Browse downloads</Link>.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-white/5">
            {purchases.map((p) => (
              <li key={p.id} className="py-4 flex items-center justify-between">
                <div>
                  <div className="font-medium">{p.product.name}</div>
                  <div className="text-sm text-zinc-500">
                    {p.status} · ${(p.amount / 100).toFixed(2)}
                  </div>
                </div>
                {p.status === "paid" && (
                  <Link
                    href={`/api/download/${p.product.slug}`}
                    className="text-sm rounded-full bg-white text-black px-4 py-2 font-medium hover:bg-zinc-200"
                  >
                    Download
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}

        <h2 className="mt-12 text-2xl font-medium">Your investments</h2>
        {investments.length === 0 ? (
          <p className="mt-3 text-zinc-400">
            No investments yet. <Link href="/investments" className="underline">Become an investor</Link>.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-white/5">
            {investments.map((i) => (
              <li key={i.id} className="py-4 flex items-center justify-between">
                <div>
                  <div className="font-medium">{i.projectName}</div>
                  <div className="text-sm text-zinc-500">
                    {i.status} · {new Date(i.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="font-medium">${(i.amount / 100).toFixed(2)}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
