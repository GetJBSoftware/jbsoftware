import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  Clock,
  Code2,
  Rocket,
  Shield,
  Zap,
} from "lucide-react";
import { PRODUCTS, formatPrice, productText } from "@/lib/products";
import { Waitlist } from "@/components/waitlist";
import { SITE } from "@/lib/site";
import { lhref } from "@/lib/i18n";

export const metadata = {
  title: "Roadmap — JB Software",
  description:
    "Sigue lo que estamos construyendo: JB Launcher, JB Optimizer Pro y el camino hasta el lanzamiento.",
  alternates: {
    canonical: "/es/roadmap",
    languages: { en: "/roadmap", es: "/es/roadmap" },
  },
  openGraph: {
    title: "Roadmap — JB Software",
    description:
      "Sigue lo que estamos construyendo: JB Launcher, JB Optimizer Pro y el camino hasta el lanzamiento.",
    url: "/es/roadmap",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Roadmap — JB Software",
    description:
      "Sigue lo que estamos construyendo: JB Launcher, JB Optimizer Pro y el camino hasta el lanzamiento.",
    images: ["/og.png"],
  },
};

type MilestoneStatus = "in-progress" | "next" | "planned";

const milestones: Array<{
  version: string;
  title: string;
  status: MilestoneStatus;
  body: string;
  items: string[];
}> = [
  {
    version: "v0.1",
    title: "Núcleo del launcher",
    status: "in-progress",
    body: "Indexación de aplicaciones, búsqueda instantánea y navegación por teclado. La base de JB Launcher.",
    items: [
      "Índice local sin telemetría",
      "Búsqueda pensada para el teclado",
      "Compatibilidad con Windows 10/11",
    ],
  },
  {
    version: "v0.2",
    title: "Beta del launcher",
    status: "next",
    body: "Un instalador firmado, actualizaciones automáticas y los ajustes que la gente realmente necesita.",
    items: [
      "Instalador firmado para Windows",
      "Canal de actualizaciones automáticas",
      "Ajustes de tema y atajos",
    ],
  },
  {
    version: "v0.3",
    title: "Motor del optimizador",
    status: "planned",
    body: "Ajustes seguros y reversibles para JB Optimizer Pro, con las mismas reglas local-first.",
    items: [
      "Limpieza reversible",
      "Ajuste del inicio y de procesos en segundo plano",
      "Puntos de restauración antes de los cambios",
    ],
  },
  {
    version: "v1.0",
    title: "Lanzamiento público",
    status: "planned",
    body: "JB Launcher pasa a ser gratis. JB Optimizer Pro se pone a la venta como pago único.",
    items: [
      "Descarga gratuita del launcher",
      "Licencia única de Optimizer Pro",
      "Descuento de la lista de lanzamiento",
    ],
  },
];

const statusStyles: Record<MilestoneStatus, string> = {
  "in-progress": "border-amber-500/20 bg-amber-500/10 text-amber-300",
  next: "border-sky-500/20 bg-sky-500/10 text-sky-300",
  planned: "border-white/10 bg-white/[0.03] text-zinc-400",
};

const statusLabels: Record<MilestoneStatus, string> = {
  "in-progress": "En curso",
  next: "Siguiente",
  planned: "Planificado",
};

export default function RoadmapPageEs() {
  return (
    <div className="min-h-screen bg-black text-white">
      <section className="px-6 pb-12 pt-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            Roadmap
          </p>
          <h1 className="mt-2 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
            Construimos en público. Lanzamos en pasos pequeños.
          </h1>
          <p className="mt-4 max-w-2xl text-zinc-400">
            Sin promesas vagas ni fechas de lanzamiento falsas. Esto es lo que
            está realmente en marcha, lo que viene después y lo que
            deliberadamente aún no estamos construyendo.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-amber-300">
              <Clock size={12} /> En curso
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1.5 text-sky-300">
              <Circle size={12} /> Siguiente
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-zinc-400">
              <Circle size={12} /> Planificado
            </span>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {PRODUCTS.map((product) => {
            const copy = productText(product, "es");
            return (
              <div
                key={product.slug}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-zinc-500">
                      {product.platform}
                    </p>
                    <h2 className="mt-2 text-2xl font-medium">
                      {product.name}
                    </h2>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs ${
                      product.type === "free"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-amber-500/10 text-amber-400"
                    }`}
                  >
                    {formatPrice(product, "es")}
                  </span>
                </div>
                <p className="mt-3 text-sm text-zinc-400">
                  {copy.description}
                </p>
                <Link
                  href={`${lhref("es", "/downloads")}#${product.slug}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium hover:underline"
                >
                  Detalles del producto <ArrowRight size={14} />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-t border-white/5 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            El camino hasta la v1.0
          </h2>
          <p className="mt-3 max-w-2xl text-zinc-400">
            El alcance es intencionadamente pequeño. Cada hito se publica solo
            cuando es lo bastante estable para ser útil.
          </p>

          <ol className="mt-10 space-y-4">
            {milestones.map((milestone, index) => (
              <li key={milestone.version} className="relative pl-8">
                {index < milestones.length - 1 && (
                  <span className="absolute left-[11px] top-8 h-[calc(100%+1rem)] w-px bg-white/10" />
                )}
                <span className="absolute left-0 top-6 grid h-6 w-6 place-items-center rounded-full border border-white/10 bg-black">
                  <span className="h-2 w-2 rounded-full bg-white/60" />
                </span>
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs text-zinc-500">
                      {milestone.version}
                    </span>
                    <h3 className="text-xl font-medium">{milestone.title}</h3>
                    <span
                      className={`rounded-full border px-2.5 py-1 text-xs ${
                        statusStyles[milestone.status]
                      }`}
                    >
                      {statusLabels[milestone.status]}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-zinc-400">{milestone.body}</p>
                  <ul className="mt-4 grid gap-2 text-sm text-zinc-300 sm:grid-cols-3">
                    {milestone.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2
                          size={14}
                          className="mt-0.5 shrink-0 text-zinc-500"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-white/5 px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <Zap className="h-6 w-6" />
            <h3 className="mt-4 font-medium">Rápido por defecto</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Si una función hace más lento el arranque o más ruidosa la
              interfaz, no se publica.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <Shield className="h-6 w-6" />
            <h3 className="mt-4 font-medium">Local primero</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Las funciones principales funcionan sin conexión. Sin telemetría y
              sin cuenta para el launcher gratuito.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <Rocket className="h-6 w-6" />
            <h3 className="mt-4 font-medium">Pago único</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Las herramientas de pago son una sola compra. Lemon Squeezy
              gestionará los pagos en el lanzamiento.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Registro de cambios
          </h2>
          <div className="mt-8 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="font-mono text-zinc-500">
                  Noviembre de 2026
                </span>
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300">
                  Web
                </span>
              </div>
              <p className="mt-3 text-zinc-400">
                El roadmap público y la lista de lanzamiento ya están
                disponibles. JB Launcher y JB Optimizer Pro están en desarrollo.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="font-mono text-zinc-500">Siguiente</span>
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-zinc-400">
                  Aún sin versión pública
                </span>
              </div>
              <p className="mt-3 text-zinc-400">
                La primera entrada pública del registro de cambios aparecerá
                cuando JB Launcher entre en beta. Hasta entonces, el gestor de
                issues de GitHub es el lugar para reportar errores y pedir
                funciones.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={`${SITE.repo}/issues`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 font-medium transition hover:bg-white/5"
            >
              <Code2 size={16} /> GitHub Issues
            </a>
            <Link
              href={lhref("es", "/community")}
              className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-zinc-300 transition hover:text-white"
            >
              Comunidad <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Waitlist source="roadmap" lang="es" />
    </div>
  );
}
