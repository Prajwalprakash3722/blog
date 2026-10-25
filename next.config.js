/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/assets/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400" },
          {
            key: "Cloudflare-CDN-Cache-Control",
            value: "public, max-age=604800",
          },
        ],
      },
      {
        source: "/assets/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "Cloudflare-CDN-Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "Cloudflare-CDN-Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  // Vercel creates its own deployment output. Standalone is only needed by
  // Dockerfile.production, which copies .next/standalone into the final image.
  ...(process.env.VERCEL ? {} : { output: "standalone" }),
};

module.exports = nextConfig;
