"use client";

import { useState, type FormEvent } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Stub: wire up to your email provider (Klaviyo, Mailchimp, ConvertKit, etc.)
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  }

  return (
    <section id="contact" className="border-t border-ink-600 bg-ink-950 py-20">
      <div className="container-x text-center">
        <div className="text-xs font-medium uppercase tracking-widest text-accent">
          Join The List
        </div>
        <h2 className="heading-display mx-auto mt-3 max-w-2xl text-3xl font-black text-white sm:text-4xl">
          New Drops, Sale Access, Build Inspiration.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-zinc-400">
          We send maybe one email a month. No spam. Unsubscribe anytime.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 flex max-w-md flex-col gap-2 sm:flex-row"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="flex-1 border border-ink-500 bg-ink-800 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-accent focus:outline-none"
          />
          <button
            type="submit"
            className="bg-accent px-6 py-3 text-sm font-bold uppercase tracking-widest text-white hover:bg-accent-hover"
          >
            Subscribe
          </button>
        </form>

        {submitted && (
          <div className="mt-4 text-sm text-zinc-300">
            Thanks. Check your inbox for confirmation.
          </div>
        )}
      </div>
    </section>
  );
}
