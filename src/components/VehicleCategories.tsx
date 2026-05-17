import Link from "next/link";
import { VEHICLE_BRANDS } from "@/lib/config";

export function VehicleCategories() {
  return (
    <section id="vehicles" className="border-y border-ink-600 bg-ink-800 py-16">
      <div className="container-x">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="heading-display text-3xl font-black text-white sm:text-4xl">
              Shop By Vehicle
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              Vehicle-specific fitment. No universal hacks.
            </p>
          </div>
          <Link
            href="/products"
            className="hidden text-xs font-bold uppercase tracking-widest text-zinc-300 hover:text-white sm:block"
          >
            View All &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {VEHICLE_BRANDS.map((brand) => (
            <Link
              key={brand}
              href={`/products?brand=${brand}`}
              className="group flex aspect-square items-center justify-center border border-ink-500 bg-ink-700 transition-all hover:border-accent hover:bg-ink-600"
            >
              <span className="heading-display text-lg font-black text-zinc-300 transition-colors group-hover:text-white sm:text-xl">
                {brand}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
