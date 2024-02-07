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
        'min-h-45em': {
          minHeight: '45em',
          maxHeight: '45em',
        },
        'mx-auto': {
          marginLeft: 'auto',
          marginRight: 'auto',
        },

      };

      const utilities = {};

      for (const key in sizes) {
        const size = sizes[key];
        utilities[`.${key}`] = {
          width: size.width,
          height: size.height,
          minHeight: size.minHeight,
          maxHeight: size.maxHeight,
          marginLeft: 'auto',
          marginRight: 'auto', // Add this line to make margin fit to the element
        };
      }

      addUtilities(utilities, ['responsive', 'hover']);
    }
  ],
};

