/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "bgclr-dark": "#333333",
        "fgclr-light": "#EBECF0",
        "note-pink": "#EABFFF",
        "note-orange": "#FFBDAE",
        "note-yellow": "#FFEA79",
        "note-green": "#93E396",
      },
      fontFamily: {
        inter: "'Inter', sans-serif",
      },
    },
  },
  plugins: [],
};
