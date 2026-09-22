import * as React from "react";
import { cn } from "../../utils/cn";
import { useUiContent } from "../../content";
import { Button } from "../button";

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  /** Number of sibling pages shown on each side of the current page. */
  siblingCount?: number;
}

function getRange(page: number, total: number, siblingCount: number): (number | "ellipsis")[] {
  const totalVisible = siblingCount * 2 + 5;
  if (total <= totalVisible) return Array.from({ length: total }, (_, i) => i + 1);

  const left = Math.max(page - siblingCount, 2);
  const right = Math.min(page + siblingCount, total - 1);
  const range: (number | "ellipsis")[] = [1];
  if (left > 2) range.push("ellipsis");
  for (let i = left; i <= right; i++) range.push(i);
  if (right < total - 1) range.push("ellipsis");
  range.push(total);
  return range;
}

/** Page navigation with a nav landmark and aria-current on the active page. */
export function Pagination({ page, totalPages, onPageChange, className, siblingCount = 1 }: PaginationProps) {
  const content = useUiContent();
  const items = getRange(page, totalPages, siblingCount);

  return (
    <nav aria-label="Pagination" className={cn("ui-flex ui-items-center ui-gap-1", className)}>
      <Button variant="ghost" size="sm" disabled={page <= 1} onClick={() => onPageChange(page - 1)} aria-label={content.pagination.previous}>
        ‹
      </Button>
      {items.map((item, i) =>
        item === "ellipsis" ? (
          <span key={`e-${i}`} className="ui-px-2 ui-text-[var(--ui-fg-muted)]" aria-hidden="true">…</span>
        ) : (
          <Button
            key={item}
            variant={item === page ? "primary" : "ghost"}
            size="sm"
            aria-current={item === page ? "page" : undefined}
            aria-label={content.pagination.pageLabel(item, totalPages)}
            onClick={() => onPageChange(item)}
          >
            {item}
          </Button>
        )
      )}
      <Button variant="ghost" size="sm" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)} aria-label={content.pagination.next}>
        ›
      </Button>
    </nav>
  );
}
