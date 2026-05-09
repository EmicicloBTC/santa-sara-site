/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        serif: [
          "Fraunces",
          "Cormorant Garamond",
          "ui-serif",
          "Georgia",
          "Times New Roman",
          "serif",
        ],
      },
      colors: {
        brand: {
          cream: "#f4efe6",
          paper: "#f8f3ea",
          ink: "#14110f",
          clay: "#b85245",
          brass: "#c8a866",
          sand: "#e7d8b3",
          sage: "#6e7b5a",
        },
      },
    },
  },
  plugins: [],
};
