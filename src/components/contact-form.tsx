"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Mail, Send } from "lucide-react";

export function ContactForm({ email }: { email: string }) {
  const [opened, setOpened] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const from = String(data.get("email") ?? "");
    const subject = String(data.get("subject") ?? "Website enquiry");
    const message = String(data.get("message") ?? "");

    const body = `Name: ${name}\nEmail: ${from}\n\n${message}`;
    const params = new URLSearchParams({
      view: "cm",
      fs: "1",
      to: email,
      su: `[JB Software] ${subject}`,
      body,
    });

    setOpened(true);
    window.open(
      `https://mail.google.com/mail/?${params.toString()}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm text-zinc-300">Name</span>
          <input
            name="name"
            type="text"
            required
            className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none focus:border-white/30"
            placeholder="Your name"
          />
        </label>
        <label className="block">
          <span className="text-sm text-zinc-300">Email</span>
          <input
            name="email"
            type="email"
            required
            className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none focus:border-white/30"
            placeholder="you@example.com"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-sm text-zinc-300">Subject</span>
        <input
          name="subject"
          type="text"
          required
          className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none focus:border-white/30"
          placeholder="How can we help?"
        />
      </label>

      <label className="block">
        <span className="text-sm text-zinc-300">Message</span>
        <textarea
          name="message"
          required
          rows={6}
          className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none focus:border-white/30"
          placeholder="Tell us a little about what you need."
        />
      </label>

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-black transition hover:bg-zinc-200"
      >
        <Send size={16} /> Send message
      </button>

      <p className="text-xs text-zinc-500">
        This opens Gmail with your message ready to send. You can also email us
        directly at{" "}
        <a href={`mailto:${email}`} className="underline hover:text-zinc-300">
          {email}
        </a>
        .
      </p>

      {opened && (
        <p className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
          <Mail size={16} /> Gmail opened in a new tab. Review the message and
          hit send.
        </p>
      )}
    </form>
  );
}
