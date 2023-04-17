/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "night": "#080316",
      }
    },
  },
  plugins: [],
};

module.exports = config;
