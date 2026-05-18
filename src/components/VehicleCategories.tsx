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
            <div className="text-xs font-black uppercase tracking-widest text-accent">
              Precision Fitment
            </div>
            <h2 className="heading-display mt-2 text-3xl font-black text-white sm:text-4xl">
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
              <div className="group relative aspect-square overflow-hidden border border-ink-500 bg-ink-700 transition-all duration-500 hover:border-accent hover:shadow-[0_0_30px_rgba(249,115,22,0.25)] sm:aspect-[4/3]">
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

                {/* Model info slides up on hover */}
                <div className="absolute bottom-0 left-0 p-6 transition-transform duration-300 group-hover:-translate-y-2">
                  <div className="heading-display text-4xl font-black text-white transition-colors duration-300 group-hover:text-accent sm:text-5xl">
                    {m.model}
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-accent opacity-0 transition-all duration-300 group-hover:opacity-100">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-sm border border-ink-500 bg-ink-900 p-8 shadow-2xl">
            <button
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="absolute right-4 top-4 text-zinc-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-xs font-black uppercase tracking-widest text-accent">
              Infiniti {selected.model}
            </div>
            <h3 className="heading-display mt-2 text-2xl font-black text-white">
              Select Your Year
            </h3>

            <div className="mt-6 flex flex-col gap-3">
              {selected.years.map((y) => (
                <Link
                  key={y.value}
                  href={`/products?model=${selected.slug}&years=${y.value}`}
                  onClick={() => setSelected(null)}
                  className="group flex items-center justify-between border border-ink-500 bg-ink-800 px-5 py-4 transition-all hover:border-accent hover:bg-ink-700"
                >
                  <span className="heading-display text-xl font-black text-white group-hover:text-accent">
                    {y.label}
                  </span>
                  <ChevronRight className="h-5 w-5 text-zinc-500 group-hover:text-accent" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
