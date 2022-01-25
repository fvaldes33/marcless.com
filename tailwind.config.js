const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin')

module.exports = {
  mode: 'jit',
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  // darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        serif: ['Bodoni Moda', ...defaultTheme.fontFamily.serif],
        // sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
        sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
      }
    },
    fontWeight: {
      ...defaultTheme.fontWeight,
      // normal: 300,
    },
    colors: {
      primary: {
        light: '#7dc55b', //#7dc55b
        DEFAULT: '#6ebe49', //#6ebe49
      },
      secondary: {
        DEFAULT: '#0F0F2D',
      },
      tertiary: {
        DEFAULT: '#e98286',
      },
      ...colors,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-hide': {
          /* Firefox */
          'scrollbar-width': 'none',

          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      }
      addUtilities(newUtilities);
    })
  ],
}
