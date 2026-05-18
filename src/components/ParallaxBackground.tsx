"use client";

export function ParallaxBackground() {
  return (
    <>
      {/* Mobile background */}
      <div
        aria-hidden
        className="fixed inset-0 -z-10 block sm:hidden"
        style={{
          backgroundImage: "url('/mobile%20backround.png')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat"
        }}
      />
      {/* Desktop background */}
      <div
        aria-hidden
        className="fixed inset-0 -z-10 hidden sm:block"
        style={{
          backgroundImage: "url('/maybe%20backround.png')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat"
        }}
      />
    </>
  );
}
