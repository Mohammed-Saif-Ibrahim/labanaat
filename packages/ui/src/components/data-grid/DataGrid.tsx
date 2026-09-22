import * as React from "react";
import {
  useReactTable, getCoreRowModel, getSortedRowModel, type ColumnDef, type SortingState,
} from "@tanstack/react-table";
import { cn } from "../../utils/cn";
import { TableHeader, TableBody, TableRow, TableHead, TableCell } from "../table/Table";
import { Skeleton } from "../skeleton/Skeleton";
import { EmptyState } from "../empty-state/EmptyState";

export type DataGridColumn<TData> = ColumnDef<TData, unknown>;

export interface DataGridProps<TData> {
  columns: DataGridColumn<TData>[];
  data: TData[];
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  sorting?: SortingState;
  onSortingChange?: (sorting: SortingState) => void;
  /** Drag column edges to resize — a spreadsheet-like feature DataTable deliberately doesn't have. */
  enableColumnResizing?: boolean;
  className?: string;
}

/**
 * DataGrid — a spreadsheet-like grid for dense, editable data, distinct
 * from `DataTable`: adds column resizing and inline cell editing (via
 * `DataGridEditableCell`, used inside a column's `cell` renderer) on top
 * of the same TanStack Table foundation. Reach for `DataTable` for
 * display/sort/paginate; reach for `DataGrid` when users need to resize
 * columns or edit values directly in the grid.
 */
export function DataGrid<TData>({
  columns, data, isLoading, emptyTitle, emptyDescription, sorting, onSortingChange, enableColumnResizing = true, className,
}: DataGridProps<TData>) {
  const [internalSorting, setInternalSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting: sorting ?? internalSorting },
    onSortingChange: (updater) => {
      const next = typeof updater === "function" ? updater(sorting ?? internalSorting) : updater;
      setInternalSorting(next);
      onSortingChange?.(next);
    },
    columnResizeMode: "onChange",
    enableColumnResizing,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const rows = table.getRowModel().rows;

  return (
    <div className={cn("ui-w-fit ui-max-w-full ui-overflow-x-auto ui-rounded-[var(--ui-radius-lg)] ui-border ui-border-[var(--ui-border)]", className)}>
      <table style={{ width: table.getTotalSize() }} className="ui-caption-bottom ui-text-[var(--ui-text-sm)]">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  style={{ width: header.getSize(), position: "relative" }}
                  className="ui-select-none"
                  aria-label={typeof header.column.columnDef.header === "string" ? header.column.columnDef.header : undefined}
                >
                  {header.isPlaceholder ? null : (typeof header.column.columnDef.header === "function"
                    ? header.column.columnDef.header(header.getContext())
                    : header.column.columnDef.header)}
                  {enableColumnResizing && header.column.getCanResize() && (
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- a focusable separator used as a resize handle is an explicitly documented WAI-ARIA pattern (distinct from a purely decorative, non-focusable separator); the linter's default role list doesn't special-case this.
                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      role="separator"
                      aria-orientation="vertical"
                      aria-label={`Resize ${String(header.column.columnDef.header)} column`}
                      tabIndex={0} // eslint-disable-line jsx-a11y/no-noninteractive-tabindex -- see justification above.
                      onKeyDown={(e) => {
                        if (e.key === "ArrowLeft") {
                          table.setColumnSizing((old) => ({ ...old, [header.column.id]: Math.max(40, header.getSize() - 10) }));
                        }
                        if (e.key === "ArrowRight") {
                          table.setColumnSizing((old) => ({ ...old, [header.column.id]: header.getSize() + 10 }));
                        }
                      }}
                      className={cn(
                        "ui-absolute ui-right-0 ui-top-0 ui-h-full ui-w-1 ui-cursor-col-resize ui-touch-none ui-select-none hover:ui-bg-[var(--ui-primary)]",
                        header.column.getIsResizing() && "ui-bg-[var(--ui-primary)]"
                      )}
                    />
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                {columns.map((_, j) => (
                  <TableCell key={j}>
                    <Skeleton className="ui-h-4 ui-w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length}>
                <EmptyState title={emptyTitle ?? "No results"} description={emptyDescription} />
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
                    {typeof cell.column.columnDef.cell === "function" ? cell.column.columnDef.cell(cell.getContext()) : String(cell.getValue() ?? "")}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </table>
    </div>
  );
}

export interface DataGridEditableCellProps {
  value: string;
  onCommit: (value: string) => void;
}

/**
 * Click-to-edit cell — use inside a column's `cell` renderer for inline
 * editing. Renders as static text until clicked, becomes a plain input,
 * commits on blur or Enter, discards on Escape.
 */
export function DataGridEditableCell({ value, onCommit }: DataGridEditableCellProps) {
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState(value);

  React.useEffect(() => setDraft(value), [value]);

  if (!editing) {
    return (
      <button
        type="button"
        onClick={() => setEditing(true)}
        className="ui-w-full ui-rounded-[var(--ui-radius-sm)] ui-px-1 ui-py-0.5 ui-text-left hover:ui-bg-[var(--ui-bg-subtle)] focus-visible:ui-outline-none focus-visible:ui-shadow-[var(--ui-focus-ring)]"
      >
        {value || <span className="ui-text-[var(--ui-fg-muted)]">—</span>}
      </button>
    );
  }

  function commit() {
    setEditing(false);
    if (draft !== value) onCommit(draft);
  }

  return (
    <input
      // eslint-disable-next-line jsx-a11y/no-autofocus -- fires only when the user explicitly clicks to enter edit mode (never on page load), matching standard spreadsheet-editor UX (Excel, Google Sheets); not the "unsolicited focus theft on mount" pattern this rule guards against.
      autoFocus
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === "Enter") commit();
        if (e.key === "Escape") { setDraft(value); setEditing(false); }
      }}
      className="ui-w-full ui-rounded-[var(--ui-radius-sm)] ui-border ui-border-[var(--ui-primary)] ui-bg-[var(--ui-bg)] ui-px-1 ui-py-0.5 ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg)] ui-outline-none"
    />
  );
}
