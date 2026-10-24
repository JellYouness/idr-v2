import type { NextConfig } from "next";

// Asset names are stable (not hashed), so cache for a week rather than forever.
const longCache = [
  { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      { source: "/videos/:path*", headers: longCache },
      { source: "/fonts/:path*", headers: longCache },
      { source: "/images/:path*", headers: longCache },
    ];
  },
};

export default nextConfig;
