/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "night": "#16093b",
      }
    },
  },
  plugins: [],
};

module.exports = config;
