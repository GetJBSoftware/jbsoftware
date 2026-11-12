"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getDict } from "@/lib/dictionary";
import { langFromPathname } from "@/lib/i18n";

/**
 * Keeps the document language in sync with the locale prefix. English lives at
 * the root and Spanish under /es, so the root layout cannot know the language
 * at render time without making every page dynamic.
 */
export function LangSync() {
  const pathname = usePathname();
  const lang = langFromPathname(pathname);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return null;
}

export function SkipLink() {
  const pathname = usePathname();
  const lang = langFromPathname(pathname);

  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-black"
    >
      {getDict(lang).common.skipToContent}
    </a>
  );
}
