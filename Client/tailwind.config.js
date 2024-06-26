const flattenColorPalette =
  require('tailwindcss/lib/util/flattenColorPalette').default;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'ibm-plex-sans': ['"IBM Plex Sans"', 'sans-serif'],
      },
      animation: {
        sweep: 'sweep 0.5s ease-in-out',
        first: 'moveVertical 30s ease infinite',
        second: 'moveInCircle 20s reverse infinite',
        third: 'moveInCircle 40s linear infinite',
        fourth: 'moveHorizontal 40s ease infinite',
        fifth: 'moveInCircle 20s ease infinite',
      },
      keyframes: {
        sweep: {
          '0%': { opacity: 0, transform: 'translateX(-2.5rem)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        moveHorizontal: {
          '0%': {
            transform: 'translateX(-50%) translateY(-10%)',
          },
          '50%': {
            transform: 'translateX(50%) translateY(10%)',
          },
          '100%': {
            transform: 'translateX(-50%) translateY(-10%)',
          },
        },
        moveInCircle: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '50%': {
            transform: 'rotate(180deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
        moveVertical: {
          '0%': {
            transform: 'translateY(-50%)',
          },
          '50%': {
            transform: 'translateY(50%)',
          },
          '100%': {
            transform: 'translateY(-50%)',
          },
        },
      },
    },
  },
  variants: {
    extend: {
      fontWeight: ['group-open'],
      rotate: ['group-open'],
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      let allColors = flattenColorPalette(theme('colors'));
      let newVars = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
      );

      addBase({
        ':root': newVars,
      });
    },
  ],
};
