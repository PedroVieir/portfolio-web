import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6D5DFB",        // roxo principal
        primarySoft: "#EDEBFF",    // fundo suave
        blueSoft: "#E8F0FF",
        greenSoft: "#E6FAF5",
        textPrimary: "#0F172A",
        textSecondary: "#475569",
        cardBorder: "#E5E7EB",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
