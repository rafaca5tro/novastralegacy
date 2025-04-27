/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
    unoptimized: true,
  },
  // Enable font optimization
  optimizeFonts: true,
  // Headers are not supported with output: 'export'
  // They will need to be configured at the hosting level
};

module.exports = nextConfig;