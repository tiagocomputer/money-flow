import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      "@prisma/client/runtime/library": "@prisma/client/runtime/client",
      "@prisma/client/runtime/library.js": "@prisma/client/runtime/client.js",
    },
  },
};

export default nextConfig;
