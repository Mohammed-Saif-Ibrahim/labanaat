import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn()", () => {
  it("resolves conflicting prefixed display utilities (regression: tailwind-merge needs the custom 'ui-' prefix configured explicitly, or it silently keeps both classes instead of the later one winning)", () => {
    expect(cn("ui-hidden", "ui-flex")).toBe("ui-flex");
  });

  it("resolves conflicting prefixed position utilities", () => {
    expect(cn("ui-fixed ui-inset-y-0", "ui-absolute")).toBe("ui-inset-y-0 ui-absolute");
  });

  it("resolves conflicting prefixed arbitrary-value background colors", () => {
    expect(cn("ui-bg-[var(--ui-bg-muted)]", "ui-bg-[var(--ui-primary)]")).toBe("ui-bg-[var(--ui-primary)]");
  });

  it("keeps non-conflicting classes from both sources", () => {
    expect(cn("ui-flex ui-gap-2", "ui-text-sm")).toBe("ui-flex ui-gap-2 ui-text-sm");
  });
});
