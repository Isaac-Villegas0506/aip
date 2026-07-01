import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1A1A1A",
        muted: "#6B6B6B",
        cream: "#FAFAFA",
        line: "#E5E5E5",
        aip: {
          green: "#2F7A4F",
          greenDark: "#1F5C38",
          greenSoft: "#EAF3EE",
          yellow: "#2F7A4F",
          yellowSoft: "#F2F7F4",
          red: "#2F7A4F",
          redDark: "#1F5C38",
          violet: "#2F7A4F",
          violetDark: "#1F5C38",
          mint: "#EAF3EE",
          aqua: "#2F7A4F",
          sky: "#F2F7F4",
          lilac: "#F2F7F4",
          lemon: "#F2F7F4",
          blush: "#F2F7F4"
        }
      },
      boxShadow: {
        soft: "0 20px 45px rgba(26, 26, 26, 0.09)",
        card: "0 12px 28px rgba(26, 26, 26, 0.06)"
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
