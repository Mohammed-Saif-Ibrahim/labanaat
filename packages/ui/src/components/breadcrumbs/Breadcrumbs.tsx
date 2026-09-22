import * as React from "react";
import { cn } from "../../utils/cn";

export interface BreadcrumbItem {
  label: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
}

/** Breadcrumb trail with a nav landmark, aria-current on the final (current-page) item, and a composable separator slot. */
export const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ className, items, separator = "/", ...props }, ref) => (
    <nav ref={ref} aria-label="Breadcrumb" className={cn("ui-flex", className)} {...props}>
      <ol className="ui-flex ui-flex-wrap ui-items-center ui-gap-2 ui-text-[var(--ui-text-sm)]">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="ui-flex ui-items-center ui-gap-2">
              {isLast ? (
                <span aria-current="page" className="ui-font-medium ui-text-[var(--ui-fg)]">
                  {item.label}
                </span>
              ) : item.href ? (
                <a href={item.href} onClick={item.onClick} className="ui-text-[var(--ui-fg-muted)] hover:ui-text-[var(--ui-fg)] hover:ui-underline">
                  {item.label}
                </a>
              ) : (
                <button type="button" onClick={item.onClick} className="ui-text-[var(--ui-fg-muted)] hover:ui-text-[var(--ui-fg)] hover:ui-underline">
                  {item.label}
                </button>
              )}
              {!isLast && <span aria-hidden="true" className="ui-text-[var(--ui-fg-muted)]">{separator}</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  )
);
Breadcrumbs.displayName = "Breadcrumbs";
