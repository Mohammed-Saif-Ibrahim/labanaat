// vitest-axe@0.1.0's own type augmentation (extend-expect.d.ts) is never
// applied, because its matching runtime module is broken/empty and we
// intentionally never import it (see setup.ts) — this file reconstructs
// just the global declaration merge it was supposed to provide, so
// `expect(...).toHaveNoViolations()` type-checks correctly everywhere it's
// used, matching the matcher actually registered at runtime in setup.ts.
import type { AxeResults, Result } from "axe-core";

interface NoViolationsMatcherResult {
  message(): string;
  pass: boolean;
  actual: Result[];
}

interface AxeMatchers {
  toHaveNoViolations(): NoViolationsMatcherResult;
}

declare module "vitest" {
  interface Assertion<T = AxeResults> extends AxeMatchers {}
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}
