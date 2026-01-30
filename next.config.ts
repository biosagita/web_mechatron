import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed 'output: export' to support dynamic routes with Firebase Hosting webframeworks
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
