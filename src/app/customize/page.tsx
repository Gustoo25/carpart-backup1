"use client";

import Link from "next/link";
import { ArrowRight, ArrowLeft, Check, Upload, Send } from "lucide-react";
import { useState } from "react";

const STEPS = [
  { num: "01", label: "Select Vehicle" },
  { num: "02", label: "Base Style" },
  { num: "03", label: "Led RPM" },
  { num: "04", label: "Top Stripe" },
  { num: "05", label: "Carbon Fiber Style" },
  { num: "06", label: "Side Fabric" },
  { num: "07", label: "Stitching" },
  { num: "08", label: "Airbag" },
  { num: "09", label: "Review & Order" }
];

const MODELS = ["Q50", "Q60", "G35", "G37"];
const Q50_YEARS = ["2014–2017", "2018+"];

const STYLES = [
  { id: "sport", label: "Sport Shape", desc: "A sporty flat-bottom design built for a more aggressive look and enhanced driving feel." },
  { id: "flat-bottom", label: "Flat Top + Flat Bottom", desc: "A race-inspired flat top and bottom design for a bold, modern performance aesthetic." }
];

const LED_OPTIONS = [
  { id: "add", label: "Add Led RPM", price: "$150.00" },
  { id: "no", label: "Do Not Add Led RPM", price: null }
];

const STRIPE_COLORS = [
  { id: "white", label: "White", hex: "#ffffff" },
  { id: "purple", label: "Purple", hex: "#7c3aed" },
  { id: "blue", label: "Blue", hex: "#2563eb" },
  { id: "light-blue", label: "Light Blue", hex: "#38bdf8" },
  { id: "green", label: "Green", hex: "#16a34a" },
  { id: "yellow", label: "Yellow", hex: "#eab308" },
  { id: "orange", label: "Orange", hex: "#ea580c" },
  { id: "red", label: "Red", hex: "#dc2626" },
  { id: "pink", label: "Pink", hex: "#ec4899" },
  { id: "none", label: "No Stripe", hex: null }
];

const CF_STYLES = [
  { id: "twill", label: "Twill Carbon", upcharge: null },
  { id: "forged", label: "Forged Carbon", upcharge: "+$50.00" }
];

const SIDE_FABRICS = [
  { id: "alcantara", label: "Alcantara", desc: "Lightweight suede-like material with a premium soft grip and motorsport heritage." },
  { id: "smooth-leather", label: "Smooth Leather", desc: "Full-grain leather with a clean, refined finish for a luxury feel." },
  { id: "perforated", label: "Perforated Leather", desc: "Ventilated leather with micro-perforations for enhanced grip and airflow." }
];

const FABRIC_COLORS: Record<string, { id: string; label: string; hex: string }[]> = {
  alcantara: [
    { id: "black", label: "Black", hex: "#1a1a1a" },
    { id: "white", label: "White", hex: "#e5e5e5" },
    { id: "yellow", label: "Yellow", hex: "#eab308" },
    { id: "blue", label: "Blue", hex: "#2563eb" },
    { id: "orange", label: "Orange", hex: "#ea580c" },
    { id: "purple", label: "Purple", hex: "#7c3aed" },
    { id: "gray", label: "Gray", hex: "#6b7280" }
  ],
  "smooth-leather": [
    { id: "black", label: "Black", hex: "#1a1a1a" },
    { id: "gray", label: "Gray", hex: "#6b7280" },
    { id: "red", label: "Red", hex: "#dc2626" },
    { id: "orange", label: "Orange", hex: "#ea580c" },
    { id: "yellow", label: "Yellow", hex: "#eab308" },
    { id: "blue", label: "Blue", hex: "#2563eb" },
    { id: "purple", label: "Purple", hex: "#7c3aed" },
    { id: "cream", label: "Cream", hex: "#f5f0e8" },
    { id: "white", label: "White", hex: "#e5e5e5" }
  ],
  perforated: [
    { id: "black", label: "Black", hex: "#1a1a1a" },
    { id: "gray", label: "Gray", hex: "#6b7280" },
    { id: "red", label: "Red", hex: "#dc2626" },
    { id: "orange", label: "Orange", hex: "#ea580c" },
    { id: "yellow", label: "Yellow", hex: "#eab308" },
    { id: "blue", label: "Blue", hex: "#2563eb" },
    { id: "purple", label: "Purple", hex: "#7c3aed" },
    { id: "cream", label: "Cream", hex: "#f5f0e8" },
    { id: "white", label: "White", hex: "#e5e5e5" }
  ]
};

const STITCH_COLORS = [
  { id: "red", label: "Red", hex: "#dc2626" },
  { id: "white", label: "White", hex: "#ffffff" },
  { id: "black", label: "Black", hex: "#1a1a1a" },
  { id: "blue", label: "Blue", hex: "#2563eb" },
  { id: "yellow", label: "Yellow", hex: "#eab308" },
  { id: "orange", label: "Orange", hex: "#ea580c" },
  { id: "green", label: "Green", hex: "#16a34a" },
  { id: "purple", label: "Purple", hex: "#7c3aed" },
  { id: "pink", label: "Pink", hex: "#ec4899" },
  { id: "silver", label: "Silver", hex: "#9ca3af" }
];

const AIRBAG_OPTIONS = [
  { id: "standard", label: "Standard Airbag", desc: "Factory-style airbag retained with OEM cover." },
  { id: "carbon-cover", label: "Carbon Fiber Cover", desc: "Airbag retained with a custom carbon fiber cover overlay." },
  { id: "colored-cover", label: "Colored Cover", desc: "Airbag retained with a color-matched cover to your build." },
  { id: "no-airbag", label: "Horn Button Only", desc: "Airbag removed, replaced with a custom carbon fiber horn button." }
];

const CF_COLORS = [
  { id: "regular", label: "Regular", hex: "#1a1a1a" },
  { id: "red", label: "Red", hex: "#dc2626" },
  { id: "blue", label: "Blue", hex: "#2563eb" },
  { id: "green", label: "Green", hex: "#16a34a" },
  { id: "purple", label: "Purple", hex: "#7c3aed" },
  { id: "yellow", label: "Yellow", hex: "#eab308" },
  { id: "silver", label: "Silver", hex: "#9ca3af" },
  { id: "orange", label: "Orange", hex: "#ea580c" }
];

function ColorInquiry({
  section,
  active,
  submitted,
  desc,
  file,
  onOpen,
  onClose,
  onDescChange,
  onFileChange,
  onSubmit
}: {
  section: string;
  active: boolean;
  submitted: boolean;
  desc: string;
  file: File | null;
  onOpen: () => void;
  onClose: () => void;
  onDescChange: (v: string) => void;
  onFileChange: (f: File | null) => void;
  onSubmit: () => void;
}) {
  if (submitted) {
    return (
      <div className="mt-4 border-t border-ink-700 pt-4">
        <div className="flex items-center gap-3 border border-accent/30 bg-accent/5 px-4 py-3">
          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center bg-accent">
            <Check className="h-3 w-3 text-white" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-white">Request Sent!</p>
            <p className="text-xs text-zinc-500">We'll reach out within 24–48 hours.</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="mt-4 border-t border-ink-700 pt-4">
      {!active ? (
        <button type="button" onClick={onOpen} className="text-xs font-bold uppercase tracking-widest text-zinc-500 underline underline-offset-4 hover:text-accent transition-colors">
          Don't see your color? Request a custom one →
        </button>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-black uppercase tracking-widest text-accent">Custom Color Request</p>
            <button type="button" onClick={onClose} className="text-xs text-zinc-600 hover:text-white transition-colors">Cancel</button>
          </div>
          <textarea
            rows={3}
            value={desc}
            onChange={(e) => onDescChange(e.target.value)}
            placeholder="Describe the color you have in mind..."
            className="w-full border border-ink-500 bg-ink-900 px-3 py-2 text-sm text-white placeholder-zinc-600 outline-none focus:border-accent transition-colors resize-none"
          />
          <label className={`flex cursor-pointer items-center gap-3 border border-dashed px-4 py-3 transition-colors ${file ? "border-accent bg-accent/5" : "border-ink-600 hover:border-accent"}`}>
            <input type="file" accept="image/*" className="sr-only" onChange={(e) => onFileChange(e.target.files?.[0] ?? null)} />
            <Upload className={`h-4 w-4 flex-shrink-0 ${file ? "text-accent" : "text-zinc-600"}`} />
            <span className="text-xs text-zinc-400">{file ? file.name : "Attach a reference photo (optional)"}</span>
          </label>
          <button
            type="button"
            disabled={!desc.trim()}
            onClick={onSubmit}
            className={`group inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${
              desc.trim() ? "bg-accent text-white hover:bg-accent-hover" : "cursor-not-allowed bg-ink-700 text-zinc-600"
            }`}
          >
            Send Request <Send className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      )}
    </div>
  );
}

function Placeholder({ label, height = "h-32" }: { label: string; height?: string }) {
  return (
    <div className={`${height} flex items-center justify-center border border-dashed border-ink-500 bg-ink-800/50`}>
      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
        [ {label} ]
      </span>
    </div>
  );
}

function OptionCard({
  label,
  desc,
  selected,
  onClick
}: {
  label: string;
  desc?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group border text-left transition-all duration-200 ${
        selected ? "border-accent bg-accent/10" : "border-ink-500 bg-ink-700 hover:border-accent hover:bg-ink-600"
      }`}
    >
      <div className="relative h-44 border-b border-ink-600 bg-ink-900 flex items-center justify-center overflow-hidden">
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">[ Add Photo Here ]</span>
        {selected && (
          <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center bg-accent">
            <Check className="h-3 w-3 text-white" />
          </div>
        )}
        <span className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-500 ${selected ? "w-full" : "w-0 group-hover:w-full"}`} />
      </div>
      <div className="p-4">
        <h3 className={`heading-display text-lg font-black transition-colors ${selected ? "text-accent" : "text-white"}`}>
          {label}
        </h3>
        {desc && <p className="mt-1 text-xs text-zinc-500 leading-relaxed">{desc}</p>}
      </div>
    </button>
  );
}

function StepHeader({
  num,
  label,
  unlocked,
  summary
}: {
  num: string;
  label: string;
  unlocked: boolean;
  summary?: string | null;
}) {
  return (
    <div className="border-b border-ink-600 px-6 py-4 flex items-center gap-3">
      <span className={`heading-display text-2xl font-black ${unlocked ? "text-accent" : "text-zinc-600"}`}>{num}</span>
      <h2 className={`heading-display text-xl font-black ${unlocked ? "text-white" : "text-zinc-400"}`}>{label}</h2>
      {summary && (
        <span className="ml-auto text-xs font-black uppercase tracking-widest text-accent flex items-center gap-1">
          <Check className="h-3 w-3" /> {summary}
        </span>
      )}
    </div>
  );
}

export default function CustomizePage() {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [selectedLedRpm, setSelectedLedRpm] = useState<string | null>(null);
  const [selectedStripe, setSelectedStripe] = useState<string | null>(null);
  const [selectedCfStyle, setSelectedCfStyle] = useState<string | null>(null);
  const [selectedCfColor, setSelectedCfColor] = useState<string | null>(null);
  const [selectedAirbag, setSelectedAirbag] = useState<string | null>(null);
  const [selectedFabric, setSelectedFabric] = useState<string | null>(null);
  const [selectedFabricColor, setSelectedFabricColor] = useState<string | null>(null);
  const [selectedStitch, setSelectedStitch] = useState<string | null>(null);
  const [activeInquiry, setActiveInquiry] = useState<string | null>(null);
  const [inquiryDesc, setInquiryDesc] = useState("");
  const [inquiryFile, setInquiryFile] = useState<File | null>(null);
  const [submittedInquiries, setSubmittedInquiries] = useState<Set<string>>(new Set());

  function openInquiry(section: string) {
    setActiveInquiry(section);
    setInquiryDesc("");
    setInquiryFile(null);
  }

  function submitInquiry(section: string) {
    if (!inquiryDesc.trim()) return;
    setSubmittedInquiries(prev => new Set(prev).add(section));
    setActiveInquiry(null);
  }

  function handleModelClick(model: string) {
    setSelectedModel(model);
    setSelectedYear(null);
  }

  const vehicleComplete = selectedModel !== null && (selectedModel !== "Q50" || selectedYear !== null);
  const styleComplete = selectedStyle !== null;
  const ledRpmComplete = selectedLedRpm !== null;
  const stripeComplete = selectedStripe !== null;
  const cfStyleComplete = selectedCfStyle !== null && selectedCfColor !== null;
  const airbagComplete = selectedAirbag !== null;
  const fabricComplete = selectedFabric !== null && selectedFabricColor !== null;
  const stitchComplete = selectedStitch !== null;

  const vehicleSummary = selectedModel
    ? selectedYear ? `Infiniti ${selectedModel} · ${selectedYear}` : `Infiniti ${selectedModel}`
    : null;

  const stepStatus = [
    vehicleComplete,
    styleComplete,
    ledRpmComplete,
    stripeComplete,
    cfStyleComplete,
    fabricComplete,
    stitchComplete,
    airbagComplete,
    false
  ];

  const activeStep = stepStatus.findIndex((done) => !done);

  const allComplete = vehicleComplete && styleComplete && ledRpmComplete && stripeComplete && cfStyleComplete && fabricComplete && stitchComplete && airbagComplete;

  return (
    <div className="min-h-screen">
      {/* Hero banner */}
      <div className="relative border-b border-ink-600 bg-ink-950 py-12">
        <span className="absolute left-0 top-0 h-1 w-full bg-accent" />
        <div className="container-x">
          <Link href="/#wheels" className="mb-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
            <ArrowLeft className="h-3 w-3" /> Back
          </Link>
          <div className="skew-badge mb-3"><span>Build Yours</span></div>
          <h1 className="heading-display text-4xl font-black text-white sm:text-5xl lg:text-6xl">
            Custom Steering Wheel<br />
            <span className="text-accent">Configurator</span>
          </h1>
          <p className="mt-3 max-w-lg text-sm text-zinc-400">
            Walk through each step below to design your one-of-one carbon fiber steering wheel.
          </p>
        </div>
      </div>

      <div className="container-x py-12">
        {/* Progress bar */}
        <div className="mb-12 flex items-center gap-0 overflow-x-auto pb-2">
          {STEPS.map((step, i) => {
            const done = stepStatus[i];
            const active = i === activeStep;
            return (
              <div key={step.num} className="flex items-center">
                <div className={`flex flex-shrink-0 items-center gap-2 px-4 py-2 transition-all duration-300 ${
                  done ? "border border-accent bg-accent/10"
                  : active ? "border border-accent/60 bg-accent/5"
                  : "border border-ink-600 bg-ink-800"
                }`}>
                  <span className={`heading-display text-sm font-black ${done || active ? "text-accent" : "text-zinc-600"}`}>{step.num}</span>
                  <span className={`whitespace-nowrap text-xs font-bold uppercase tracking-widest ${done || active ? "text-white" : "text-zinc-600"}`}>{step.label}</span>
                  {done && <Check className="h-3 w-3 text-accent" />}
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`h-px w-4 flex-shrink-0 transition-colors duration-300 ${done ? "bg-accent/40" : "bg-ink-600"}`} />
                )}
              </div>
            );
          })}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">

            {/* Step 01 — Vehicle */}
            <div className="border border-ink-600 bg-ink-800">
              <StepHeader num="01" label="Select Your Vehicle" unlocked summary={vehicleComplete ? vehicleSummary : null} />
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {MODELS.map((model) => (
                    <button key={model} type="button" onClick={() => handleModelClick(model)}
                      className={`border py-4 text-center transition-all duration-200 ${selectedModel === model ? "border-accent bg-accent/10" : "border-ink-500 bg-ink-700 hover:border-accent hover:bg-ink-600"}`}>
                      <span className={`heading-display text-2xl font-black ${selectedModel === model ? "text-accent" : "text-white"}`}>{model}</span>
                    </button>
                  ))}
                </div>
                {selectedModel === "Q50" && (
                  <div className="space-y-2">
                    <p className="text-xs font-black uppercase tracking-widest text-zinc-400">Select Year Range</p>
                    <div className="grid grid-cols-2 gap-3">
                      {Q50_YEARS.map((year) => (
                        <button key={year} type="button" onClick={() => setSelectedYear(year)}
                          className={`border py-4 text-center transition-all duration-200 ${selectedYear === year ? "border-accent bg-accent/10" : "border-ink-500 bg-ink-700 hover:border-accent hover:bg-ink-600"}`}>
                          <span className={`heading-display text-xl font-black ${selectedYear === year ? "text-accent" : "text-white"}`}>{year}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Step 02 — Base Style */}
            <div className={`border border-ink-600 bg-ink-800 transition-opacity duration-300 ${vehicleComplete ? "opacity-100" : "opacity-40 pointer-events-none"}`}>
              <StepHeader num="02" label="Choose Base Style" unlocked={vehicleComplete} summary={selectedStyle ? STYLES.find(s => s.id === selectedStyle)?.label : null} />
              <div className="p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {STYLES.map((style) => (
                    <OptionCard key={style.id} label={style.label} desc={style.desc} selected={selectedStyle === style.id} onClick={() => setSelectedStyle(style.id)} />
                  ))}
                </div>
              </div>
            </div>

            {/* Step 03 — Led RPM */}
            <div id="step-03" className={`border border-ink-600 bg-ink-800 transition-opacity duration-300 ${vehicleComplete ? "opacity-100" : "opacity-40 pointer-events-none"}`}>
              <StepHeader num="03" label="Led RPM Add-on" unlocked={vehicleComplete} summary={selectedLedRpm} />
              <div className="p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {LED_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedLedRpm(opt.label)}
                      className={`group border text-left transition-all duration-200 ${
                        selectedLedRpm === opt.label ? "border-accent bg-accent/10" : "border-ink-500 bg-ink-700 hover:border-accent hover:bg-ink-600"
                      }`}
                    >
                      <div className="relative h-44 border-b border-ink-600 bg-ink-900 flex items-center justify-center overflow-hidden">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">[ Add Photo Here ]</span>
                        {selectedLedRpm === opt.label && (
                          <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center bg-accent">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                        <span className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-500 ${selectedLedRpm === opt.label ? "w-full" : "w-0 group-hover:w-full"}`} />
                      </div>
                      <div className="flex items-center justify-between p-4">
                        <h3 className={`heading-display text-lg font-black transition-colors ${selectedLedRpm === opt.label ? "text-accent" : "text-white"}`}>
                          {opt.label}
                        </h3>
                        {opt.price && (
                          <span className="text-sm font-black text-accent">+ {opt.price}</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 04 — Top Stripe */}
            <div className={`border border-ink-600 bg-ink-800 transition-opacity duration-300 ${vehicleComplete ? "opacity-100" : "opacity-40 pointer-events-none"}`}>
              <StepHeader num="04" label="Top Stripe" unlocked={vehicleComplete} summary={selectedStripe} />
              <div className="p-6">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                  {STRIPE_COLORS.map((color) => (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => { setSelectedStripe(color.label); setActiveInquiry(null); }}
                      className={`group relative border p-3 text-left transition-all duration-200 ${
                        selectedStripe === color.label
                          ? "border-accent bg-accent/10"
                          : "border-ink-500 bg-ink-700 hover:border-accent hover:bg-ink-600"
                      }`}
                    >
                      {color.hex ? (
                        <div className="mb-3 h-10 w-full rounded-sm border border-white/10" style={{ backgroundColor: color.hex }} />
                      ) : (
                        <div className="mb-3 flex h-10 w-full items-center justify-center rounded-sm border border-dashed border-ink-500 bg-ink-900">
                          <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-600">None</span>
                        </div>
                      )}
                      <span className={`block text-xs font-semibold transition-colors ${selectedStripe === color.label ? "text-accent" : "text-white"}`}>
                        {color.label}
                      </span>
                      {selectedStripe === color.label && (
                        <div className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center bg-accent">
                          <Check className="h-2.5 w-2.5 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <ColorInquiry
                  section="stripe"
                  active={activeInquiry === "stripe"}
                  submitted={submittedInquiries.has("stripe")}
                  desc={inquiryDesc}
                  file={inquiryFile}
                  onOpen={() => { openInquiry("stripe"); setSelectedStripe(null); }}
                  onClose={() => setActiveInquiry(null)}
                  onDescChange={setInquiryDesc}
                  onFileChange={setInquiryFile}
                  onSubmit={() => submitInquiry("stripe")}
                />
              </div>
            </div>

            {/* Step 05 — Carbon Fiber Style */}
            <div className={`border border-ink-600 bg-ink-800 transition-opacity duration-300 ${vehicleComplete ? "opacity-100" : "opacity-40 pointer-events-none"}`}>
              <StepHeader
                num="05"
                label="Carbon Fiber Style"
                unlocked={vehicleComplete}
                summary={selectedCfStyle && selectedCfColor
                  ? `${CF_STYLES.find(s => s.id === selectedCfStyle)?.label} · ${CF_COLORS.find(c => c.id === selectedCfColor)?.label}`
                  : null}
              />
              <div className="p-6 space-y-6">
                {/* Pattern */}
                <div>
                  <p className="mb-3 text-xs font-black uppercase tracking-widest text-zinc-400">Choose Pattern</p>
                  <div className="grid grid-cols-2 gap-4">
                    {CF_STYLES.map((cf) => (
                      <button
                        key={cf.id}
                        type="button"
                        onClick={() => { setSelectedCfStyle(cf.id); setSelectedCfColor(null); }}
                        className={`group border text-left transition-all duration-200 ${
                          selectedCfStyle === cf.id ? "border-accent bg-accent/10" : "border-ink-500 bg-ink-700 hover:border-accent hover:bg-ink-600"
                        }`}
                      >
                        <div className="relative h-44 border-b border-ink-600 bg-ink-900 flex items-center justify-center overflow-hidden">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">[ Add Photo Here ]</span>
                          {selectedCfStyle === cf.id && (
                            <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center bg-accent">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          )}
                          <span className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-500 ${selectedCfStyle === cf.id ? "w-full" : "w-0 group-hover:w-full"}`} />
                        </div>
                        <div className="flex items-center justify-between p-4">
                          <h3 className={`heading-display text-lg font-black transition-colors ${selectedCfStyle === cf.id ? "text-accent" : "text-white"}`}>
                            {cf.label}
                          </h3>
                          {cf.upcharge && (
                            <span className="text-sm font-black text-accent">+ $50.00</span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color — appears after pattern is chosen */}
                {selectedCfStyle && (
                  <div>
                    <p className="mb-3 text-xs font-black uppercase tracking-widest text-zinc-400">Choose Carbon Color</p>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {CF_COLORS.map((color) => (
                        <button
                          key={color.id}
                          type="button"
                          onClick={() => setSelectedCfColor(color.id)}
                          className={`group relative border p-3 text-left transition-all duration-200 ${
                            selectedCfColor === color.id
                              ? "border-accent bg-accent/10"
                              : "border-ink-500 bg-ink-700 hover:border-accent hover:bg-ink-600"
                          }`}
                        >
                          <div
                            className="mb-3 h-10 w-full rounded-sm border border-white/10"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span className={`block whitespace-nowrap text-xs font-semibold transition-colors ${
                            selectedCfColor === color.id ? "text-accent" : "text-white"
                          }`}>
                            {selectedCfStyle === "forged" ? `with ${color.label} Flakes` : color.label}
                          </span>
                          {selectedCfColor === color.id && (
                            <div className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center bg-accent">
                              <Check className="h-2.5 w-2.5 text-white" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  {selectedCfStyle === "twill" && (
                    <ColorInquiry
                      section="cf-color"
                      active={activeInquiry === "cf-color"}
                      submitted={submittedInquiries.has("cf-color")}
                      desc={inquiryDesc}
                      file={inquiryFile}
                      onOpen={() => { openInquiry("cf-color"); setSelectedCfColor(null); }}
                      onClose={() => setActiveInquiry(null)}
                      onDescChange={setInquiryDesc}
                      onFileChange={setInquiryFile}
                      onSubmit={() => submitInquiry("cf-color")}
                    />
                  )}
                  </div>
                )}
              </div>
            </div>

            {/* Step 06 — Side Fabric */}
            <div className={`border border-ink-600 bg-ink-800 transition-opacity duration-300 ${vehicleComplete ? "opacity-100" : "opacity-40 pointer-events-none"}`}>
              <StepHeader num="06" label="Side Fabric" unlocked={vehicleComplete} summary={selectedFabric ? SIDE_FABRICS.find(f => f.id === selectedFabric)?.label ?? null : null} />
              <div className="p-6 space-y-5">
                {/* Fabric cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {SIDE_FABRICS.map((fabric) => (
                    <button
                      key={fabric.id}
                      type="button"
                      onClick={() => { setSelectedFabric(fabric.id); setSelectedFabricColor(null); }}
                      className={`group border text-left transition-all duration-200 ${
                        selectedFabric === fabric.id ? "border-accent bg-accent/10" : "border-ink-500 bg-ink-700 hover:border-accent hover:bg-ink-600"
                      }`}
                    >
                      <div className="relative h-52 border-b border-ink-600 bg-ink-900 flex items-center justify-center overflow-hidden">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">[ Add Photo Here ]</span>
                        {selectedFabric === fabric.id && (
                          <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center bg-accent">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                        <span className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-500 ${selectedFabric === fabric.id ? "w-full" : "w-0 group-hover:w-full"}`} />
                      </div>
                      <div className="p-5">
                        <h3 className={`heading-display text-xl font-black transition-colors ${selectedFabric === fabric.id ? "text-accent" : "text-white"}`}>
                          {fabric.label}
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed text-zinc-500">{fabric.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Inline color picker — expands after fabric is chosen */}
                {selectedFabric && (
                  <div className="border border-ink-600 bg-ink-900 p-5">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="h-px flex-1 bg-ink-600" />
                      <span className="text-xs font-black uppercase tracking-widest text-accent">
                        Choose {SIDE_FABRICS.find(f => f.id === selectedFabric)?.label} Color
                      </span>
                      <span className="h-px flex-1 bg-ink-600" />
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {(FABRIC_COLORS[selectedFabric] ?? []).map((color) => (
                        <button
                          key={color.id}
                          type="button"
                          onClick={() => { setSelectedFabricColor(color.id); setActiveInquiry(null); }}
                          className="group flex flex-col items-center gap-2"
                        >
                          <div
                            className={`relative h-10 w-10 rounded-full border-2 transition-all duration-200 ${
                              selectedFabricColor === color.id
                                ? "border-accent scale-110 shadow-[0_0_12px_rgba(220,38,38,0.5)]"
                                : "border-ink-500 hover:border-accent hover:scale-105"
                            }`}
                            style={{ backgroundColor: color.hex }}
                          >
                            {selectedFabricColor === color.id && (
                              <div className="absolute inset-0 flex items-center justify-center rounded-full">
                                <Check className="h-4 w-4 text-white drop-shadow" />
                              </div>
                            )}
                          </div>
                          <span className={`text-[10px] font-semibold transition-colors ${selectedFabricColor === color.id ? "text-accent" : "text-zinc-500"}`}>
                            {color.label}
                          </span>
                        </button>
                      ))}
                    </div>

                    <ColorInquiry
                      section="fabric"
                      active={activeInquiry === "fabric"}
                      submitted={submittedInquiries.has("fabric")}
                      desc={inquiryDesc}
                      file={inquiryFile}
                      onOpen={() => { openInquiry("fabric"); setSelectedFabricColor(null); }}
                      onClose={() => setActiveInquiry(null)}
                      onDescChange={setInquiryDesc}
                      onFileChange={setInquiryFile}
                      onSubmit={() => submitInquiry("fabric")}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Step 07 — Stitching */}
            <div className={`border border-ink-600 bg-ink-800 transition-opacity duration-300 ${vehicleComplete ? "opacity-100" : "opacity-40 pointer-events-none"}`}>
              <StepHeader num="07" label="Stitching Color" unlocked={vehicleComplete} summary={selectedStitch ? STITCH_COLORS.find(c => c.id === selectedStitch)?.label ?? null : null} />
              <div className="p-6">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                  {STITCH_COLORS.map((color) => (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => setSelectedStitch(color.id)}
                      className={`group relative border p-3 text-left transition-all duration-200 ${
                        selectedStitch === color.id
                          ? "border-accent bg-accent/10"
                          : "border-ink-500 bg-ink-700 hover:border-accent hover:bg-ink-600"
                      }`}
                    >
                      <div className="mb-3 h-10 w-full rounded-sm border border-white/10" style={{ backgroundColor: color.hex }} />
                      <span className={`block text-xs font-semibold transition-colors ${selectedStitch === color.id ? "text-accent" : "text-white"}`}>
                        {color.label}
                      </span>
                      {selectedStitch === color.id && (
                        <div className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center bg-accent">
                          <Check className="h-2.5 w-2.5 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <ColorInquiry
                  section="stitch"
                  active={activeInquiry === "stitch"}
                  submitted={submittedInquiries.has("stitch")}
                  desc={inquiryDesc}
                  file={inquiryFile}
                  onOpen={() => { openInquiry("stitch"); setSelectedStitch(null); }}
                  onClose={() => setActiveInquiry(null)}
                  onDescChange={setInquiryDesc}
                  onFileChange={setInquiryFile}
                  onSubmit={() => submitInquiry("stitch")}
                />
              </div>
            </div>

            {/* Step 08 — Airbag */}
            <div className={`border border-ink-600 bg-ink-800 transition-opacity duration-300 ${vehicleComplete ? "opacity-100" : "opacity-40 pointer-events-none"}`}>
              <StepHeader num="08" label="Airbag Options" unlocked={vehicleComplete} summary={selectedAirbag ? AIRBAG_OPTIONS.find(a => a.id === selectedAirbag)?.label ?? null : null} />
              <div className="p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {AIRBAG_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedAirbag(opt.id)}
                      className={`group border text-left transition-all duration-200 ${
                        selectedAirbag === opt.id ? "border-accent bg-accent/10" : "border-ink-500 bg-ink-700 hover:border-accent hover:bg-ink-600"
                      }`}
                    >
                      <div className="relative h-44 border-b border-ink-600 bg-ink-900 flex items-center justify-center overflow-hidden">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">[ Add Photo Here ]</span>
                        {selectedAirbag === opt.id && (
                          <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center bg-accent">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                        <span className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-500 ${selectedAirbag === opt.id ? "w-full" : "w-0 group-hover:w-full"}`} />
                      </div>
                      <div className="p-4">
                        <h3 className={`heading-display text-lg font-black transition-colors ${selectedAirbag === opt.id ? "text-accent" : "text-white"}`}>
                          {opt.label}
                        </h3>
                        <p className="mt-1 text-xs text-zinc-500 leading-relaxed">{opt.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 09 — Review */}
            <div className={`border border-ink-600 bg-ink-800 transition-opacity duration-300 ${vehicleComplete ? "opacity-100" : "opacity-40 pointer-events-none"}`}>
              <StepHeader num="09" label="Review & Order" unlocked={vehicleComplete} />
              <div className="p-6">
                <Placeholder label="Order review & checkout — coming soon" height="h-32" />
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="sticky top-24 space-y-6">

              <div className="border border-ink-600 bg-ink-800">
                <div className="border-b border-ink-600 px-5 py-3">
                  <span className="text-xs font-black uppercase tracking-widest text-white">Live Preview</span>
                </div>
                <div className="p-5">
                  <Placeholder label="Wheel preview" height="h-56" />
                </div>
              </div>

              <div className="border border-ink-600 bg-ink-800">
                <div className="border-b border-ink-600 px-5 py-3">
                  <span className="text-xs font-black uppercase tracking-widest text-white">Your Build</span>
                </div>
                <div className="p-5 space-y-3">
                  {[
                    { label: "Vehicle", value: vehicleSummary },
                    { label: "Base Style", value: selectedStyle ? STYLES.find(s => s.id === selectedStyle)?.label ?? null : null },
                    { label: "Led RPM", value: selectedLedRpm },
                    { label: "Top Stripe", value: selectedStripe },
                    { label: "CF Style", value: selectedCfStyle ? CF_STYLES.find(s => s.id === selectedCfStyle)?.label ?? null : null },
                    { label: "CF Color", value: selectedCfColor ? CF_COLORS.find(c => c.id === selectedCfColor)?.label ?? null : null },
                    { label: "Side Fabric", value: selectedFabric && selectedFabricColor ? `${SIDE_FABRICS.find(f => f.id === selectedFabric)?.label} · ${FABRIC_COLORS[selectedFabric]?.find(c => c.id === selectedFabricColor)?.label}` : null },
                    { label: "Stitching", value: selectedStitch ? STITCH_COLORS.find(c => c.id === selectedStitch)?.label ?? null : null },
                    { label: "Airbag", value: selectedAirbag ? AIRBAG_OPTIONS.find(a => a.id === selectedAirbag)?.label ?? null : null }
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between border-b border-ink-700 pb-3 last:border-0">
                      <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">{item.label}</span>
                      <span className={`text-xs font-bold uppercase tracking-widest ${item.value ? "text-white" : "text-zinc-600"}`}>
                        {item.value ?? "—"}
                      </span>
                    </div>
                  ))}

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm font-black uppercase tracking-widest text-white">Est. Total</span>
                    <span className="heading-display text-2xl font-black text-accent">
                      {selectedStyle
                        ? `$${(410 + (selectedLedRpm === "Add Led RPM" ? 150 : 0) + (selectedCfStyle === "forged" ? 50 : 0)).toFixed(2)}`
                        : "$—.—"}
                    </span>
                  </div>

                  <button
                    type="button"
                    disabled={!allComplete}
                    className={`mt-2 w-full px-6 py-4 text-sm font-bold uppercase tracking-widest transition-colors ${
                      allComplete ? "bg-accent text-white hover:bg-accent-hover cursor-pointer" : "cursor-not-allowed bg-ink-700 text-zinc-600"
                    }`}
                  >
                    {allComplete ? "Place Order" : "Complete All Steps"}
                  </button>
                </div>
              </div>

              <div className="border border-ink-600 bg-ink-800 p-5">
                <div className="text-xs font-black uppercase tracking-widest text-accent mb-2">Need Help?</div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Not sure where to start? Contact us and we'll walk you through the build personally.
                </p>
                <Link href="/#contact" className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-accent transition-colors">
                  Contact Us <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
