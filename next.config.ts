import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: "export",
  basePath: isProd ? "/PokePredict" : "",
  assetPrefix: isProd ? "/PokePredict/" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
