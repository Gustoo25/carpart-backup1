import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0a0c12",
          900: "#0f1117",
          800: "#161b26",
          700: "#1c2333",
          600: "#222d40",
          500: "#2a3650"
        },
        accent: {
          DEFAULT: "#f97316",
          hover: "#ea580c"
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Impact", "sans-serif"]
      },
      backgroundImage: {
        "carbon-weave":
          "linear-gradient(135deg, #1c2333 25%, transparent 25%), linear-gradient(225deg, #1c2333 25%, transparent 25%), linear-gradient(45deg, #1c2333 25%, transparent 25%), linear-gradient(315deg, #1c2333 25%, #0f1117 25%)",
        "hero-fade":
          "radial-gradient(ellipse at center, rgba(249, 115, 22, 0.12) 0%, transparent 60%), linear-gradient(180deg, #0a0c12 0%, #0f1117 100%)"
      },
      backgroundSize: {
        "carbon-weave": "16px 16px"
      },
      letterSpacing: {
        widest: "0.2em"
      },
      animation: {
        marquee: "marquee 35s linear infinite",
        "marquee-reverse": "marquee-reverse 35s linear infinite"
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
