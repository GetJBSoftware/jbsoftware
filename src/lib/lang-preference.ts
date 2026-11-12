import type { Lang } from "@/lib/i18n";

/**
 * Remembers the language the visitor chose (or dismissed the suggestion for) so
 * the language banner does not keep coming back on every navigation.
 */
const STORAGE_KEY = "jbs-lang-choice";

const listeners = new Set<() => void>();

function notify() {
  for (const listener of listeners) listener();
}

export function rememberLangChoice(lang: Lang) {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // Storage can be unavailable in private mode; the banner still works.
  }
  notify();
}

export function savedLangChoice(): Lang | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "en" || value === "es" ? value : null;
  } catch {
    return null;
  }
}

/** Subscribe to language-choice changes so the banner can react immediately. */
export function subscribeLangChoice(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}
