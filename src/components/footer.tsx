"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CONTACT_EMAIL, SITE } from "@/lib/site";
import { getDict } from "@/lib/dictionary";
import { langFromPathname, lhref } from "@/lib/i18n";

export function Footer() {
  const pathname = usePathname();
  const lang = langFromPathname(pathname);
  const d = getDict(lang);

  return (
    <footer className="border-t border-white/5 bg-black">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-12 text-sm md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <Link
            href={lhref(lang, "/")}
            className="inline-flex items-center gap-2.5 font-semibold"
          >
            <Image
              src="/logo-mark.png"
              alt="JB Software"
              width={577}
              height={417}
              className="h-10 w-auto"
            />
          </Link>
          <p className="mt-3 max-w-xs text-zinc-500">{d.footer.tagline}</p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-4 inline-block text-zinc-500 hover:text-white"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
        <div>
          <div className="mb-3 font-medium text-zinc-400">{d.footer.product}</div>
          <ul className="space-y-2 text-zinc-500">
            <li>
              <Link href={lhref(lang, "/downloads")} className="hover:text-white">
                {d.footer.downloads}
              </Link>
            </li>
            <li>
              <Link href={lhref(lang, "/roadmap")} className="hover:text-white">
                {d.footer.roadmap}
              </Link>
            </li>
            <li>
              <Link href={lhref(lang, "/#waitlist")} className="hover:text-white">
                {d.footer.launchList}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="mb-3 font-medium text-zinc-400">{d.footer.company}</div>
          <ul className="space-y-2 text-zinc-500">
            <li>
              <Link href={lhref(lang, "/community")} className="hover:text-white">
                {d.footer.community}
              </Link>
            </li>
            <li>
              <a
                href={SITE.repo}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                GitHub
              </a>
            </li>
            <li>
              <Link href={lhref(lang, "/contact")} className="hover:text-white">
                {d.footer.contact}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="mb-3 font-medium text-zinc-400">{d.footer.legal}</div>
          <ul className="space-y-2 text-zinc-500">
            <li>
              <Link href={lhref(lang, "/privacy")} className="hover:text-white">
                {d.footer.privacy}
              </Link>
            </li>
            <li>
              <Link href={lhref(lang, "/terms")} className="hover:text-white">
                {d.footer.terms}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 text-xs text-zinc-600 sm:flex-row">
          <p>
            © {new Date().getFullYear()} JB Software. {d.footer.rights}
          </p>
          <a
            href={`${SITE.repo}/issues`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-zinc-300"
          >
            {d.footer.reportIssue}
          </a>
        </div>
      </div>
    </footer>
  );
}
