"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { componentOrder } from "./component-order";

/**
 * Wraps every page under /docs/components, including the index. Looks the
 * current path up in the single ordered list (component-order.ts) and, on
 * an actual component page, renders compact Previous/Next links — just an
 * arrow and the component's name, no "Previous"/"Next" label — so someone
 * can read through the whole library sequentially. On the index page
 * itself (no match) it renders nothing extra.
 */
export default function ComponentDocLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const index = componentOrder.findIndex((c) => `/docs/components/${c.slug}` === pathname);

  if (index === -1) {
    return <>{children}</>;
  }

  const prev = index > 0 ? componentOrder[index - 1] : null;
  const next = index < componentOrder.length - 1 ? componentOrder[index + 1] : null;

  return (
    <>
      {children}
      <nav
        aria-label="Component pages"
        className="ui-mt-10 ui-flex ui-items-center ui-justify-between ui-gap-2 ui-border-t ui-border-[var(--ui-border)] ui-pt-4"
      >
        {prev ? (
          <Link
            href={`/docs/components/${prev.slug}`}
            className="ui-group ui-inline-flex ui-min-w-0 ui-items-center ui-gap-1 ui-rounded-[var(--ui-radius-sm)] ui-px-2 ui-py-1.5 ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg-muted)] ui-transition-colors hover:ui-bg-[var(--ui-bg-subtle)] hover:ui-text-[var(--ui-fg)]"
          >
            <ArrowLeft
              size={14}
              className="ui-shrink-0 ui-transition-transform group-hover:ui--translate-x-0.5"
            />
            <span className="ui-truncate ui-font-medium">{prev.label}</span>
          </Link>
        ) : (
          <span aria-hidden="true" />
        )}

        {next ? (
          <Link
            href={`/docs/components/${next.slug}`}
            className="ui-group ui-inline-flex ui-min-w-0 ui-items-center ui-gap-1 ui-rounded-[var(--ui-radius-sm)] ui-px-2 ui-py-1.5 ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg-muted)] ui-transition-colors hover:ui-bg-[var(--ui-bg-subtle)] hover:ui-text-[var(--ui-fg)]"
          >
            <span className="ui-truncate ui-font-medium">{next.label}</span>
            <ArrowRight
              size={14}
              className="ui-shrink-0 ui-transition-transform group-hover:ui-translate-x-0.5"
            />
          </Link>
        ) : (
          <span aria-hidden="true" />
        )}
      </nav>
    </>
  );
}
