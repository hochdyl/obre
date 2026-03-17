import { rmSync, mkdirSync, readdirSync, renameSync } from "node:fs";
import { join } from "node:path";
import { spawn } from "node:child_process";
import { GITHUB_PAGES_REPOSITORY } from "./github-pages.config.js";

const OUT_DIR = join(import.meta.dirname, "out");
const NESTED_DIR = join(OUT_DIR, GITHUB_PAGES_REPOSITORY);

// Clean up any leftover from a previous crashed run
rmSync(NESTED_DIR, { recursive: true, force: true });

// Get all files/folders in out/
const entries = readdirSync(OUT_DIR);

// Create the nested repository directory in out/ and move everything into it
mkdirSync(NESTED_DIR, { recursive: true });
for (const entry of entries) {
  renameSync(join(OUT_DIR, entry), join(NESTED_DIR, entry));
}

console.log(`Serving at http://localhost:3000/${GITHUB_PAGES_REPOSITORY}`);

// Start serve
const serve = spawn("npx", ["serve", OUT_DIR, "-l", "3000"], {
  stdio: "inherit",
  shell: true,
});

// Restore original structure on exit
const restore = () => {
  if (restore.called) return;
  restore.called = true;

  try {
    const nestedEntries = readdirSync(NESTED_DIR);
    for (const entry of nestedEntries) {
      renameSync(join(NESTED_DIR, entry), join(OUT_DIR, entry));
    }
  } catch {
    // If NESTED_DIR does not exist or is already empty, ignore
  }

  try {
    rmSync(NESTED_DIR, { recursive: true, force: true });
  } catch {
    // Best-effort cleanup
  }
};
restore.called = false;

const gracefulExit = (code = 0) => {
  restore();
  process.exit(code);
};

serve.on("close", restore);
process.on("SIGINT", () => gracefulExit(0));
process.on("SIGTERM", () => gracefulExit(0));
process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
  gracefulExit(1);
});
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled rejection:", reason);
  gracefulExit(1);
});
