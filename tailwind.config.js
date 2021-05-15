// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./components/**/*.tsx', './pages/**/*.tsx'],
  theme: {
    colors: {
      ...colors,
      gray: colors.coolGray,
    },
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        primary: {
          100: '#F4EAFC',
          200: '#E3CBF8',
          300: '#D2ABF3',
          400: '#B06CEB',
          500: '#8E2DE2',
          600: '#8029CB',
          700: '#551B88',
          800: '#401466',
          900: '#2B0E44',
        },
      },
      container: {
        screens: {
          '2xl': '1280px',
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
