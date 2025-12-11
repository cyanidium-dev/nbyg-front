import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "cdn.sanity.io",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "**",
      },
    ],
  },

  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "motion",
      "swiper",
      "react-select",
      "formik",
    ],
    turbopackFileSystemCacheForDev: true,
  },
};

export default nextConfig;
