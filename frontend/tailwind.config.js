module.exports = {
  content: ["./pages/**/*.{js,jsx,ts,tsx}", "./component/**/*.{js,jsx,ts,tsx}"], // tailwind 적용할 경로 지정
  theme: {
    extend: {},
  },
  darkMode: false, // media: 컴퓨터 환경설정, class: 토글, false: 사용 안 함
  plugins: [require("@tailwindcss/forms")],
};
