/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // 개발 모드
  images: {
    loader: "akamai",
    path: "/",
    domains: ["imagedelivery.net", "videodelivery.net"], // next/image
  },
  // experimental: {
  //   outputStandalone: true,
  // },
};

module.exports = { nextConfig, trailingSlash: true };
