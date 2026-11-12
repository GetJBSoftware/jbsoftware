import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

const routes: Array<{
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly";
}> = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/downloads", priority: 0.8, changeFrequency: "weekly" },
  { path: "/roadmap", priority: 0.8, changeFrequency: "weekly" },
  { path: "/community", priority: 0.5, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
  { path: "/signup", priority: 0.5, changeFrequency: "monthly" },
  { path: "/signin", priority: 0.3, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "monthly" },
  { path: "/terms", priority: 0.3, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
