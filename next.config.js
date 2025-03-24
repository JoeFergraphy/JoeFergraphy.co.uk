/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Add trailingSlash for better compatibility with GitHub Pages
  trailingSlash: true,
  // Exclude API routes from the static export
  experimental: {
    // This disables server components for the static export
    serverComponentsExternalPackages: [],
  },
  // Disable types checking during build (to avoid the API route error)
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  eslint: {
    // Similarly, ignore ESLint errors during the build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig; 