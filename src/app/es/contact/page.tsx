import Link from "next/link";
import { Mail, Code2, ArrowUpRight } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { CONTACT_EMAIL, SITE } from "@/lib/site";
import { lhref } from "@/lib/i18n";

export const metadata = {
  title: "Contacto — JB Software",
  description: "Ponte en contacto con el equipo de JB Software.",
  alternates: {
    canonical: "/es/contact",
    languages: { en: "/contact", es: "/es/contact" },
  },
  openGraph: {
    title: "Contacto — JB Software",
    description: "Ponte en contacto con el equipo de JB Software.",
    url: "/es/contact",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contacto — JB Software",
    description: "Ponte en contacto con el equipo de JB Software.",
    images: ["/og.png"],
  },
};

export default function ContactPageEs() {
  return (
    <div className="min-h-screen bg-black text-white">
      <section className="px-6 pb-12 pt-20">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            Contacto
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-6xl">
            Hablemos.
          </h1>
          <p className="mt-4 max-w-2xl text-zinc-400">
            ¿Preguntas sobre el roadmap, una herramienta de pago, un error o la
            lista de lanzamiento? Envíanos un mensaje y te responderemos lo antes
            posible.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[1.4fr_1fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
            <ContactForm email={CONTACT_EMAIL} lang="es" />
          </div>

          <div className="space-y-4">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:bg-white/[0.04]"
            >
              <Mail className="mt-0.5 h-5 w-5 text-zinc-300" />
              <span>
                <span className="block font-medium">Correo</span>
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
                  Sigue los proyectos y reporta problemas.
                </span>
              </span>
            </a>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-sm text-zinc-400">
              <p className="font-medium text-white">Antes de escribir</p>
              <p className="mt-2">
                Nuestras herramientas siguen en desarrollo, así que las descargas
                y compras aún no están abiertas. Puedes{" "}
                <Link
                  href={lhref("es", "/roadmap")}
                  className="underline hover:text-white"
                >
                  seguir el roadmap
                </Link>{" "}
                o{" "}
                <Link
                  href={lhref("es", "/#waitlist")}
                  className="underline hover:text-white"
                >
                  unirte a la lista de lanzamiento
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
