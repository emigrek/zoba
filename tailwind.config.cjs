/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "night": "#0d0524",
      }
    },
  },
  plugins: [],
};

module.exports = config;
