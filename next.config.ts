import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["example.com", "images.unsplash.com", "picsum.photos"], // add all external hosts you need
  },
};

export default nextConfig;
