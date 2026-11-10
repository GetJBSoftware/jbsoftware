import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black">
      <div className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div className="col-span-2 md:col-span-1">
          <div className="font-semibold">JB Software</div>
          <p className="mt-2 text-zinc-500 max-w-xs">
            Fast, focused desktop software. Built with care, shipped with pride.
          </p>
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
            <li><a href="https://github.com" className="hover:text-white">GitHub</a></li>
            <li><a href="mailto:hello@getjbsoftware.com" className="hover:text-white">Contact</a></li>
          </ul>
        </div>
        <div>
          <div className="text-zinc-400 font-medium mb-3">Legal</div>
          <ul className="space-y-2 text-zinc-500">
            <li><span>Privacy</span></li>
            <li><span>Terms</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-6 text-center text-xs text-zinc-600">
        © {new Date().getFullYear()} JB Software. All rights reserved.
      </div>
    </footer>
  );
}
