/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/JoeFergraphy.co.uk' : '',
  images: {
    unoptimized: true,
  },
  // Add trailingSlash for better compatibility with GitHub Pages
  trailingSlash: true,
};

export default nextConfig; 