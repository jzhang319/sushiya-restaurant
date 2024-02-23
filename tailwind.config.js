/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./react-app/src/**/*.{html,js}"],
  important: true,
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        pacifico: ["Pacifico", "cursive"],
      },
    },
  },
  plugins: [],
};
