import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

if (!existsSync("./dist")) mkdirSync("./dist");
copyFileSync("./src/styles/index.css", "./dist/styles.css");

// tsup's `banner` option is unreliable across multi-entry + code-split
// esbuild builds, so "use client" is prepended directly here instead.
// The whole library is interactive (hooks, event handlers), so every
// emitted JS chunk is marked as a React Server Components client boundary.
function addUseClientBanner(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      addUseClientBanner(path);
      continue;
    }
    if (!/\.(js|cjs)$/.test(entry)) continue;
    const content = readFileSync(path, "utf8");
    if (content.startsWith('"use client"')) continue;
    writeFileSync(path, `"use client";\n${content}`);
  }
}
addUseClientBanner("./dist");
