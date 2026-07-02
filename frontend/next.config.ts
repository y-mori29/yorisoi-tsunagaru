import type { NextConfig } from "next";
import path from "node:path";
import { config as loadEnv } from "dotenv";

if (process.env.NODE_ENV !== "production") {
  loadEnv({ path: path.resolve(process.cwd(), "../secure/.env") });
}

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;