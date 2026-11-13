import type { Lang } from "@/lib/i18n";

/**
 * - free: fully free download
 * - trial: free demo with an optional paid licence
 * - freemium: free app with optional Pro features
 * - paid: paid only
 */
export type ProductType = "free" | "trial" | "freemium" | "paid";
export type ProductStatus = "coming-soon" | "available";

export interface Product {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  highlights: string[];
  /** Spanish copy. Falls back to the English fields when missing. */
  descriptionEs?: string;
  longDescriptionEs?: string;
  highlightsEs?: string[];
  /** Price in cents. Kept for the future checkout flow. */
  price: number;
  currency: string;
  type: ProductType;
  status: ProductStatus;
  downloadUrl?: string;
  githubRelease?: string;
  image?: string;
  featured?: boolean;
  version?: string;
  platform?: string;
}

/**
 * Product catalogue.
 *
 * Everything here is still in development. JB Launcher is fully free, JB Search
 * offers a free demo with an optional paid licence, and JB Workplace is
 * freemium. Update this list as products get closer to launch and flip `status`
 * to "available" when a build is ready.
 *
 * Keep this list focused on real products. Ideas that are not being built stay
 * out of the catalogue.
 */
export const PRODUCTS: Product[] = [
  {
    slug: "jb-launcher",
    name: "JB Launcher",
    description:
      "A command bar for fast file conversions and contextual actions.",
    longDescription:
      "Select a file, press the shortcut and unzip, convert or clean it without opening another app. JB Launcher detects what you have selected and puts the right action one keystroke away.",
    descriptionEs:
      "Una barra de comandos para convertir archivos y ejecutar acciones contextuales al instante.",
    longDescriptionEs:
      "Selecciona un archivo, pulsa el atajo y descomprime, convierte o limpia sin abrir otra aplicación. JB Launcher detecta lo que has seleccionado y pone la acción adecuada a una pulsación.",
    highlights: [
      "Works with whatever you have selected",
      "Unzip, convert and clean from one command bar",
      "Lightweight, local-first and free",
    ],
    highlightsEs: [
      "Funciona con lo que tengas seleccionado",
      "Descomprime, convierte y limpia desde una sola barra",
      "Ligero, local-first y gratis",
    ],
    price: 0,
    currency: "usd",
    type: "free",
    status: "coming-soon",
    platform: "Windows 10/11",
    featured: true,
  },
  {
    slug: "jb-search",
    name: "JB Search",
    description:
      "Local semantic search across the content inside your files and photos.",
    longDescription:
      "Stop hunting through messy folders and generic filenames. JB Search indexes your documents and photos locally and finds them by what they contain, not just their titles. Try the free demo, then choose a one-time or subscription licence if it earns a place in your workflow.",
    descriptionEs:
      "Búsqueda semántica local por el contenido de tus archivos y fotos.",
    longDescriptionEs:
      "Deja de buscar entre carpetas desordenadas y nombres genéricos. JB Search indexa tus documentos y fotos en local y los encuentra por lo que contienen, no solo por su título. Prueba la demo gratis y después elige una licencia de pago único o una suscripción si se gana un hueco en tu flujo de trabajo.",
    highlights: [
      "Search by content, not just filename",
      "Works with documents and photos",
      "Free demo, then a one-time or subscription licence",
    ],
    highlightsEs: [
      "Busca por contenido, no solo por el nombre",
      "Funciona con documentos y fotos",
      "Demo gratis y licencia de pago único o suscripción",
    ],
    price: 0,
    currency: "usd",
    type: "trial",
    status: "coming-soon",
    platform: "Windows 10/11",
    featured: true,
  },
  {
    slug: "jb-workplace",
    name: "JB Workplace",
    description:
      "A workspace switcher and dynamic RAM optimizer in one command center.",
    longDescription:
      "Launch everything you need for coding, designing or gaming with a single click. JB Workplace switches your app environment, frees RAM in the background and brings the rest of the JB ecosystem into one place. Download it free with the essentials included, then unlock deeper automation with Pro.",
    descriptionEs:
      "Un gestor de espacios de trabajo y optimización dinámica de RAM en un solo centro de mando.",
    longDescriptionEs:
      "Lanza todo lo que necesitas para programar, diseñar o jugar con un solo clic. JB Workplace cambia tu entorno de aplicaciones, libera RAM en segundo plano y reúne el resto del ecosistema JB en un solo lugar. Descárgalo gratis con las funciones esenciales y desbloquea una automatización más profunda con Pro.",
    highlights: [
      "One-click workspace presets",
      "Background RAM tuning to avoid slowdowns",
      "Free essentials, with Pro automation when you need it",
    ],
    highlightsEs: [
      "Perfiles de espacio de trabajo con un clic",
      "Ajuste de RAM en segundo plano para evitar caídas",
      "Funciones esenciales gratis y automatización Pro cuando la necesites",
    ],
    price: 0,
    currency: "usd",
    type: "freemium",
    status: "coming-soon",
    platform: "Windows 10/11",
    featured: true,
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function formatPrice(product: Product, lang: Lang = "en") {
  switch (product.type) {
    case "free":
      return lang === "es" ? "Gratis" : "Free";
    case "trial":
      return lang === "es" ? "Demo gratis" : "Free demo";
    case "freemium":
      return "Freemium";
    case "paid": {
      const amount = `$${(product.price / 100).toFixed(0)}`;
      return lang === "es" ? `${amount} pago único` : `${amount} one-time`;
    }
  }
}

/** Returns the product copy in the requested language. */
export function productText(product: Product, lang: Lang) {
  if (lang === "en") {
    return {
      description: product.description,
      longDescription: product.longDescription,
      highlights: product.highlights,
    };
  }

  return {
    description: product.descriptionEs ?? product.description,
    longDescription: product.longDescriptionEs ?? product.longDescription,
    highlights: product.highlightsEs ?? product.highlights,
  };
}
