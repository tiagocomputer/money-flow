import type { NextConfig } from "next";
import { config } from "dotenv";

config({ path: ".env.local" });

const nextConfig: NextConfig = {
  env: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  turbopack: {
    resolveAlias: {
      "@prisma/client/runtime/library": "@prisma/client/runtime/client",
      "@prisma/client/runtime/library.js": "@prisma/client/runtime/client.js",
    },
  },
};

export default nextConfig;
