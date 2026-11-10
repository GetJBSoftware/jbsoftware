import Link from "next/link";
import { Compass, Download, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-black px-6 text-white">
      <div className="max-w-lg text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
          This page hasn&apos;t shipped yet.
        </h1>
        <p className="mt-4 text-zinc-400">
          The link may be broken, or the page may have moved. Try one of these
          instead.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-black transition hover:bg-zinc-200"
          >
            <Home size={16} /> Home
          </Link>
          <Link
            href="/downloads"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 font-medium transition hover:bg-white/5"
          >
            <Download size={16} /> Roadmap
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 font-medium transition hover:bg-white/5"
          >
            <Compass size={16} /> Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
