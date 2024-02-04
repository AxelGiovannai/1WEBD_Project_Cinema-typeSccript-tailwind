/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./src/pages/**/*.{js,ts,jsx,tsx,html}",
    "./home/**/*.{js,ts,jsx,tsx,html}",
    "./home/home.html",
  ],
  purge: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./home/**/*.{js,ts,jsx,tsx,html}",
    "./home/home.html",
  ],
  theme: {
    extend: {},
  },

  plugins: [],
};

