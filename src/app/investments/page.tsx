import { auth } from "@/auth";
import { isStripeConfigured } from "@/lib/stripe";
import { InvestmentsClient } from "@/components/investments-client";
import { CheckCircle2, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Investments — JB Software",
  description:
    "Support the JB Software roadmap with a one-time contribution.",
};

export default async function InvestmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; canceled?: string }>;
}) {
  const session = await auth();
  const params = await searchParams;

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
            Support our roadmap with a one-time contribution. Every contribution
            funds new features, new platforms and better tools for everyone.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-4xl">
          {params.success && (
            <div className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5 text-sm text-emerald-300">
              <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
              <p>
                Thank you! Your contribution is being processed. It will appear
                in your account once Stripe confirms the payment.
              </p>
            </div>
          )}

          {params.canceled && (
            <div className="mb-6 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-sm text-zinc-400">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <p>Checkout was canceled. Nothing was charged.</p>
            </div>
          )}

          <InvestmentsClient
            isSignedIn={!!session?.user}
            paymentsEnabled={isStripeConfigured}
          />
        </div>
      </section>
    </div>
  );
}
