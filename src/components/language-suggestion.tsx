"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { Globe, X } from "lucide-react";
import { getDict } from "@/lib/dictionary";
import { langFromPathname, otherLangHref, type Lang } from "@/lib/i18n";
import {
  rememberLangChoice,
  savedLangChoice,
  subscribeLangChoice,
} from "@/lib/lang-preference";

/**
 * Detects the browser language and offers the matching version of the site.
 * English lives at the root and Spanish (Spain and Latin America) under /es.
 * The banner only appears when the visitor has not already picked a language.
 */
function detectBrowserLang(): Lang | null {
  if (typeof navigator === "undefined") return null;

  const tags = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];

  for (const tag of tags) {
    const code = tag.toLowerCase();
    if (code === "es" || code.startsWith("es-")) return "es";
    if (code === "en" || code.startsWith("en-")) return "en";
  }

  return null;
}

export function LanguageSuggestion() {
  const pathname = usePathname();
  const lang = langFromPathname(pathname);

  // Reading the browser language and the saved choice happens on the client
  // only; the server snapshot keeps the HTML stable during hydration.
  const show = useSyncExternalStore(
    subscribeLangChoice,
    () => {
      if (savedLangChoice()) return false;
      const detected = detectBrowserLang();
      return detected !== null && detected !== lang;
    },
    () => false
  );

  if (!show) return null;

  const target: Lang = lang === "es" ? "en" : "es";
  const d = getDict(target).langSuggestion;
  const href = otherLangHref(lang, pathname);

  function dismiss() {
    rememberLangChoice(lang);
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-[60] sm:bottom-6 sm:left-auto sm:right-6 sm:w-[22rem]">
      <div
        role="region"
        aria-label={d.regionLabel}
        className="relative rounded-2xl border border-white/15 bg-zinc-950/95 p-4 pr-10 text-white shadow-2xl shadow-black/60 backdrop-blur-md"
      >
        <button
          type="button"
          onClick={dismiss}
          aria-label={d.close}
          className="absolute right-2.5 top-2.5 rounded-full p-1 text-zinc-500 transition hover:bg-white/10 hover:text-white"
        >
          <X size={15} />
        </button>

        <div className="flex items-start gap-3">
          <Globe
            size={18}
            className="mt-0.5 shrink-0 text-zinc-400"
            aria-hidden
          />
          <div>
            <p className="text-sm font-medium">{d.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-zinc-400">
              {d.body}
            </p>
            <div className="mt-3 flex items-center gap-2">
              <Link
                href={href}
                onClick={() => rememberLangChoice(target)}
                className="rounded-full bg-white px-3.5 py-1.5 text-xs font-medium text-black transition hover:bg-zinc-200"
              >
                {d.action}
              </Link>
              <button
                type="button"
                onClick={dismiss}
                className="rounded-full px-2 py-1.5 text-xs text-zinc-400 transition hover:text-white"
              >
                {d.dismiss}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
