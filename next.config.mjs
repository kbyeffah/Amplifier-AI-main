/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ucarecdn.com',
      },
      {
        protocol: 'https',
        hostname: 'wordpress-1327581-4857058.cloudwaysapps.com',
      },
    ],
  },
  experimental: {
    runtime: 'nodejs', // Force Node.js runtime
  },
};

export default nextConfig;
