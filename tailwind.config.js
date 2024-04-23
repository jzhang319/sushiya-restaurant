/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./react-app/src/**/*.{html,js}"],
  theme: {
    extend: {
      textShadow: {
        default: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        // Add more if needed
      },
      scrollbar: ["rounded", "dark"],
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        pacifico: ["Pacifico", "cursive"],
        abel: ["Abel", "sans-serif"],
      },
      translate: {
        0: "0",
        "-full": "-100%",
      },
      spacing: {
        50: "12.5rem",
        60: "15rem",
        70: "17.5rem",
      },
      height: {
        128: "32rem",
        192: "48rem",
        200: "50rem",
        210: "52.5rem",
      },
      animation: {
        "slide-in": "slide-in 2s forwards",
      },
      keyframes: {
        slidein: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
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
