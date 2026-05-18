import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#080808",
          900: "#111111",
          800: "#181818",
          700: "#202020",
          600: "#2a2a2a",
          500: "#333333"
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
          "linear-gradient(135deg, #1c1c1c 25%, transparent 25%), linear-gradient(225deg, #1c1c1c 25%, transparent 25%), linear-gradient(45deg, #1c1c1c 25%, transparent 25%), linear-gradient(315deg, #1c1c1c 25%, #0d0d0d 25%)",
        "hero-fade":
          "linear-gradient(180deg, #080808 0%, #111111 100%)"
      },
      backgroundSize: {
        "carbon-weave": "16px 16px"
      },
      letterSpacing: {
        widest: "0.2em"
      },
      animation: {
        marquee: "marquee 8s linear infinite",
        "marquee-reverse": "marquee-reverse 8s linear infinite"
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
