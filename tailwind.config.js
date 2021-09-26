module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    maxWidth: {
      'max-w-so-small': '17rem',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
