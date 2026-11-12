"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Globe, User, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { getDict } from "@/lib/dictionary";
import { langFromPathname, lhref, otherLangHref, stripLocale } from "@/lib/i18n";
import { rememberLangChoice } from "@/lib/lang-preference";

export function Navbar() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const lang = langFromPathname(pathname);
  const d = getDict(lang);
  const basePath = stripLocale(pathname);
  const switchHref = otherLangHref(lang, pathname);
  const switchTarget = lang === "es" ? "en" : "es";

  const nav = [
    { href: lhref(lang, "/#intro"), path: "/", label: d.nav.home },
    { href: lhref(lang, "/downloads"), path: "/downloads", label: d.nav.downloads },
    { href: lhref(lang, "/roadmap"), path: "/roadmap", label: d.nav.roadmap },
    { href: lhref(lang, "/contact"), path: "/contact", label: d.nav.contact },
  ];

  function isActive(path: string) {
    if (path === "/") return basePath === "/";
    return basePath === path || basePath.startsWith(`${path}/`);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href={lhref(lang, "/")}
          aria-label={d.nav.homeAria}
          className="flex items-center gap-2.5 font-semibold tracking-tight"
        >
          <Image
            src="/logo-mark.png"
            alt="JB Software"
            width={577}
            height={417}
            priority
            className="h-11 w-auto"
          />
        </Link>

        <nav
          aria-label={d.nav.mainAria}
          className="hidden items-center gap-8 text-sm text-zinc-300 md:flex"
        >
          {nav.map((n) => (
            <Link
              key={n.path}
              href={n.href}
              aria-current={isActive(n.path) ? "page" : undefined}
              className={`transition hover:text-white ${
                isActive(n.path) ? "text-white" : ""
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href={switchHref}
            onClick={() => rememberLangChoice(switchTarget)}
            aria-label={d.nav.switchAria}
            className="inline-flex items-center gap-1.5 text-sm text-zinc-400 transition hover:text-white"
          >
            <Globe size={15} /> {d.nav.switchTo}
          </Link>

          {status === "loading" ? null : session?.user ? (
            <>
              <Link
                href={lhref(lang, "/account")}
                className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white"
              >
                {session.user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={session.user.image}
                    alt=""
                    className="h-7 w-7 rounded-full"
                  />
                ) : (
                  <User size={18} />
                )}
                <span className="max-w-[140px] truncate">
                  {session.user.name ?? session.user.email}
                </span>
              </Link>
              <button
                onClick={() => signOut()}
                className="flex items-center gap-1 text-sm text-zinc-400 hover:text-white"
              >
                <LogOut size={16} /> {d.nav.signOut}
              </button>
            </>
          ) : (
            <>
              <Link
                href={lhref(lang, "/signin")}
                className="text-sm text-zinc-300 hover:text-white"
              >
                {d.nav.signIn}
              </Link>
              <Link
                href={lhref(lang, "/signup")}
                className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200"
              >
                {d.nav.getStarted}
              </Link>
            </>
          )}
        </div>

        <button
          className="text-zinc-300 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={d.nav.menu}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/5 bg-black/90 backdrop-blur md:hidden">
          <div className="flex flex-col gap-3 px-6 py-4 text-sm">
            {nav.map((n) => (
              <Link
                key={n.path}
                href={n.href}
                onClick={() => setOpen(false)}
                className="text-zinc-300 hover:text-white"
              >
                {n.label}
              </Link>
            ))}
            <Link
              href={switchHref}
              onClick={() => {
                rememberLangChoice(switchTarget);
                setOpen(false);
              }}
              className="inline-flex items-center gap-2 text-zinc-300 hover:text-white"
            >
              <Globe size={15} /> {d.nav.switchTo}
            </Link>
            {session?.user ? (
              <>
                <Link
                  href={lhref(lang, "/account")}
                  onClick={() => setOpen(false)}
                  className="text-zinc-300 hover:text-white"
                >
                  {d.nav.account}
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-left text-zinc-400 hover:text-white"
                >
                  {d.nav.signOut}
                </button>
              </>
            ) : (
              <>
                <Link
                  href={lhref(lang, "/signin")}
                  onClick={() => setOpen(false)}
                  className="text-zinc-300 hover:text-white"
                >
                  {d.nav.signIn}
                </Link>
                <Link
                  href={lhref(lang, "/signup")}
                  onClick={() => setOpen(false)}
                  className="text-zinc-300 hover:text-white"
                >
                  {d.nav.createAccount}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
