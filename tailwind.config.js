/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./src/pages/**/*.{js,ts,jsx,tsx,html}",
    "./home/**/*.{js,ts,jsx,tsx,html}",
  ],
  purge: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./home/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {},
  },

  plugins: [],
};

