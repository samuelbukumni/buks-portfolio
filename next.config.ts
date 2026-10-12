import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/playground",
        destination: "/#learning",
        permanent: true,
      },
      { source: "/explorer", destination: "/#learning", permanent: true },
    ];
  },
};

export default nextConfig;
