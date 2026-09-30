import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: "#FAF4E6",
          50: "#FCF9F2",
          100: "#F8F3E8",
          200: "#F1E6CC",
          300: "#E6D7B4",
          400: "#D8C59A",
          500: "#C7B17F",
        },
        cream: {
          DEFAULT: "#F1E6CC",
          light: "#FBF7EF",
          card: "#FAF4E6",
        },
        forest: {
          DEFAULT: "#1E3B29",
          deep: "#0F2116",
          dark: "#14281C",
          mid: "#1E3B29",
          light: "#2B5239",
          accent: "#386B4B",
          50: "#EDF5F0",
          100: "#D3E5D9",
          200: "#A9CDB4",
          300: "#7EB38F",
        },
        gold: {
          DEFAULT: "#AD802C",
          light: "#D8B45D",
          lighter: "#F3E3B5",
          dark: "#8F671F",
          deep: "#6D4D15",
          foil: "#C5A059",
          mustard: "#C59B27",
        },
        charcoal: {
          DEFAULT: "#2B2823",
          light: "#4A463F",
          muted: "#6E685E",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-jost)", "Jost", "Inter", "sans-serif"],
        script: ["var(--font-tangerine)", "Tangerine", "cursive"],
      },
      boxShadow: {
        lux: "0 20px 40px -15px rgba(15, 33, 22, 0.15)",
        card: "0 10px 30px -5px rgba(173, 128, 44, 0.08), 0 20px 40px -15px rgba(15, 33, 22, 0.12)",
        gold: "0 4px 20px rgba(173, 128, 44, 0.25)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #AD802C 0%, #D8B45D 50%, #8F671F 100%)",
        "card-gradient": "linear-gradient(175deg, #FAF4E6 0%, #F5EEDB 60%, #F1E6CC 100%)",
        "emerald-gradient": "linear-gradient(135deg, #1E3B29 0%, #0F2116 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
