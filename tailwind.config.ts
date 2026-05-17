import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#050505",
          900: "#0a0a0a",
          800: "#121212",
          700: "#1a1a1a",
          600: "#222222",
          500: "#2a2a2a"
        },
        accent: {
          DEFAULT: "#dc2626",
          hover: "#b91c1c"
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Impact", "sans-serif"]
      },
      backgroundImage: {
        "carbon-weave":
          "linear-gradient(135deg, #1a1a1a 25%, transparent 25%), linear-gradient(225deg, #1a1a1a 25%, transparent 25%), linear-gradient(45deg, #1a1a1a 25%, transparent 25%), linear-gradient(315deg, #1a1a1a 25%, #0a0a0a 25%)",
        "hero-fade":
          "radial-gradient(ellipse at center, rgba(220, 38, 38, 0.15) 0%, transparent 60%), linear-gradient(180deg, #050505 0%, #0a0a0a 100%)"
      },
      backgroundSize: {
        "carbon-weave": "16px 16px"
      },
      letterSpacing: {
        widest: "0.2em"
      }
    }
  },
  plugins: []
};

export default config;
