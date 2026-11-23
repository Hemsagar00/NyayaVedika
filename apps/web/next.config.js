/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  transpilePackages: ['@nyayavedik/ui', '@nyayavedik/db', '@nyayavedik/config'],
  experimental: {
    optimizePackageImports: ['@nyayavedik/ui', 'lucide-react']
  },
  images: {
    domains: ['localhost', 'supabase.co'],
    formats: ['image/avif', 'image/webp']
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' }
        ]
      }
    ]
  }
}

module.exports = nextConfig