export type ProductType = "free" | "paid";

export interface Product {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  price: number; // cents
  currency: string;
  type: ProductType;
  downloadUrl?: string;
  githubRelease?: string;
  image?: string;
  featured?: boolean;
  version?: string;
  platform?: string;
}

export const PRODUCTS: Product[] = [
  {
    slug: "jb-launcher",
    name: "JB Launcher",
    description: "A fast, minimal application launcher for Windows.",
    longDescription:
      "JB Launcher indexes your apps, files and commands so you can open anything in milliseconds. Built for speed, privacy and zero telemetry.",
    price: 0,
    currency: "usd",
    type: "free",
    version: "1.2.0",
    platform: "Windows 10/11",
    downloadUrl: "https://github.com/your-org/jb-launcher/releases/latest/download/JBLauncher-Setup.exe",
    githubRelease: "https://github.com/your-org/jb-launcher/releases",
    featured: true,
  },
  {
    slug: "jb-optimizer",
    name: "JB Optimizer Pro",
    description: "One-click system tuning and cleanup for maximum performance.",
    longDescription:
      "JB Optimizer Pro removes bloat, tunes services and schedules maintenance. One-time purchase, lifetime updates, no subscription.",
    price: 1900,
    currency: "usd",
    type: "paid",
    version: "2.0.1",
    platform: "Windows 10/11",
    downloadUrl: "https://github.com/your-org/jb-optimizer/releases/latest/download/JBOptimizer-Setup.exe",
    githubRelease: "https://github.com/your-org/jb-optimizer/releases",
    featured: true,
  },
  {
    slug: "jb-backup",
    name: "JB Backup",
    description: "Encrypted, incremental backups to any cloud or local drive.",
    longDescription:
      "JB Backup keeps your files safe with end-to-end encryption and smart incremental snapshots. Free for personal use.",
    price: 0,
    currency: "usd",
    type: "free",
    version: "1.0.4",
    platform: "Windows / macOS",
    downloadUrl: "https://github.com/your-org/jb-backup/releases/latest/download/JBBackup-Setup.exe",
    githubRelease: "https://github.com/your-org/jb-backup/releases",
  },
  {
    slug: "jb-studio",
    name: "JB Studio",
    description: "A lightweight creative suite for designers and developers.",
    longDescription:
      "JB Studio bundles vector editing, color tools and asset management in a single, snappy desktop app. Pay once, use forever.",
    price: 4900,
    currency: "usd",
    type: "paid",
    version: "3.1.0",
    platform: "Windows / macOS",
    downloadUrl: "https://github.com/your-org/jb-studio/releases/latest/download/JBStudio-Setup.exe",
    githubRelease: "https://github.com/your-org/jb-studio/releases",
    featured: true,
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}
