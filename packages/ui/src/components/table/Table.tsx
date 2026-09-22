import * as React from "react";
import { cn } from "../../utils/cn";
import { useUiContent } from "../../content";

/**
 * Table — composable, semantic building blocks (a real <table>, not
 * div-soup) with a sortable-header helper built in. Compose exactly the
 * rows/columns you need; there is no monolithic `data`/`columns` prop.
 */
export const Table = React.forwardRef<HTMLTableElement, React.TableHTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="ui-w-full ui-overflow-auto">
      <table ref={ref} className={cn("ui-w-full ui-caption-bottom ui-text-[var(--ui-text-sm)]", className)} {...props} />
    </div>
  )
);
Table.displayName = "Table";

export const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn("[&_tr]:ui-border-b [&_tr]:ui-border-[var(--ui-border)]", className)} {...props} />
  )
);
TableHeader.displayName = "TableHeader";

export const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <tbody ref={ref} className={cn("[&_tr:last-child]:ui-border-0", className)} {...props} />
);
TableBody.displayName = "TableBody";

export const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr ref={ref} className={cn("ui-border-b ui-border-[var(--ui-border)] ui-transition-colors hover:ui-bg-[var(--ui-bg-subtle)]", className)} {...props} />
  )
);
TableRow.displayName = "TableRow";

export const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th ref={ref} className={cn("ui-h-10 ui-px-3 ui-text-left ui-align-middle ui-font-medium ui-text-[var(--ui-fg-muted)]", className)} {...props} />
  )
);
TableHead.displayName = "TableHead";

export const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => <td ref={ref} className={cn("ui-p-3 ui-align-middle", className)} {...props} />
);
TableCell.displayName = "TableCell";

export type SortDirection = "asc" | "desc" | null;

export interface SortableTableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  direction: SortDirection;
  onSortChange: (next: SortDirection) => void;
}

/** TableHead variant with a clickable, keyboard-accessible sort toggle and aria-sort wired up. */
export const SortableTableHead = React.forwardRef<HTMLTableCellElement, SortableTableHeadProps>(
  ({ className, children, direction, onSortChange, ...props }, ref) => {
    const content = useUiContent();
    const next: SortDirection = direction === "asc" ? "desc" : direction === "desc" ? null : "asc";
    return (
      <th
        ref={ref}
        scope="col"
        aria-sort={direction === "asc" ? "ascending" : direction === "desc" ? "descending" : "none"}
        className={cn("ui-h-10 ui-px-3 ui-text-left ui-align-middle ui-font-medium ui-text-[var(--ui-fg-muted)]", className)}
        {...props}
      >
        <button
          type="button"
          onClick={() => onSortChange(next)}
          className="ui-inline-flex ui-items-center ui-gap-1 ui-rounded-[var(--ui-radius-sm)] hover:ui-text-[var(--ui-fg)] focus-visible:ui-outline-none focus-visible:ui-shadow-[var(--ui-focus-ring)]"
        >
          {children}
          <span aria-hidden="true" className="ui-text-[var(--ui-text-xs)]">
            {direction === "asc" ? content.table.sortAscending : direction === "desc" ? content.table.sortDescending : "↕"}
          </span>
        </button>
      </th>
    );
  }
);
SortableTableHead.displayName = "SortableTableHead";
