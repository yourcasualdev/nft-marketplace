/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ipfs.io',
        pathname: '/ipfs/**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

const { withSuperjson } = require('next-superjson')

module.exports = withSuperjson()(nextConfig)