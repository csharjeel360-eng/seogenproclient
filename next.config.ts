import path from "path";
import type { NextConfig } from "next";
import { BLOG_REDIRECT_SLUGS } from "./app/lib/blog-redirect-slugs.js";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // TypeScript configuration
  typescript: {
    tsconfigPath: "./tsconfig.json",
    ignoreBuildErrors: true,
  },
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  turbopack: {
    root: process.cwd(),
  },
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    return BLOG_REDIRECT_SLUGS.map((slug) => ({
      source: `/${slug}`,
      destination: `/blog/${slug}`,
      permanent: true,
    }));
  },
  // Enable compression
  compress: true,
};

export default nextConfig;
