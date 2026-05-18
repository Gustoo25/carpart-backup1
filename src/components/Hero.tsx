import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";

export function Hero() {
  const { headline, ctaPrimary, ctaSecondary } = SITE_CONFIG.hero;

  return (
    <div className="relative -mt-16 sm:-mt-20">
      <section className="relative overflow-hidden" style={{ backgroundColor: "#0d0d0d" }}>
        {/* Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          aria-hidden
          className="absolute inset-0 z-0 h-full w-full object-cover opacity-90"
          src="/video.mp4"
        />

        {/* Dark gradient overlay — stronger at bottom for readability */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/30 via-black/20 to-black/70" />

        {/* Mobile content — centered, minimal */}
        <div className="relative z-[3] flex min-h-[100svh] flex-col items-center justify-center px-6 pb-24 pt-24 sm:hidden">
          <div className="mb-4 h-px w-10 bg-accent" />

          <h1 className="heading-display text-center text-5xl font-black leading-[0.95] text-white">
            More Than A Build.{" "}
            <span className="text-accent">A Statement.</span>
          </h1>

          <p className="mt-5 text-center text-sm leading-relaxed text-white/70 max-w-xs">
            Carbon fiber &amp; performance parts built for Infiniti enthusiasts.
          </p>

          <Link
            href={ctaPrimary.href}
            className="group mt-8 inline-flex items-center gap-2 bg-accent px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-accent-hover"
          >
            {ctaPrimary.label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href={ctaSecondary.href}
            className="mt-3 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors"
          >
            {ctaSecondary.label} →
          </Link>
        </div>

        {/* Desktop content — left-aligned, full */}
        <div className="container-x relative z-[3] hidden pb-32 pt-52 sm:block lg:pb-40 lg:pt-60">
          <div className="max-w-3xl">
            <p className="mb-5 text-xs font-black uppercase tracking-widest text-white">
              Built To Be Seen · Made To Stand Apart · Engineered To Perform
            </p>

            <h1 className="heading-display mt-2 text-7xl font-black leading-[0.95] text-white lg:text-8xl">
              {headline.split("\n").map((line, i) => (
                <span key={i} className={`block ${i === 1 ? "text-accent" : ""}`}>{line}</span>
              ))}
            </h1>

            <p className="mt-6 max-w-xl text-base text-white sm:text-lg">
              {SITE_CONFIG.hero.sub}
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

      {/* Diagonal bottom cut */}
      <div aria-hidden className="pointer-events-none absolute -bottom-5 left-0 right-0 z-10 h-10 overflow-hidden">
        <div
          className="h-full w-full bg-ink-800"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
        />
      </div>
    </div>
  );
}
