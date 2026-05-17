/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Enable optimization for local images — converts to WebP, lazy loads
    unoptimized: false,
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache for images
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
  // Compress responses
  compress: true,
  // Remove powered-by header
  poweredByHeader: false,
};

export default nextConfig;
