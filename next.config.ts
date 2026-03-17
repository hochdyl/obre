import type { NextConfig } from "next";
import { GITHUB_PAGES_REPOSITORY } from "./github-pages.config.js";

const isProduction = process.env.NODE_ENV === "production";
const basePath = isProduction ? `/${GITHUB_PAGES_REPOSITORY}` : "";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export",
  basePath,
  assetPrefix: isProduction ? `/${GITHUB_PAGES_REPOSITORY}/` : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
