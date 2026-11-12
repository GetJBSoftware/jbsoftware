import type { ReactNode } from "react";

/**
 * Spanish routes live under /es while English stays at the root. The root
 * layout cannot know the locale at render time, so this subtree marks its
 * content as Spanish for assistive technology and crawlers even before the
 * client-side document language sync runs.
 */
export default function EsLayout({ children }: { children: ReactNode }) {
  return <div lang="es">{children}</div>;
}
