import * as React from "react";
import { cn } from "../../utils/cn";
import { useControllableState } from "../../hooks";
import { Breadcrumbs } from "../breadcrumbs/Breadcrumbs";
import { Button } from "../button/Button";
import { EmptyState } from "../empty-state/EmptyState";

export interface FileManagerItem {
  id: string;
  name: string;
  type: "file" | "folder";
  size?: number;
  modifiedAt?: Date;
}

export interface FileManagerProps {
  items: FileManagerItem[];
  /** Breadcrumb path segments, root first — e.g. ["Home", "Projects", "2026"]. */
  path: string[];
  onPathChange: (path: string[]) => void;
  /** Called when a folder is opened (double-click, or Enter while focused) — typically appends to `path`. */
  onOpen?: (item: FileManagerItem) => void;
  selected?: string[];
  defaultSelected?: string[];
  onSelectedChange?: (ids: string[]) => void;
  view?: "grid" | "list";
  defaultView?: "grid" | "list";
  onViewChange?: (view: "grid" | "list") => void;
  className?: string;
}

function formatBytes(bytes?: number) {
  if (bytes === undefined) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const FolderIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <path d="M3 8a2 2 0 0 1 2-2h5l2 2.5h11a2 2 0 0 1 2 2V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z" fill="var(--ui-color-primary-100)" stroke="var(--ui-primary)" strokeWidth="1.5" />
  </svg>
);
const FileIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <path d="M7 3h9l6 6v15a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" fill="var(--ui-bg-muted)" stroke="var(--ui-border-strong)" strokeWidth="1.5" />
    <path d="M16 3v6h6" stroke="var(--ui-border-strong)" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);
const GridIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true"><rect x="1" y="1" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.3" /><rect x="8.5" y="1" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.3" /><rect x="1" y="8.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.3" /><rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.3" /></svg>
);
const ListIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true"><path d="M2 3.5H13M2 7.5H13M2 11.5H13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
);

/**
 * FileManager — a file/folder browser (grid or list view), reusing the
 * library's own Breadcrumbs for the path trail. Fully controlled: the
 * data, path, selection, and view mode all live in the consumer's state,
 * the same pattern as DataTable — FileManager reports intent (open,
 * select, navigate) rather than owning any of it.
 */
export function FileManager({
  items, path, onPathChange, onOpen, selected, defaultSelected = [], onSelectedChange, view, defaultView = "grid", onViewChange, className,
}: FileManagerProps) {
  const [selectedIds, setSelectedIds] = useControllableState<string[]>({ value: selected, defaultValue: defaultSelected, onChange: onSelectedChange });
  const [currentView, setCurrentView] = useControllableState<"grid" | "list">({ value: view, defaultValue: defaultView, onChange: onViewChange });

  function openItem(item: FileManagerItem) {
    if (item.type === "folder") {
      onOpen?.(item);
      onPathChange([...path, item.name]);
    } else {
      onOpen?.(item);
    }
  }

  return (
    <div className={cn("ui-flex ui-flex-col ui-gap-4", className)}>
      <div className="ui-flex ui-items-center ui-justify-between ui-gap-4">
        <Breadcrumbs
          items={path.map((segment, i) => ({
            label: segment,
            onClick: i < path.length - 1 ? () => onPathChange(path.slice(0, i + 1)) : undefined,
          }))}
        />
        <div className="ui-flex ui-shrink-0 ui-gap-1 ui-rounded-[var(--ui-radius-md)] ui-border ui-border-[var(--ui-border)] ui-p-0.5">
          <Button
            type="button"
            size="icon"
            variant={currentView === "grid" ? "secondary" : "ghost"}
            aria-label="Grid view"
            aria-pressed={currentView === "grid"}
            onClick={() => setCurrentView("grid")}
          >
            <GridIcon />
          </Button>
          <Button
            type="button"
            size="icon"
            variant={currentView === "list" ? "secondary" : "ghost"}
            aria-label="List view"
            aria-pressed={currentView === "list"}
            onClick={() => setCurrentView("list")}
          >
            <ListIcon />
          </Button>
        </div>
      </div>

      {items.length === 0 ? (
        <EmptyState title="This folder is empty" />
      ) : currentView === "grid" ? (
        <div role="listbox" aria-label="Files and folders" className="ui-grid ui-grid-cols-2 ui-gap-2 sm:ui-grid-cols-3 md:ui-grid-cols-4">
          {items.map((item) => {
            const isSelected = selectedIds.includes(item.id);
            return (
              <div
                key={item.id}
                role="option"
                tabIndex={0}
                aria-selected={isSelected}
                onClick={() => setSelectedIds([item.id])}
                onDoubleClick={() => openItem(item)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") openItem(item);
                  if (e.key === " ") { e.preventDefault(); setSelectedIds([item.id]); }
                }}
                className={cn(
                  "ui-flex ui-cursor-pointer ui-flex-col ui-items-center ui-gap-1.5 ui-rounded-[var(--ui-radius-md)] ui-p-3 ui-text-center",
                  "focus-visible:ui-outline-none focus-visible:ui-shadow-[var(--ui-focus-ring)]",
                  isSelected ? "ui-bg-[color-mix(in_srgb,var(--ui-primary)_10%,transparent)]" : "hover:ui-bg-[var(--ui-bg-subtle)]"
                )}
              >
                {item.type === "folder" ? <FolderIcon /> : <FileIcon />}
                <span className="ui-w-full ui-truncate ui-text-[var(--ui-text-xs)] ui-text-[var(--ui-fg)]">{item.name}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <div role="listbox" aria-label="Files and folders" className="ui-flex ui-flex-col ui-overflow-hidden ui-rounded-[var(--ui-radius-lg)] ui-border ui-border-[var(--ui-border)]">
          {items.map((item) => {
            const isSelected = selectedIds.includes(item.id);
            return (
              <div
                key={item.id}
                role="option"
                tabIndex={0}
                aria-selected={isSelected}
                onClick={() => setSelectedIds([item.id])}
                onDoubleClick={() => openItem(item)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") openItem(item);
                  if (e.key === " ") { e.preventDefault(); setSelectedIds([item.id]); }
                }}
                className={cn(
                  "ui-flex ui-cursor-pointer ui-items-center ui-gap-3 ui-border-b ui-border-[var(--ui-border)] ui-px-3 ui-py-2 last:ui-border-b-0",
                  "focus-visible:ui-outline-none focus-visible:ui-shadow-[var(--ui-focus-ring)]",
                  isSelected ? "ui-bg-[color-mix(in_srgb,var(--ui-primary)_10%,transparent)]" : "hover:ui-bg-[var(--ui-bg-subtle)]"
                )}
              >
                <span className="ui-shrink-0">{item.type === "folder" ? <FolderIcon /> : <FileIcon />}</span>
                <span className="ui-flex-1 ui-truncate ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg)]">{item.name}</span>
                {item.size !== undefined && <span className="ui-shrink-0 ui-text-[var(--ui-text-xs)] ui-text-[var(--ui-fg-muted)]">{formatBytes(item.size)}</span>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
