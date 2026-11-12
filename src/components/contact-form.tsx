"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Mail, Send } from "lucide-react";
import { getDict } from "@/lib/dictionary";
import type { Lang } from "@/lib/i18n";

export function ContactForm({
  email,
  lang = "en",
}: {
  email: string;
  lang?: Lang;
}) {
  const d = getDict(lang).contactForm;
  const [opened, setOpened] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const from = String(data.get("email") ?? "");
    const subject = String(data.get("subject") ?? d.defaultSubject);
    const message = String(data.get("message") ?? "");

    const body = `${d.bodyName}: ${name}\n${d.bodyEmail}: ${from}\n\n${message}`;

    setOpened(true);
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      `[JB Software] ${subject}`
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm text-zinc-300">{d.name}</span>
          <input
            name="name"
            type="text"
            required
            className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none focus:border-white/30"
            placeholder={d.namePlaceholder}
          />
        </label>
        <label className="block">
          <span className="text-sm text-zinc-300">{d.email}</span>
          <input
            name="email"
            type="email"
            required
            className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none focus:border-white/30"
            placeholder={d.emailPlaceholder}
          />
        </label>
      </div>

      <label className="block">
        <span className="text-sm text-zinc-300">{d.subject}</span>
        <input
          name="subject"
          type="text"
          required
          className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none focus:border-white/30"
          placeholder={d.subjectPlaceholder}
        />
      </label>

      <label className="block">
        <span className="text-sm text-zinc-300">{d.message}</span>
        <textarea
          name="message"
          required
          rows={6}
          className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none focus:border-white/30"
          placeholder={d.messagePlaceholder}
        />
      </label>

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-black transition hover:bg-zinc-200"
      >
        <Send size={16} /> {d.submit}
      </button>

      <p className="text-xs text-zinc-500">
        {d.hint}{" "}
        <a href={`mailto:${email}`} className="underline hover:text-zinc-300">
          {email}
        </a>
        .
      </p>

      {opened && (
        <p className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
          <Mail size={16} /> {d.success}
        </p>
      )}
    </form>
  );
}
