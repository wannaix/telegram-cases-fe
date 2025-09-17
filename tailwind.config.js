export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        mobile: "428px",
      },
      colors: {
        telegram: {
          bg: "var(--tg-theme-bg-color)",
          text: "var(--tg-theme-text-color)",
          button: "var(--tg-theme-button-color)",
          buttonText: "var(--tg-theme-button-text-color)",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
