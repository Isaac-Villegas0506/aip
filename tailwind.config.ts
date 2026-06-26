import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#17221A",
        muted: "#5B665D",
        cream: "#FFFDF3",
        line: "#E8DEC4",
        aip: {
          green: "#006B2E",
          greenDark: "#004D24",
          greenSoft: "#E6F3E8",
          yellow: "#FFD21A",
          yellowSoft: "#FFF3BF",
          red: "#D90000",
          redDark: "#A80000",
          violet: "#D90000",
          violetDark: "#A80000",
          mint: "#E6F3E8",
          aqua: "#006B2E",
          sky: "#E6F3E8",
          lilac: "#FFF3BF",
          lemon: "#FFF3BF",
          blush: "#FFF3BF"
        }
      },
      boxShadow: {
        soft: "0 20px 50px rgba(0, 77, 36, 0.10)",
        card: "0 12px 28px rgba(0, 77, 36, 0.07)"
      },
      fontFamily: {
        sans: ["var(--font-rounded)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-rounded)", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
