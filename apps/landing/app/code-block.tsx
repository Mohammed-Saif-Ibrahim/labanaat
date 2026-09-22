import type { ReactNode } from "react";

export function CodeBlock({ children }: { children: ReactNode }) {
  return (
    <pre className="ui-overflow-x-auto ui-whitespace-pre-wrap ui-break-words ui-rounded-[var(--ui-radius-lg)] ui-border ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg-subtle)] ui-p-4 ui-font-mono ui-text-[12px] ui-leading-relaxed ui-text-[var(--ui-fg)]">
      <code>{children}</code>
    </pre>
  );
}

export function K({ children }: { children: ReactNode }) {
  return <span className="ui-text-[var(--ui-primary)]">{children}</span>;
}
export function S({ children }: { children: ReactNode }) {
  return <span className="ui-text-[var(--ui-success)]">{children}</span>;
}
export function C({ children }: { children: ReactNode }) {
  return <span className="ui-text-[var(--ui-fg-muted)]">{children}</span>;
}
