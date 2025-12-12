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
    // Custom loader для Sanity зображень
    // Повертає прямий URL без параметрів Next.js (?w=, ?q=),
    // які викликають Sanity Image API (платний) на Vercel
    // На Vercel зображення будуть без оптимізації, але працюватимуть
    loader: "custom",
    loaderFile: "./src/utils/sanityImageLoader.ts",
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
