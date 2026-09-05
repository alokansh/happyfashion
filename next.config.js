/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for Cloudflare Pages — no Node.js server needed
  output: 'export',
  trailingSlash: true,
  // Images: use unoptimized since we serve from Supabase CDN
  images: {
    unoptimized: true,
  },
  // Disable font optimization for static export
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

module.exports = nextConfig;
