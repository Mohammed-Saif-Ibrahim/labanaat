import * as React from "react";
import {
  useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel,
  flexRender, type ColumnDef, type SortingState, type RowSelectionState, type Table as TanStackTable,
} from "@tanstack/react-table";
import { cn } from "../../utils/cn";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../table/Table";
import { Skeleton } from "../skeleton/Skeleton";
import { EmptyState } from "../empty-state/EmptyState";
import { Checkbox } from "../checkbox/Checkbox";
import { Pagination } from "../pagination/Pagination";

/**
 * Re-exported under Labanaat's own name so consumers never need to import
 * from `@tanstack/react-table` directly for the common case — TanStack
 * stays an internal implementation detail, the same way Radix does
 * elsewhere in the library. The shape is TanStack's ColumnDef (there's no
 * value in reinventing column-definition syntax), but the import surface
 * is entirely `@labanaat/ui/data-table`.
 */
export type DataTableColumn<TData> = ColumnDef<TData, unknown>;
export type DataTableSortingState = SortingState;

export interface DataTableProps<TData> {
  columns: DataTableColumn<TData>[];
  data: TData[];
  isLoading?: boolean;
  /** Shown via EmptyState when `data` is empty and not loading. */
  emptyTitle?: string;
  emptyDescription?: string;
  /** Sorting: controlled if both provided, otherwise managed internally. */
  sorting?: DataTableSortingState;
  onSortingChange?: (sorting: DataTableSortingState) => void;
  /** Adds a leading checkbox column and enables row selection. */
  enableRowSelection?: boolean;
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: (selection: RowSelectionState) => void;
  /** Client-side pagination page size. Omit to disable built-in pagination (e.g. for server-paginated data). */
  pageSize?: number;
  className?: string;
}

interface DataTableContextValue<TData> {
  table: TanStackTable<TData>;
}
// TanStack's own Table<TData> type isn't covariant-compatible with Table<unknown>
// (accessorFn's use of TData makes narrowing unsafe per TS's variance rules) — this
// is a real constraint of TanStack's generics, not something `unknown` can express
// cleanly here. The escape hatch is contained to this one internal context; the
// public useDataTableContext<TData>() below re-asserts the correct specific type
// at each call site, so callers never see this loosened type.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DataTableContext = React.createContext<DataTableContextValue<any> | null>(null);

function useDataTableContext<TData>() {
  const ctx = React.useContext(DataTableContext);
  if (!ctx) throw new Error("DataTablePagination must be used within <DataTable>");
  return ctx as DataTableContextValue<TData>;
}

/**
 * DataTable — a serious data-grid built on TanStack Table's headless
 * logic (sorting, pagination, row selection), rendered entirely through
 * the library's own Table primitives so it looks and themes exactly like
 * every other component, not like an embedded third-party widget.
 */
export function DataTable<TData>({
  columns,
  data,
  isLoading,
  emptyTitle,
  emptyDescription,
  sorting,
  onSortingChange,
  enableRowSelection,
  rowSelection,
  onRowSelectionChange,
  pageSize,
  className,
}: DataTableProps<TData>) {
  const [internalSorting, setInternalSorting] = React.useState<SortingState>([]);
  const [internalSelection, setInternalSelection] = React.useState<RowSelectionState>({});

  const effectiveColumns = React.useMemo<DataTableColumn<TData>[]>(() => {
    if (!enableRowSelection) return columns;
    const selectColumn: DataTableColumn<TData> = {
      id: "__select",
      size: 40,
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
          aria-label="Select all rows"
        />
      ),
      cell: ({ row }) => (
        <Checkbox checked={row.getIsSelected()} onCheckedChange={(v) => row.toggleSelected(!!v)} aria-label="Select row" />
      ),
    };
    return [selectColumn, ...columns];
  }, [columns, enableRowSelection]);

  const table = useReactTable({
    data,
    columns: effectiveColumns,
    state: {
      sorting: sorting ?? internalSorting,
      rowSelection: rowSelection ?? internalSelection,
    },
    onSortingChange: (updater) => {
      const next = typeof updater === "function" ? updater(sorting ?? internalSorting) : updater;
      setInternalSorting(next);
      onSortingChange?.(next);
    },
    onRowSelectionChange: (updater) => {
      const next = typeof updater === "function" ? updater(rowSelection ?? internalSelection) : updater;
      setInternalSelection(next);
      onRowSelectionChange?.(next);
    },
    enableRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    ...(pageSize
      ? { getPaginationRowModel: getPaginationRowModel(), initialState: { pagination: { pageSize } } }
      : {}),
  });

  const rows = table.getRowModel().rows;

  return (
    <DataTableContext.Provider value={{ table }}>
      <div className={cn("ui-flex ui-flex-col ui-gap-4", className)}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: pageSize ?? 5 }).map((_, i) => (
                <TableRow key={i}>
                  {effectiveColumns.map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="ui-h-4 ui-w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={effectiveColumns.length}>
                  <EmptyState title={emptyTitle ?? "No results"} description={emptyDescription} />
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() ? "selected" : undefined} className="data-[state=selected]:ui-bg-[color-mix(in_srgb,var(--ui-primary)_6%,transparent)]">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        {pageSize && !isLoading && rows.length > 0 && <DataTablePagination />}
      </div>
    </DataTableContext.Provider>
  );
}

/** Reads the current DataTable's pagination state via context — no prop plumbing needed. Rendered automatically by DataTable when `pageSize` is set, but can also be placed manually (e.g. in a custom footer layout). */
export function DataTablePagination<TData = unknown>() {
  const { table } = useDataTableContext<TData>();
  const pageCount = table.getPageCount();
  if (pageCount <= 1) return null;
  return (
    <div className="ui-flex ui-justify-center">
      <Pagination
        page={table.getState().pagination.pageIndex + 1}
        totalPages={pageCount}
        onPageChange={(p) => table.setPageIndex(p - 1)}
      />
    </div>
  );
}

/** Sortable column header button — pass as a column's `header` render function. */
export function DataTableColumnHeader({ title, column }: { title: string; column: { getIsSorted: () => false | "asc" | "desc"; toggleSorting: (desc?: boolean) => void } }) {
  const sorted = column.getIsSorted();
  return (
    <button
      type="button"
      onClick={() => column.toggleSorting(sorted === "asc")}
      className="ui-inline-flex ui-items-center ui-gap-1 ui-rounded-[var(--ui-radius-sm)] hover:ui-text-[var(--ui-fg)] focus-visible:ui-outline-none focus-visible:ui-shadow-[var(--ui-focus-ring)]"
    >
      {title}
      <span aria-hidden="true" className="ui-text-[var(--ui-text-xs)]">
        {sorted === "asc" ? "▲" : sorted === "desc" ? "▼" : "↕"}
      </span>
    </button>
  );
}
