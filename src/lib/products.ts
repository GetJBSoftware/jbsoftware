export type ProductType = "free" | "paid";
export type ProductStatus = "coming-soon" | "available";

export interface Product {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
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
 * Roadmap products.
 *
 * Everything here is still in development. Some tools are planned to be free,
 * others will be a one-time purchase. Update this list as products get closer
 * to launch and flip `status` to "available" when a build is ready.
 */
export const PRODUCTS: Product[] = [
  {
    slug: "jb-launcher",
    name: "JB Launcher",
    description: "A fast, minimal application launcher for Windows.",
    longDescription:
      "Planned: a launcher that indexes your apps, files and commands so you can open anything in milliseconds. Built for speed, privacy and zero telemetry.",
    price: 0,
    currency: "usd",
    type: "free",
    status: "coming-soon",
    platform: "Windows 10/11",
    featured: true,
  },
  {
    slug: "jb-optimizer",
    name: "JB Optimizer Pro",
    description: "One-click system tuning and cleanup for maximum performance.",
    longDescription:
      "Planned: remove bloat, tune services and schedule maintenance. One-time purchase with lifetime updates — no subscription.",
    price: 1900,
    currency: "usd",
    type: "paid",
    status: "coming-soon",
    platform: "Windows 10/11",
    featured: true,
  },
  {
    slug: "jb-backup",
    name: "JB Backup",
    description: "Encrypted, incremental backups to any cloud or local drive.",
    longDescription:
      "Planned: keep your files safe with end-to-end encryption and smart incremental snapshots. Free for personal use.",
    price: 0,
    currency: "usd",
    type: "free",
    status: "coming-soon",
    platform: "Windows / macOS",
  },
  {
    slug: "jb-studio",
    name: "JB Studio",
    description: "A lightweight creative suite for designers and developers.",
    longDescription:
      "Planned: vector editing, color tools and asset management in a single, snappy desktop app. Pay once, use forever.",
    price: 4900,
    currency: "usd",
    type: "paid",
    status: "coming-soon",
    platform: "Windows / macOS",
    featured: true,
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}
