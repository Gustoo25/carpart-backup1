"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { X, ChevronRight } from "lucide-react";
import { INFINITI_MODELS } from "@/lib/config";

type Model = (typeof INFINITI_MODELS)[number];

export function VehicleCategories() {
  const [selected, setSelected] = useState<Model | null>(null);

  function handleModelClick(model: Model) {
    if (model.years.length > 1) {
      setSelected(model);
    }
  }

  return (
    <section id="vehicles" className="border-y border-ink-600 bg-ink-800 py-16">
      <div className="container-x">

        {/* Section header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="skew-badge mb-3">
              <span>Precision Fitment</span>
            </div>
            <h2 className="heading-display text-3xl font-black text-white sm:text-4xl">
              Built For Infiniti
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              Every part engineered for your exact model. No universal guesswork.
            </p>
          </div>
          <Link
            href="/products?brand=Infiniti"
            className="hidden text-xs font-bold uppercase tracking-widest text-zinc-300 hover:text-accent sm:block"
          >
            Shop All &rarr;
          </Link>
        </div>

        {/* Model grid */}
        <div className="grid grid-cols-2 gap-4">
          {INFINITI_MODELS.map((m) => {
            const isSingleYear = m.years.length === 1;
            const href = isSingleYear
              ? `/products?model=${m.slug}&years=${m.years[0].value}`
              : "#vehicles";

            const inner = (
              <div className="group relative aspect-square overflow-hidden border border-ink-500 bg-ink-700 transition-all duration-500 hover:border-accent hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] sm:aspect-[4/3]">
                {/* Car image */}
                <Image
                  src={m.image}
                  alt={`Infiniti ${m.model}`}
                  fill
                  className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-110"
                  onError={() => {}}
                />

                {/* Dark gradient overlay — lightens on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-500 group-hover:opacity-60" />

                {/* Orange top bar slides in */}
                <span className="absolute left-0 top-0 h-1 w-0 bg-accent transition-all duration-500 group-hover:w-full" />

                {/* Orange bottom bar slides in from right */}
                <span className="absolute bottom-0 right-0 h-1 w-0 bg-accent transition-all duration-500 group-hover:w-full" />

                {/* Shine sweep on hover */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                {/* Model info — always visible on mobile, animates on desktop hover */}
                <div className="absolute bottom-0 left-0 p-4 sm:p-6 sm:transition-transform sm:duration-300 sm:group-hover:-translate-y-2">
                  <div className="heading-display text-3xl font-black text-white transition-colors duration-300 group-hover:text-accent sm:text-5xl">
                    {m.model}
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-accent sm:mt-2 sm:opacity-0 sm:transition-all sm:duration-300 sm:group-hover:opacity-100">
                    Shop Parts &rarr;
                  </div>
                </div>
              </div>
            );

            return isSingleYear ? (
              <Link key={m.slug} href={href}>
                {inner}
              </Link>
            ) : (
              <button
                key={m.slug}
                type="button"
                onClick={() => handleModelClick(m)}
                className="text-left"
              >
                {inner}
              </button>
            );
          })}
        </div>
      </div>

      {/* Year picker modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          />

          {/* Modal */}
          <div className="relative w-full overflow-hidden border-t border-ink-500 bg-ink-950 shadow-2xl sm:max-w-md sm:border sm:border-ink-500">

            {/* Car image header */}
            <div className="relative h-40 sm:h-52">
              <Image
                src={selected.image}
                alt={`Infiniti ${selected.model}`}
                fill
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-black/40 to-transparent" />

              {/* Red accent bar top */}
              <span className="absolute left-0 top-0 h-1 w-full bg-accent" />

              {/* Close button */}
              <button
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center border border-white/20 bg-black/50 text-white backdrop-blur-sm hover:border-accent hover:text-accent transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Model name overlay */}
              <div className="absolute bottom-4 left-6">
                <div className="text-[10px] font-black uppercase tracking-widest text-accent">
                  Infiniti · Select Year
                </div>
                <div className="heading-display text-4xl font-black text-white sm:text-5xl">
                  {selected.model}
                </div>
              </div>
            </div>

            {/* Year options */}
            <div className="flex flex-col gap-px bg-ink-700 p-0">
              {selected.years.map((y) => (
                <Link
                  key={y.value}
                  href={`/products?model=${selected.slug}&years=${y.value}`}
                  onClick={() => setSelected(null)}
                  className="group flex items-center justify-between bg-ink-950 px-6 py-5 transition-all duration-200 hover:bg-ink-800"
                >
                  <div className="flex items-center gap-4">
                    <span className="h-8 w-1 bg-ink-600 transition-colors duration-200 group-hover:bg-accent" />
                    <span className="heading-display text-2xl font-black text-white transition-colors duration-200 group-hover:text-accent sm:text-3xl">
                      {y.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 transition-colors duration-200 group-hover:text-accent">
                    Shop Parts
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </Link>
              ))}
            </div>

            {/* Bottom safe area */}
            <div className="h-2 bg-ink-950 sm:hidden" />
          </div>
        </div>
      )}
    </section>
  );
}
