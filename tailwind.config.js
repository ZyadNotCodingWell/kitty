// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",     // if using app directory
    "./pages/**/*.{js,ts,jsx,tsx}",   // if using pages directory
    "./components/**/*.{js,ts,jsx,tsx}", // shared components
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
}
