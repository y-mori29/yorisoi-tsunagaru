import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Workspace root を明示（上位ディレクトリの package-lock.json 検出による警告を抑制）
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
