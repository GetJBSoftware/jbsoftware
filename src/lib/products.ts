export type ProductType = "free" | "paid";
export type ProductStatus = "coming-soon" | "available";

export interface Product {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  highlights: string[];
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
 *
 * Keep this list focused. Two clear products convert better than a long list
 * of concepts, so JB Backup and JB Studio stay hidden until they are real.
 */
export const PRODUCTS: Product[] = [
  {
    slug: "jb-launcher",
    name: "JB Launcher",
    description: "A fast, minimal application launcher for Windows.",
    longDescription:
      "Index your apps, files and commands, then open anything in milliseconds. Built for speed, privacy and zero telemetry.",
    highlights: [
      "Instant search across apps, files and commands",
      "Keyboard-first, no mouse required",
      "No account, no telemetry, no background noise",
    ],
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
      "Remove bloat, tune services and schedule maintenance without digging through settings. One-time purchase with lifetime updates.",
    highlights: [
      "Safe, reversible system cleanup",
      "Startup and background-process tuning",
      "One-time price, lifetime updates, no subscription",
    ],
    price: 1900,
    currency: "usd",
    type: "paid",
    status: "coming-soon",
    platform: "Windows 10/11",
    featured: true,
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function formatPrice(product: Product) {
  if (product.type === "free") return "Free";
  return `$${(product.price / 100).toFixed(0)} one-time`;
}
