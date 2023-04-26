/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "night": "#080316",
        'accent': {
          '50': '#e9ebff',
          '100': '#d6daff',
          '200': '#b6b9ff',
          '300': '#8a8bff',
          '400': '#6b5cff',
          '500': '#5a37ff',
          '600': '#5315ff',
          '700': '#4c0bf7',
          '800': '#3d0dc6',
          '900': '#34149b',
          '950': '#080316',
        }
      }
    },
  },
  plugins: [],
};

module.exports = config;
