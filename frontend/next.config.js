/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // 개발 모드
  images: {
    loader: "akamai",
    path: "/",
  },
};

module.exports = nextConfig;
