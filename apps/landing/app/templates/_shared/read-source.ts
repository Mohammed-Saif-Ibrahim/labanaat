import fs from "node:fs";
import path from "node:path";
import type { SourceFile } from "./source-viewer";

/**
 * Reads a template's actual source files at build time (Server Component
 * / Node context only) — never reconstructed or hand-copied, so what's
 * shown in the source viewer is guaranteed to match what's actually
 * running, the same guarantee the component docs' live demos make.
 */
export function readTemplateSource(templateDir: string, relativePaths: string[]): SourceFile[] {
  const base = path.join(process.cwd(), "app", "templates", templateDir);
  return relativePaths.map((relativePath) => ({
    name: relativePath,
    content: fs.readFileSync(path.join(base, relativePath), "utf-8"),
  }));
}
