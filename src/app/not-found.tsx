"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Download, Home } from "lucide-react";
import { getDict } from "@/lib/dictionary";
import { langFromPathname, lhref } from "@/lib/i18n";

export default function NotFound() {
  const pathname = usePathname();
  const lang = langFromPathname(pathname);
  const d = getDict(lang).notFound;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-black px-6 text-white">
      <div className="max-w-lg text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
          {d.title}
        </h1>
        <p className="mt-4 text-zinc-400">{d.body}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href={lhref(lang, "/")}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-black transition hover:bg-zinc-200"
          >
            <Home size={16} /> {d.home}
          </Link>
          <Link
            href={lhref(lang, "/roadmap")}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 font-medium transition hover:bg-white/5"
          >
            <Download size={16} /> {d.roadmap}
          </Link>
          <Link
            href={lhref(lang, "/contact")}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 font-medium transition hover:bg-white/5"
          >
            <Compass size={16} /> {d.contact}
          </Link>
        </div>
      </div>
    </div>
  );
}
