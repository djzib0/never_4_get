import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    API_URL: process.env.API_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allows images from any domain
      },
    ],
  },
};

export default nextConfig;
