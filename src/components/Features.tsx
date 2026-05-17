import { ShieldCheck, Wrench, Award } from "lucide-react";

const FEATURES = [
  {
    icon: Award,
    title: "Real Carbon Fiber",
    body: "Genuine 2x2 twill weave. Autoclave-cured for strength and a flawless finish."
  },
  {
    icon: Wrench,
    title: "Vehicle-Specific Fit",
    body: "Engineered for your exact make and model. No trimming, no guesswork."
  },
  {
    icon: ShieldCheck,
    title: "Lifetime Warranty",
    body: "Built to outlast the car it's on. Backed for as long as you own it."
  }
];

export function Features() {
  return (
    <section id="about" className="bg-ink-800 py-20">
      <div className="container-x">
        <div className="grid gap-8 md:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="border border-ink-600 bg-ink-700 p-8"
            >
              <Icon className="h-8 w-8 text-accent" />
              <h3 className="mt-4 heading-display text-xl font-black text-white">
                {title}
              </h3>
              <p className="mt-2 text-sm text-zinc-400">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
