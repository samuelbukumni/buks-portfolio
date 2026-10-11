import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/playground",
        destination: "/about#learning",
        permanent: true,
      },
      { source: "/explorer", destination: "/about#learning", permanent: true },
    ];
  },
};

export default nextConfig;
