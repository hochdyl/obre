const GITHUB_PAGES_REPOSITORY = "obre";
const isProduction = process.env.NODE_ENV === "production";

export const basePath = isProduction ? `/${GITHUB_PAGES_REPOSITORY}` : "";

export const asset = (path: string) => `${basePath}${path}`;
