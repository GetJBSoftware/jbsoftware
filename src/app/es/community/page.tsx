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
import { lhref } from "@/lib/i18n";

export const metadata = {
  title: "Comunidad — JB Software",
  description:
    "Reporta errores, pide funciones y sigue el roadmap de JB Software.",
  alternates: {
    canonical: "/es/community",
    languages: { en: "/community", es: "/es/community" },
  },
  openGraph: {
    title: "Comunidad — JB Software",
    description:
      "Reporta errores, pide funciones y sigue el roadmap de JB Software.",
    url: "/es/community",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Comunidad — JB Software",
    description:
      "Reporta errores, pide funciones y sigue el roadmap de JB Software.",
    images: ["/og.png"],
  },
};

export default function CommunityPageEs() {
  return (
    <div className="min-h-screen bg-black text-white">
      <section className="px-6 pb-12 pt-20">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            Comunidad
          </p>
          <h1 className="mt-2 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
            Constrúyelo con nosotros.
          </h1>
          <p className="mt-4 max-w-2xl text-zinc-400">
            Los primeros usuarios dan forma al producto. Cuéntanos qué falla, qué
            falta y qué haría que JB Software fuera realmente útil para ti.
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
            <h2 className="mt-4 text-xl font-medium">Reporta un error</h2>
            <p className="mt-2 text-sm text-zinc-400">
              ¿Algo roto o con un comportamiento extraño? Abre un issue público
              con los detalles y lo seguiremos.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm text-zinc-300 group-hover:text-white">
              Abrir un informe de error <ArrowRight size={15} />
            </span>
          </a>

          <a
            href={`${SITE.repo}/issues/new?labels=enhancement&template=feature_request.yml`}
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:bg-white/[0.04]"
          >
            <Lightbulb className="h-6 w-6 text-zinc-300" />
            <h2 className="mt-4 text-xl font-medium">Pide una función</h2>
            <p className="mt-2 text-sm text-zinc-400">
              ¿Tienes una idea que mejoraría el launcher o el optimizador?
              Describe el problema que quieres resolver.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm text-zinc-300 group-hover:text-white">
              Sugerir una función <ArrowRight size={15} />
            </span>
          </a>

          <Link
            href={lhref("es", "/roadmap")}
            className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:bg-white/[0.04]"
          >
            <MessageSquare className="h-6 w-6 text-zinc-300" />
            <h2 className="mt-4 text-xl font-medium">Sigue el roadmap</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Mira qué está en marcha, qué viene después y qué no estamos
              construyendo todavía a propósito.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm text-zinc-300 group-hover:text-white">
              Ver el roadmap <ArrowRight size={15} />
            </span>
          </Link>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:bg-white/[0.04]"
          >
            <Mail className="h-6 w-6 text-zinc-300" />
            <h2 className="mt-4 text-xl font-medium">Escríbenos</h2>
            <p className="mt-2 text-sm text-zinc-400">
              ¿Prefieres escribir en privado? Usa{" "}
              <span className="break-all text-zinc-300">{CONTACT_EMAIL}</span> y
              te responderemos.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm text-zinc-300 group-hover:text-white">
              Enviar un correo <ArrowRight size={15} />
            </span>
          </a>
        </div>

        <div className="mx-auto mt-8 max-w-5xl rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <div className="flex items-start gap-4">
            <Code2 className="mt-0.5 h-5 w-5 shrink-0 text-zinc-400" />
            <div>
              <h2 className="font-medium">¿Dónde está el Discord?</h2>
              <p className="mt-2 text-sm text-zinc-400">
                Mantenemos los comentarios en un único lugar público hasta que la
                primera beta esté lista. Abriremos un pequeño Discord con la
                beta, y la lista de lanzamiento recibirá la invitación primero.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Waitlist source="community" lang="es" />
    </div>
  );
}
