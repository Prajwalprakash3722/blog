/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Vercel creates its own deployment output. Standalone is only needed by
  // Dockerfile.production, which copies .next/standalone into the final image.
  ...(process.env.VERCEL ? {} : { output: "standalone" }),
  async rewrites() {
    return [
      {
        source: "/.well-known/mcp",
        destination: "/api/mcp",
      },
    ];
  },
};

module.exports = nextConfig;
