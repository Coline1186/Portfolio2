export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Raleway", "sans-serif"],
        dosis: ["Dosis", "sans-serif"],
        pacifico: ["Pacifico", "cursive"],
        poetsen: ['"Poetsen One"', "cursive"],
      },
      keyframes: {
        typewriter: {
          from: { width: "0%" },
          to: { width: "100%" },
        },
        blink: {
          "0%, 100%": { borderColor: "hsl(0,0%,80%)" },
          "50%": { borderColor: "transparent" },
        },
        shine: {
          "0%": {
            backgroundPosition: "0",
          },
          "60%": {
            backgroundPosition: "600px",
          },
          "100%": {
            backgroundPosition: "600px",
          },
        },
      },
      animation: {
        typewriter: "typewriter 1.2s steps(30) 0s 1 normal both",
        blink: "blink 0.8s infinite",
        shine: "shine 5s linear infinite",
      },
      screens: {
        tablet: "600px",
      },
    },
  },
};
