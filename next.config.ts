import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.10minuteschool.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
