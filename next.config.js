/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Add trailingSlash for better compatibility with GitHub Pages
  trailingSlash: true,
};

export default nextConfig; 