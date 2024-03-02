/** @type {import('next').NextConfig} */

import withPlaiceholder from '@plaiceholder/next'
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
      },
    ],
  },
}

export default withPlaiceholder(nextConfig)
