import { CountdownTimer } from "@/components/CountdownTimer";

export function AnnouncementBar() {
  return (
    <div className="bg-black" style={{ color: "#ff0000" }}>
      <div className="container-x py-2 font-black uppercase tracking-widest">
        {/* Mobile */}
        <div className="flex flex-col items-center text-center sm:hidden">
          <span className="text-[11px]">🔥 Summer Sale 05.05.26–06.01.26 🔥</span>
          <span className="text-[13px]" style={{ textShadow: "0 0 8px rgba(255,0,0,0.6)" }}>
            <CountdownTimer />
          </span>
        </div>
        {/* Desktop */}
        <div className="hidden items-center justify-center gap-4 text-sm sm:flex">
          <span>🔥 Huge Summer Sale! May 5 Through June 1, 2026 🔥</span>
          <span className="h-4 w-px bg-red-900" />
          <CountdownTimer />
        </div>
      </div>
    </div>
  );
}
