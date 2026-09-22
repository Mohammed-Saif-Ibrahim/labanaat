"use client";

import * as React from "react";
import { CopyButton } from "../copy-button";

/**
 * Wraps every fenced code block (installation snippets, etc.) with a
 * copy button. Reads the raw text via ref.textContent at click time
 * rather than trying to separately track the source string — this
 * naturally strips Shiki's syntax-highlighting <span> wrappers and
 * always matches exactly what's visible, with zero risk of drifting
 * out of sync with the rendered markup.
 */
export function MdxPre(props: React.HTMLAttributes<HTMLPreElement>) {
  const preRef = React.useRef<HTMLPreElement>(null);

  return (
    <div className="ui-group ui-relative">
      <pre
        ref={preRef}
        className="ui-mdx-pre ui-mb-7 ui-overflow-x-auto ui-whitespace-pre-wrap ui-break-words ui-rounded-[var(--ui-radius-lg)] ui-border ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg-subtle)] ui-p-5 ui-pr-12 ui-text-[13px] ui-leading-relaxed"
        {...props}
      />
      <CopyButton
        getText={() => preRef.current?.textContent ?? ""}
        className="ui-absolute ui-right-3 ui-top-3 ui-inline-flex ui-h-7 ui-w-7 ui-items-center ui-justify-center ui-rounded-[var(--ui-radius-sm)] ui-border ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg)] ui-text-[var(--ui-fg-muted)] ui-opacity-0 ui-transition-opacity hover:ui-text-[var(--ui-fg)] focus-visible:ui-opacity-100 focus-visible:ui-outline-none focus-visible:ui-shadow-[var(--ui-focus-ring)] group-hover:ui-opacity-100"
      />
    </div>
  );
}
