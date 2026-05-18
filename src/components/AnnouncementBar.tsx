export function AnnouncementBar() {
  return (
    <div className="bg-accent text-white">
      <div className="container-x py-2 text-center font-black uppercase tracking-widest">
        {/* Short version on mobile */}
        <span className="block text-[11px] sm:hidden">
          🔥 Huge Summer Sale — Shop Now &amp; Save Big! 🔥
        </span>
        {/* Full version on sm+ */}
        <span className="hidden text-sm sm:block">
          🔥 Huge Summer Sale — Shop Now &amp; Save Big! May 5 Through September 15, 2026 — Limited Time Only 🔥
        </span>
      </div>
    </div>
  );
}
