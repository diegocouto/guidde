module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./components/**/*.tsx', './pages/**/*.tsx'],
  theme: {
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
    },
  },
  variants: {},
  plugins: [],
};
