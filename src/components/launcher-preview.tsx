import {
  AppWindow,
  Command,
  FileText,
  Folder,
  Globe,
  Search,
  Settings,
  Terminal,
  Zap,
} from "lucide-react";

const results = [
  {
    icon: AppWindow,
    name: "Figma",
    detail: "Application",
    key: "1",
    active: true,
  },
  { icon: Folder, name: "Projects", detail: "Folder · D:\\Work", key: "2", active: false },
  { icon: FileText, name: "roadmap.md", detail: "Document", key: "3", active: false },
  { icon: Terminal, name: "Terminal", detail: "Command · Windows", key: "4", active: false },
  { icon: Settings, name: "Settings", detail: "System", key: "5", active: false },
];

export function LauncherPreview() {
  return (
    <section className="border-t border-white/5 px-6 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.2em] text-zinc-400">
            <Command size={13} /> Product preview
          </p>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
            Everything on your PC,
            <br />
            one keystroke away.
          </h2>
          <p className="mt-5 max-w-md text-zinc-400">
            JB Launcher is being built around a single idea: the fastest way to
            open something should feel instant. No dashboards, no clutter, no
            account required.
          </p>

          <ul className="mt-7 space-y-3 text-sm text-zinc-300">
            <li className="flex items-start gap-3">
              <Search size={16} className="mt-0.5 shrink-0 text-zinc-500" />
              Search apps, files, folders and commands from one place.
            </li>
            <li className="flex items-start gap-3">
              <Command size={16} className="mt-0.5 shrink-0 text-zinc-500" />
              Keyboard-first by default. Press, type, launch.
            </li>
            <li className="flex items-start gap-3">
              <Globe size={16} className="mt-0.5 shrink-0 text-zinc-500" />
              Local-first and private. Nothing leaves your machine.
            </li>
          </ul>
        </div>

        <div className="relative">
          <div className="absolute -inset-8 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.09),transparent_65%)] blur-2xl" />

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0d10] shadow-[0_30px_120px_rgba(0,0,0,0.7)]">
            <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
              <span className="ml-3 text-xs text-zinc-500">JB Launcher</span>
              <span className="ml-auto rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] uppercase tracking-wider text-zinc-500">
                Concept preview
              </span>
            </div>

            <div className="p-4 md:p-5">
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/60 px-4 py-3">
                <Search size={16} className="text-zinc-500" />
                <span className="text-sm text-zinc-300">
                  Search apps, files, commands
                  <span className="ml-0.5 inline-block h-4 w-px animate-pulse bg-zinc-300 align-middle" />
                </span>
                <span className="ml-auto rounded-md border border-white/10 px-2 py-0.5 text-[10px] text-zinc-500">
                  Ctrl K
                </span>
              </div>

              <div className="mt-3 space-y-1">
                {results.map((item) => (
                  <div
                    key={item.name}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${
                      item.active
                        ? "border border-white/10 bg-white/[0.06]"
                        : "border border-transparent"
                    }`}
                  >
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${
                        item.active
                          ? "bg-white text-black"
                          : "bg-white/[0.04] text-zinc-400"
                      }`}
                    >
                      <item.icon size={16} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm text-zinc-200">
                        {item.name}
                      </span>
                      <span className="block truncate text-xs text-zinc-500">
                        {item.detail}
                      </span>
                    </span>
                    <span className="rounded-md border border-white/10 px-1.5 py-0.5 text-[10px] text-zinc-500">
                      {item.key}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-white/5 pt-3 text-[11px] text-zinc-600">
                <span>↑↓ Navigate</span>
                <span>↵ Open</span>
                <span>Esc Close</span>
                <span className="ml-auto inline-flex items-center gap-1">
                  <Zap size={11} /> 12 ms
                </span>
              </div>
            </div>
          </div>

          <p className="mt-4 text-center text-[11px] text-zinc-600">
            Concept preview. Real screenshots and a 5-second demo land with the
            beta.
          </p>
        </div>
      </div>
    </section>
  );
}
