/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  swcMinify: true,
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    // Rewrites apenas para desenvolvimento local
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: "/api/:path*",
          destination: "http://localhost:8000/:path*",
        },
        {
          source: "/auth/:path*",
          destination: "http://localhost:8000/auth/:path*",
        },
        {
          source: "/chat/:path*",
          destination: "http://localhost:8000/chat/:path*",
        },
        {
          source: "/admin/:path*",
          destination: "http://localhost:8000/admin/:path*",
        },
        {
          source: "/pagamento/:path*",
          destination: "http://localhost:8000/pagamento/:path*",
        },
        {
          source: "/webhook/:path*",
          destination: "http://localhost:8000/webhook/:path*",
        }
      ];
    }
    return [];
  },
};

export default nextConfig;