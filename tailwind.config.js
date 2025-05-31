/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // <--- důležité!
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        oswald: ["var(--font-oswald)", "sans-serif"],
        dmsans: ["var(--font-dmsans)", "sans-serif"],
        quicksand: ["var(--font-quicksand)", "sans-serif"],
        marker: ["var(--font-marker)", "cursive"],
      },
    },
  },
  plugins: [],
};
