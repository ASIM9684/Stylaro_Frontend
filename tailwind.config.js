/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}",],
  theme: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar-hide")],
}

