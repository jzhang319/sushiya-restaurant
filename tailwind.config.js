/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./react-app/src/**/*.{html,js}"],
  important: true,
  theme: {
    extend: {
      scrollbar: ["rounded", "dark"],
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        pacifico: ["Pacifico", "cursive"],
        abel: ["Abel", "sans-serif"],
      },
    },
  },
  plugins: [
    
    function ({ addUtilities }) {
      const newUtilities = {
        ".gradient-text": {
          background: "linear-gradient(to right, red, black)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
