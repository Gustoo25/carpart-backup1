"use client";

import { useState, useEffect } from "react";

const SALE_END = new Date("2026-06-01T23:59:59");

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function CountdownTimer() {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    function tick() {
      const diff = SALE_END.getTime() - Date.now();
      if (diff <= 0) { setT({ d: 0, h: 0, m: 0, s: 0 }); return; }
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60)
      });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-mono font-black tracking-widest">
      {t.d}d {pad(t.h)}:{pad(t.m)}:{pad(t.s)}
    </span>
  );
}
