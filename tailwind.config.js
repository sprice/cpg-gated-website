module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "cpg-red": "#EE0000",
        "cpg-blue": "#0D5BB3",
      },
      fontFamily: {
        cpg: "Editorial New",
      },
    },
  },
  plugins: [],
};
