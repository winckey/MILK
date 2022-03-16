module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ], // tailwind 적용할 경로 지정
  theme: {
    extend: {
      colors: {
        gold: "#C19A77",
        openseaGray: "#707A83",
        lightGold: "#DAC2A9",
        ourBlack: "#222222",
      },
    },
  },
  darkMode: false, // media: 컴퓨터 환경설정, class: 토글, false: 사용 안 함
  plugins: [require("@tailwindcss/forms")],
};
