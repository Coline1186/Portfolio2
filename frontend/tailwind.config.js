export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        typewriter: {
          from: { width: "0%" },
          to: { width: "100%" },
        },
        blink: {
          "0%, 100%": { borderColor: "hsl(0,0%,80%)" },
          "50%": { borderColor: "transparent" },
        },
      },
      animation: {
        typewriter: "typewriter 4s steps(40) 1s 1 normal both",
        blink: "blink 0.8s infinite",
      },
      screens: {
        tablet: "600px",
      },
    },
  },
};
