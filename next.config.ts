import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow builds to proceed even if Google Fonts fail to load
  experimental: {
    optimizePackageImports: ['@next/font'],
  },
  // Configure output for production
  output: 'standalone',
}

export default nextConfig;
