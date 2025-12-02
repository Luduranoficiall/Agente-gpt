/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8000/:path*", // Proxy para o backend local
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
  },
};

export default nextConfig;