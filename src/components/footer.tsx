import Link from "next/link";
import { CONTACT_EMAIL, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black">
      <div className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div className="col-span-2 md:col-span-1">
          <div className="font-semibold">JB Software</div>
          <p className="mt-2 text-zinc-500 max-w-xs">
            Fast, focused desktop software. Built with care, shipped with pride.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-4 inline-block text-zinc-500 hover:text-white"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
        <div>
          <div className="text-zinc-400 font-medium mb-3">Product</div>
          <ul className="space-y-2 text-zinc-500">
            <li><Link href="/downloads" className="hover:text-white">Downloads</Link></li>
            <li><Link href="/investments" className="hover:text-white">Investments</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-zinc-400 font-medium mb-3">Company</div>
          <ul className="space-y-2 text-zinc-500">
            <li>
              <a
                href={SITE.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                GitHub
              </a>
            </li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-zinc-400 font-medium mb-3">Legal</div>
          <ul className="space-y-2 text-zinc-500">
            <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-6 text-center text-xs text-zinc-600">
        © {new Date().getFullYear()} JB Software. All rights reserved.
      </div>
    </footer>
  );
}
