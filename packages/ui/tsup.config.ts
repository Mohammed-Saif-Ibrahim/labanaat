import { defineConfig } from "tsup";
import { readdirSync } from "node:fs";

// Every component gets its own entry point for optimal tree-shaking,
// e.g. `import { Button } from "@labanaat/ui/button"`.
const componentEntries = Object.fromEntries(
  readdirSync("./src/components", { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => [`components/${d.name}/index`, `./src/components/${d.name}/index.ts`])
);

export default defineConfig({
  entry: {
    index: "./src/index.ts",
    "tokens/index": "./src/tokens/index.ts",
    ...componentEntries,
  },
  format: ["esm", "cjs"],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ["react", "react-dom"],
  // Runs after EVERY successful build, including each rebuild triggered by
  // `tsup --watch` (used by `pnpm dev`) — not just the one-shot `pnpm build`.
  // This is required, not optional: `clean: true` wipes `dist/` at the start
  // of every build, so without this hook `dist/styles.css` and the
  // "use client" banners only ever exist right after a manual `pnpm build`
  // and silently disappear again the moment `tsup --watch` rebuilds anything.
  onSuccess: "node ./scripts/copy-css.mjs",
});
