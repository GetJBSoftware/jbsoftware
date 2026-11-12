"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { User, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

const nav = [
  { href: "/#intro", label: "Home" },
  { href: "/downloads", label: "Downloads" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string) {
    if (href.startsWith("/#")) return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/5">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          aria-label="JB Software — home"
          className="flex items-center gap-2.5 font-semibold tracking-tight"
        >
          <Image
            src="/logo-mark.png"
            alt=""
            width={588}
            height={418}
            priority
            className="h-10 w-auto rounded-lg"
          />
          <span>JB Software</span>
        </Link>

        <nav
          aria-label="Main"
          className="hidden md:flex items-center gap-8 text-sm text-zinc-300"
        >
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={isActive(n.href) ? "page" : undefined}
              className={`transition hover:text-white ${
                isActive(n.href) ? "text-white" : ""
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {status === "loading" ? null : session?.user ? (
            <>
              <Link
                href="/account"
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
                className="text-sm text-zinc-400 hover:text-white flex items-center gap-1"
              >
                <LogOut size={16} /> Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="text-sm text-zinc-300 hover:text-white"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-white text-black text-sm font-medium px-4 py-2 hover:bg-zinc-200 transition"
              >
                Get started
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden text-zinc-300"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/5 bg-black/90 backdrop-blur">
          <div className="px-6 py-4 flex flex-col gap-3 text-sm">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="text-zinc-300 hover:text-white"
              >
                {n.label}
              </Link>
            ))}
            {session?.user ? (
              <>
                <Link href="/account" className="text-zinc-300 hover:text-white">
                  Account
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-left text-zinc-400 hover:text-white"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  onClick={() => setOpen(false)}
                  className="text-zinc-300 hover:text-white"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="text-zinc-300 hover:text-white"
                >
                  Create account
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
