import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // Required for Docker
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.10minuteschool.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s3.ap-southeast-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com", // YouTube thumbnails
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
