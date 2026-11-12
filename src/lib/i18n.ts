export type Lang = "en" | "es";

/**
 * The site keeps English at the root and Spanish under /es. These helpers keep
 * link generation and language detection consistent across server and client
 * components.
 */
export function langFromPathname(pathname?: string | null): Lang {
  if (!pathname) return "en";
  return pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en";
}

/** Removes a leading /es so the same page can be linked in the other language. */
export function stripLocale(pathname: string): string {
  if (pathname === "/es") return "/";
  if (pathname.startsWith("/es/")) return pathname.slice(3);
  return pathname;
}

/** Adds the locale prefix to an internal path. Hash and API links are untouched. */
export function lhref(lang: Lang, path: string): string {
  if (!path.startsWith("/")) return path;
  if (lang === "en" || path.startsWith("/api/")) return path;
  if (path === "/") return "/es";
  if (path.startsWith("/#")) return `/es${path.slice(1)}`;
  return `/es${path}`;
}

/** Link to the same page in the other language. */
export function otherLangHref(lang: Lang, pathname: string): string {
  const base = stripLocale(pathname.split("?")[0].split("#")[0] || "/");
  if (lang === "es") return base;
  return base === "/" ? "/es" : `/es${base}`;
}
