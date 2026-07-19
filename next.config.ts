import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/gallery",
        destination: "/#gallery",
        permanent: true,
      },
      {
        source: "/checkout",
        destination: "/#pricing",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
