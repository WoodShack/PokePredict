import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: "export",
  basePath: "/PokePredict",
  assetPrefix: "/PokePredict/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
