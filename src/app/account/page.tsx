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

  return (
    <div className="min-h-screen bg-black px-6 pb-24 pt-20 text-white">
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
            Nothing here yet. Paid tools are not on sale until launch.{" "}
            <Link href="/downloads" className="underline">
              See what is coming
            </Link>
            .
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-white/5">
            {purchases.map((p) => (
              <li key={p.id} className="flex items-center justify-between py-4">
                <div>
                  <div className="font-medium">{p.product.name}</div>
                  <div className="text-sm text-zinc-500">
                    {p.status} · ${(p.amount / 100).toFixed(2)}
                  </div>
                </div>
                {p.status === "paid" && (
                  <Link
                    href={`/api/download/${p.product.slug}`}
                    className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200"
                  >
                    Download
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-sm text-zinc-400">
          <p className="font-medium text-white">Launch list</p>
          <p className="mt-2">
            Join the list to get one email at launch and 50% off your first paid
            licence.{" "}
            <Link href="/#waitlist" className="underline hover:text-white">
              Join the launch list
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
