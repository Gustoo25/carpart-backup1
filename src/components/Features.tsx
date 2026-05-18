import { ShieldCheck, Wrench, Award } from "lucide-react";

const FEATURES = [
  {
    num: "01",
    icon: Award,
    title: "Real Carbon Fiber",
    body: "Genuine 2x2 twill weave. Autoclave-cured for strength and a flawless finish."
  },
  {
    num: "02",
    icon: Wrench,
    title: "Vehicle-Specific Fit",
    body: "Engineered for your exact make and model. No trimming, no guesswork."
  },
  {
    num: "03",
    icon: ShieldCheck,
    title: "Lifetime Warranty",
    body: "Built to outlast the car it's on. Backed for as long as you own it."
  }
];

export function Features() {
  return (
    <section id="about" className="bg-ink-800 py-20">
      <div className="container-x">
        <div className="grid gap-6 md:grid-cols-3">
          {FEATURES.map(({ num, icon: Icon, title, body }) => (
            <div
              key={title}
              className="group relative overflow-hidden border border-ink-600 bg-ink-700 p-8 transition-all duration-300 hover:border-accent"
            >
              {/* Race number watermark */}
              <div className="heading-display pointer-events-none absolute -right-3 -top-4 text-8xl font-black text-ink-600 transition-colors duration-300 group-hover:text-ink-500">
                {num}
              </div>

              {/* Accent bar top */}
              <span className="absolute left-0 top-0 h-1 w-0 bg-accent transition-all duration-500 group-hover:w-full" />

              <div className="relative z-10">
                <Icon className="h-8 w-8 text-accent" />
                <h3 className="heading-display mt-4 text-xl font-black text-white">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-zinc-400">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
