module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ], // tailwind 적용할 경로 지정
  theme: {
    extend: {
      colors: {
        openseaGray: "#707A83", // opensea 회색 글씨
        lightBg: "#F5F5F5", // 밝은 배경
        darkBg: "#2A2A2E", // 어두운 배경
        gold: "#C19A77",
        lightGold: "#DAC2A9",
        ourBlack: "#222222",
      },
    },
  },
  darkMode: "media", // media: 컴퓨터 환경설정, class: 토글
  plugins: [require("@tailwindcss/forms")],
};
