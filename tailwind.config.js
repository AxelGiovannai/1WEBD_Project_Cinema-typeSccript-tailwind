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

  plugins: [
    function ({ addUtilities }) {
      const sizes = {
        'w-50-h-50': {
          width: '40%',
          height: '40%',
        },
        // Ajoutez d'autres tailles personnalisées au besoin
      };

      const utilities = {};

      for (const key in sizes) {
        const size = sizes[key];
        utilities[`.${key}`] = {
          width: size.width,
          height: size.height,
        };
      }

      addUtilities(utilities, ['responsive', 'hover']);
    }
  ],
};

