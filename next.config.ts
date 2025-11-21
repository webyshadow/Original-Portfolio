import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove 'standalone' for Netlify
  // output: 'standalone',  ❌ Remove this line
  
  // Turbopack config
  turbopack: {},
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  compress: true,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,

  // Essential for Netlify
  trailingSlash: false,

  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@react-three/fiber',
      '@react-three/drei',
    ],
  },
};

export default nextConfig;

