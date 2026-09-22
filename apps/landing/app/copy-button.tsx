"use client";

import * as React from "react";

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <rect x="5" y="5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.3" />
    <path d="M9 5V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h2" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Copies the string returned by `getText()` (read lazily on click, so it always reflects current — possibly edited — content). Shows a brief checkmark confirmation, matching the pattern from every major component-library site. */
export function CopyButton({ getText, className }: { getText: () => string; className?: string }) {
  const [copied, setCopied] = React.useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(getText());
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API can fail (permissions, insecure context) — fail silently
      // rather than throwing in the user's face over a copy button.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : "Copy code"}
      className={
        className ??
        "ui-inline-flex ui-h-7 ui-w-7 ui-items-center ui-justify-center ui-rounded-[var(--ui-radius-sm)] ui-text-[var(--ui-fg-muted)] ui-transition-colors hover:ui-bg-[var(--ui-bg-muted)] hover:ui-text-[var(--ui-fg)] focus-visible:ui-outline-none focus-visible:ui-shadow-[var(--ui-focus-ring)]"
      }
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </button>
  );
}
