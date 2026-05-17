import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";

export function Hero() {
  const { eyebrow, headline, sub, ctaPrimary, ctaSecondary } = SITE_CONFIG.hero;

  return (
    <section className="relative overflow-hidden bg-hero-fade">
      <video
        autoPlay
        loop
        muted
        playsInline
        aria-hidden
        className="absolute inset-0 h-full w-full object-fill opacity-40"
        src="/video.mp4"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-carbon-weave bg-carbon-weave opacity-[0.07]"
      />
      <div className="container-x relative py-24 sm:py-32 lg:py-40">
        <div className="max-w-3xl">
          <div className="text-xs font-medium uppercase tracking-widest text-white">
            {eyebrow}
          </div>
          <h1 className="heading-display mt-4 text-5xl font-black leading-[0.95] text-accent sm:text-7xl lg:text-8xl">
            {headline.split("\n").map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h1>
          <p className="mt-6 max-w-xl text-base text-white sm:text-lg">
            {sub}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href={ctaPrimary.href}
              className="group inline-flex items-center gap-2 bg-accent px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-accent-hover"
            >
              {ctaPrimary.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={ctaSecondary.href}
              className="inline-flex items-center gap-2 border border-ink-500 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:border-white"
            >
              {ctaSecondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
