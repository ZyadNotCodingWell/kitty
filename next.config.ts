/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // optional, good for dev
  eslint: {
    ignoreDuringBuilds: true, // disables eslint check on build
  },
  typescript: {
    ignoreBuildErrors: true, // disables TS type checking on build
  },
  // Optional: if you're using images from external domains
  images: {
    domains: ['your-image-domain.com'],
  },
}

module.exports = nextConfig
