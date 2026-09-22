"use client";

import { useThemeContext, ACCENTS } from "./theme-provider";

// Known neutral hex values from the design tokens, used directly here
// rather than through CSS custom property cascade — this section renders
// both themes literally and simultaneously regardless of the page's
// current ambient theme, so it can't be subject to cascade/inheritance
// edge cases the way a nested `data-theme` scope can.
const NEUTRALS = {
  light: { bg: "#ffffff", surface: "#f8fafc", border: "#e2e8f0", fg: "#0f172a", fgMuted: "#64748b" },
  dark: { bg: "#020617", surface: "#0f172a", border: "#1e293b", fg: "#f8fafc", fgMuted: "#94a3b8" },
};

function ThemePreview({ mode }: { mode: "light" | "dark" }) {
  const { accent } = useThemeContext();
  const n = NEUTRALS[mode];
  const primary = ACCENTS[accent][mode][0];

  return (
    <div
      className="ui-rounded-[var(--ui-radius-lg)] ui-border ui-p-6"
      style={{ backgroundColor: n.bg, borderColor: n.border }}
    >
      <span
        className="ui-mb-4 ui-block ui-text-[11px] ui-font-medium ui-uppercase ui-tracking-wide"
        style={{ color: n.fgMuted }}
      >
        {mode === "light" ? "Light theme" : "Dark theme"}
      </span>

      <div className="ui-flex ui-items-center ui-gap-3">
        <span
          className="ui-flex ui-h-9 ui-w-9 ui-shrink-0 ui-items-center ui-justify-center ui-rounded-full ui-text-[13px] ui-font-medium"
          style={{ backgroundColor: n.surface, color: n.fgMuted }}
        >
          GH
        </span>
        <div className="ui-flex-1">
          <div className="ui-text-[var(--ui-text-sm)] ui-font-medium" style={{ color: n.fg }}>
            Grace Hopper
          </div>
          <div className="ui-text-[var(--ui-text-xs)]" style={{ color: n.fgMuted }}>
            Deploy completed
          </div>
        </div>
        <span
          className="ui-rounded-full ui-px-2.5 ui-py-0.5 ui-text-[11px] ui-font-medium"
          style={{ backgroundColor: `color-mix(in srgb, ${primary} 15%, transparent)`, color: primary }}
        >
          Live
        </span>
      </div>

      <button
        className="ui-mt-4 ui-w-full ui-rounded-[var(--ui-radius-md)] ui-border ui-py-2 ui-text-[var(--ui-text-sm)] ui-font-medium"
        style={{ borderColor: n.border, color: n.fg }}
      >
        View details
      </button>

      <div className="ui-mt-4 ui-flex ui-flex-wrap ui-gap-2">
        {(["bg", "surface", "border", "fg"] as const).map((key) => (
          <div key={key} className="ui-flex ui-items-center ui-gap-1.5 ui-text-[11px]" style={{ color: n.fgMuted }}>
            <span
              className="ui-h-3 ui-w-3 ui-rounded-full ui-border"
              style={{ backgroundColor: n[key], borderColor: n.border }}
            />
            {n[key]}
          </div>
        ))}
        <div className="ui-flex ui-items-center ui-gap-1.5 ui-text-[11px]" style={{ color: n.fgMuted }}>
          <span className="ui-h-3 ui-w-3 ui-rounded-full" style={{ backgroundColor: primary }} />
          {primary}
        </div>
      </div>
    </div>
  );
}

/**
 * Replaces the earlier nested-`data-theme` demo, which proved unreliable
 * across browsers — this renders both themes with literal color values
 * pulled directly from the same accent data the color picker uses, so
 * there's no cascade/inheritance mechanism that can silently fail.
 */
export function ThemeCompare() {
  return (
    <div className="ui-grid ui-grid-cols-1 ui-gap-4 sm:ui-grid-cols-2">
      <ThemePreview mode="light" />
      <ThemePreview mode="dark" />
    </div>
  );
}
