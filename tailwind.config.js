/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/app/**/*.{ts,tsx,js,jsx}",
    "./src/components/**/*.{ts,tsx,js,jsx}",
    "./src/pages/**/*.{ts,tsx,js,jsx}",
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        primary: "#6D5DFB",
        primarySoft: "#F3F2FF",
        secondary: "#9B8CFF",
        purpleSoft: "#F5F3FF",
        blueSoft: "#EFF6FF",
        greenSoft: "#ECFDF5",
        textPrimary: "#111827",
        textSecondary: "#6B7280",
      },
      spacing: {
        '7.5': '1.875rem',
      },
      borderRadius: {
        '3xl': '1.5rem',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(17, 24, 39, 0.06)',
      },
    },
  },
  plugins: [],
}

