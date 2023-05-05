const { blackA, green, mauve, violet } = require('@radix-ui/colors');

module.exports = {
  content: ["./src/**/*.{js,jsx,tsx}", "./dist/ui.html"],
  theme: {
    extend: {
      colors: {
        'brown': '#E39F61',
        'brown-light': '#F9ECDF',
        'grey-light': '#F3F3F3',
        'grey-dark': '#9C9C9C',
        'grey-text': '#4A4A4A',
      },
    },
  },
  plugins: [],
};
