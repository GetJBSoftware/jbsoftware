import Link from "next/link";
import {
  ArrowRight,
  Bug,
  Code2,
  Lightbulb,
  Mail,
  MessageSquare,
} from "lucide-react";
import { CONTACT_EMAIL, SITE } from "@/lib/site";
import { Waitlist } from "@/components/waitlist";

export const metadata = {
  title: "Community — JB Software",
  description:
    "Report bugs, request features and follow the JB Software roadmap.",
  alternates: {
    canonical: "/community",
    languages: { en: "/community", es: "/es/community" },
  },
};

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <section className="px-6 pb-12 pt-20">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            Community
          </p>
          <h1 className="mt-2 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
            Build it with us.
          </h1>
          <p className="mt-4 max-w-2xl text-zinc-400">
            The first users shape the product. Tell us what breaks, what is
            missing and what would make JB Software genuinely useful to you.
          </p>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
          <a
            href={`${SITE.repo}/issues/new?labels=bug&template=bug_report.yml`}
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:bg-white/[0.04]"
          >
            <Bug className="h-6 w-6 text-zinc-300" />
            <h2 className="mt-4 text-xl font-medium">Report a bug</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Something broken or behaving strangely? Open a public issue with
              the details and we will track it.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm text-zinc-300 group-hover:text-white">
              Open a bug report <ArrowRight size={15} />
            </span>
          </a>

          <a
            href={`${SITE.repo}/issues/new?labels=enhancement&template=feature_request.yml`}
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:bg-white/[0.04]"
          >
            <Lightbulb className="h-6 w-6 text-zinc-300" />
            <h2 className="mt-4 text-xl font-medium">Request a feature</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Have an idea that would make the launcher or optimizer better?
              Describe the problem you want solved.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm text-zinc-300 group-hover:text-white">
              Suggest a feature <ArrowRight size={15} />
            </span>
          </a>

          <Link
            href="/roadmap"
            className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:bg-white/[0.04]"
          >
            <MessageSquare className="h-6 w-6 text-zinc-300" />
            <h2 className="mt-4 text-xl font-medium">Follow the roadmap</h2>
            <p className="mt-2 text-sm text-zinc-400">
              See what is in progress, what comes next and what is deliberately
              not being built yet.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm text-zinc-300 group-hover:text-white">
              View the roadmap <ArrowRight size={15} />
            </span>
          </Link>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:bg-white/[0.04]"
          >
            <Mail className="h-6 w-6 text-zinc-300" />
            <h2 className="mt-4 text-xl font-medium">Email us</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Prefer to write privately? Use{" "}
              <span className="break-all text-zinc-300">{CONTACT_EMAIL}</span>{" "}
              and we will get back to you.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm text-zinc-300 group-hover:text-white">
              Send an email <ArrowRight size={15} />
            </span>
          </a>
        </div>

        <div className="mx-auto mt-8 max-w-5xl rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <div className="flex items-start gap-4">
            <Code2 className="mt-0.5 h-5 w-5 shrink-0 text-zinc-400" />
            <div>
              <h2 className="font-medium">Where is the Discord?</h2>
              <p className="mt-2 text-sm text-zinc-400">
                We are keeping feedback in one public place until the first beta
                is ready. A small Discord will open with the beta, and the launch
                list gets the invite first.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Waitlist source="community" />
    </div>
  );
}
