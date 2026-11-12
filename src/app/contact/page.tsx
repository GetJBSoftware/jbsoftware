import Link from "next/link";
import { Mail, Code2, ArrowUpRight } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { CONTACT_EMAIL, SITE } from "@/lib/site";

export const metadata = {
  title: "Contact — JB Software",
  description: "Get in touch with the JB Software team.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <section className="px-6 pb-12 pt-20">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            Contact
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-6xl">
            Let&apos;s talk.
          </h1>
          <p className="mt-4 max-w-2xl text-zinc-400">
            Questions about the roadmap, a paid tool, a bug or the launch list?
            Send us a message and we&apos;ll get back to you as soon as we can.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[1.4fr_1fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
            <ContactForm email={CONTACT_EMAIL} />
          </div>

          <div className="space-y-4">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:bg-white/[0.04]"
            >
              <Mail className="mt-0.5 h-5 w-5 text-zinc-300" />
              <span>
                <span className="block font-medium">Email</span>
                <span className="mt-1 block break-all text-sm text-zinc-400">
                  {CONTACT_EMAIL}
                </span>
              </span>
            </a>

            <a
              href={SITE.repo}
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:bg-white/[0.04]"
            >
              <Code2 className="mt-0.5 h-5 w-5 text-zinc-300" />
              <span>
                <span className="flex items-center gap-1 font-medium">
                  GitHub <ArrowUpRight size={14} />
                </span>
                <span className="mt-1 block text-sm text-zinc-400">
                  Follow the projects and report issues.
                </span>
              </span>
            </a>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-sm text-zinc-400">
              <p className="font-medium text-white">Before you write</p>
              <p className="mt-2">
                Our tools are still in development, so downloads and purchases
                are not open yet. You can{" "}
                <Link href="/roadmap" className="underline hover:text-white">
                  follow the roadmap
                </Link>{" "}
                or{" "}
                <Link href="/#waitlist" className="underline hover:text-white">
                  join the launch list
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
