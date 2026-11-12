import Image from "next/image";
import Link from "next/link";
import { CONTACT_EMAIL, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-12 text-sm md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="inline-flex items-center gap-2.5 font-semibold">
            <Image
              src="/logo-mark.png"
              alt=""
              width={588}
              height={418}
              className="h-9 w-auto rounded-md"
            />
            <span>JB Software</span>
          </Link>
          <p className="mt-3 max-w-xs text-zinc-500">
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
          <div className="mb-3 font-medium text-zinc-400">Product</div>
          <ul className="space-y-2 text-zinc-500">
            <li>
              <Link href="/downloads" className="hover:text-white">
                Downloads
              </Link>
            </li>
            <li>
              <Link href="/roadmap" className="hover:text-white">
                Roadmap
              </Link>
            </li>
            <li>
              <Link href="/#waitlist" className="hover:text-white">
                Launch list
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="mb-3 font-medium text-zinc-400">Company</div>
          <ul className="space-y-2 text-zinc-500">
            <li>
              <Link href="/community" className="hover:text-white">
                Community
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
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="mb-3 font-medium text-zinc-400">Legal</div>
          <ul className="space-y-2 text-zinc-500">
            <li>
              <Link href="/privacy" className="hover:text-white">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 text-xs text-zinc-600 sm:flex-row">
          <p>© {new Date().getFullYear()} JB Software. All rights reserved.</p>
          <a
            href={`${SITE.repo}/issues`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-zinc-300"
          >
            Report an issue
          </a>
        </div>
      </div>
    </footer>
  );
}
