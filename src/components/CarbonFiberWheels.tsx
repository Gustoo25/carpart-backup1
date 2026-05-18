import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";

export function CarbonFiberWheels() {
  return (
    <section id="wheels" className="bg-ink-900 py-20">
      <div className="container-x">
        {/* Header */}
        <div className="mb-12">
          <div className="skew-badge mb-3">
            <span>Fully Custom</span>
          </div>
          <h2 className="heading-display text-3xl font-black text-white sm:text-4xl">
            Carbon Fiber Steering Wheels
          </h2>
          <p className="mt-2 max-w-lg text-sm text-zinc-400">
            Hand-crafted carbon fiber, tailored materials, aggressive styling.<br />
            Built for drivers who demand more than stock.
          </p>
        </div>

        {/* Custom journey card */}
        <div className="relative overflow-hidden border border-ink-600 bg-ink-800">
          {/* Red accent bar */}
          <span className="absolute left-0 top-0 h-1 w-full bg-accent" />

          {/* Background texture */}
          <div className="absolute inset-0 bg-carbon-weave opacity-[0.06]" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-accent/5" />

          <div className="relative z-10 flex flex-col items-start gap-8 p-8 sm:flex-row sm:items-center sm:p-12 lg:p-16">

            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="flex h-16 w-16 items-center justify-center border border-accent/30 bg-accent/10 sm:h-20 sm:w-20">
                <Layers className="h-8 w-8 text-accent sm:h-10 sm:w-10" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="text-xs font-black uppercase tracking-widest text-accent">
                One-of-One · Made For You
              </div>
              <h3 className="heading-display mt-2 text-3xl font-black text-white sm:text-4xl lg:text-5xl">
                Start Your Custom Journey
              </h3>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-zinc-400 sm:text-base">
                Build a one-of-one carbon fiber steering wheel designed around your vehicle, your style, and your vision.
              </p>

              {/* Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Link
                  href="/customize"
                  className="group inline-flex items-center justify-center gap-2 bg-accent px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-accent-hover sm:justify-start"
                >
                  Start Customization
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/products?category=wheels"
                  className="inline-flex items-center justify-center gap-2 border border-ink-500 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:border-white sm:justify-start"
                >
                  View Gallery
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
