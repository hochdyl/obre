import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const GITHUB_PAGES_REPOSITORY = "obre";
const OUT_DIR = join(import.meta.dirname, "out/_next/static/chunks");

const fixPaths = async () => {
  const files = await readdir(OUT_DIR);
  const cssFiles = files.filter((f) => f.endsWith(".css"));

  for (const file of cssFiles) {
    const filePath = join(OUT_DIR, file);
    let content = await readFile(filePath, "utf-8");

    content = content
      .replace(
        /url\(\s*(['"]?)(\/textures\/)/g,
        `url($1/${GITHUB_PAGES_REPOSITORY}/textures/`
      )
      .replace(
        /url\(\s*(['"]?)(\/illustrations\/)/g,
        `url($1/${GITHUB_PAGES_REPOSITORY}/illustrations/`
      );

    await writeFile(filePath, content);
  }

  console.log(`Fixed asset paths in ${cssFiles.length} CSS file(s)`);
};

try {
  await fixPaths();
} catch (error) {
  console.error("Failed to fix CSS asset paths for GitHub Pages:", error);
  process.exitCode = 1;
}
