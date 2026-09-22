import * as React from "react";
import { createPortal } from "react-dom";
import {
  DndContext, DragOverlay, PointerSensor, KeyboardSensor, useSensor, useSensors,
  closestCorners, type DragEndEvent, type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext, verticalListSortingStrategy, sortableKeyboardCoordinates, useSortable, arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDroppable } from "@dnd-kit/core";
import { cn } from "../../utils/cn";

export interface KanbanColumnData<T> {
  id: string;
  title: string;
  items: T[];
}

export interface KanbanProps<T> {
  columns: KanbanColumnData<T>[];
  onColumnsChange: (columns: KanbanColumnData<T>[]) => void;
  getItemId: (item: T) => string;
  renderItem: (item: T) => React.ReactNode;
  renderColumnHeader?: (column: KanbanColumnData<T>) => React.ReactNode;
  className?: string;
}

function findColumn<T>(columns: KanbanColumnData<T>[], itemId: string, getItemId: (item: T) => string) {
  return columns.find((col) => col.items.some((item) => getItemId(item) === itemId));
}

/**
 * Kanban — a drag-and-drop board (task boards, pipelines, workflows),
 * built on `@dnd-kit` for the drag mechanics — including real keyboard
 * support (Tab to a card, Space to pick it up, arrow keys to move it,
 * Space to drop) via dnd-kit's KeyboardSensor, which plain HTML5 drag
 * events don't provide at all. The board's data — columns and their
 * items — is fully controlled: Kanban never owns the data itself, it
 * only reports the reordered/moved result via `onColumnsChange`.
 */
export function Kanban<T>({ columns, onColumnsChange, getItemId, renderItem, renderColumnHeader, className }: KanbanProps<T>) {
  const [activeItem, setActiveItem] = React.useState<T | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function onDragStart(event: DragStartEvent) {
    const col = findColumn(columns, String(event.active.id), getItemId);
    const item = col?.items.find((i) => getItemId(i) === String(event.active.id));
    setActiveItem(item ?? null);
  }

  function onDragOver(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    const activeId = String(active.id);
    const overId = String(over.id);
    if (activeId === overId) return;

    const fromColumn = findColumn(columns, activeId, getItemId);
    const overIsColumn = columns.some((c) => c.id === overId);
    const toColumn = overIsColumn ? columns.find((c) => c.id === overId) : findColumn(columns, overId, getItemId);
    if (!fromColumn || !toColumn || fromColumn.id === toColumn.id) return;

    const activeIndex = fromColumn.items.findIndex((i) => getItemId(i) === activeId);
    const moved = fromColumn.items[activeIndex];
    if (!moved) return;
    fromColumn.items.splice(activeIndex, 1);
    const overIndex = overIsColumn ? toColumn.items.length : toColumn.items.findIndex((i) => getItemId(i) === overId);
    toColumn.items.splice(overIndex === -1 ? toColumn.items.length : overIndex, 0, moved);

    onColumnsChange(
      columns.map((c) => (c.id === fromColumn.id ? fromColumn : c.id === toColumn.id ? toColumn : c))
    );
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveItem(null);
    const { active, over } = event;
    if (!over) return;
    const activeId = String(active.id);
    const overId = String(over.id);
    const column = findColumn(columns, activeId, getItemId);
    if (!column) return;
    const overIsColumn = columns.some((c) => c.id === overId);
    if (overIsColumn) return;
    const activeIndex = column.items.findIndex((i) => getItemId(i) === activeId);
    const overIndex = column.items.findIndex((i) => getItemId(i) === overId);
    if (activeIndex === -1 || overIndex === -1 || activeIndex === overIndex) return;
    const reordered = arrayMove(column.items, activeIndex, overIndex);
    onColumnsChange(columns.map((c) => (c.id === column.id ? { ...c, items: reordered } : c)));
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={onDragStart} onDragOver={onDragOver} onDragEnd={onDragEnd}>
      <div className={cn("ui-flex ui-gap-4 ui-overflow-x-auto ui-pb-2", className)}>
        {columns.map((column) => (
          <KanbanColumn key={column.id} column={column} getItemId={getItemId} renderItem={renderItem} renderColumnHeader={renderColumnHeader} />
        ))}
      </div>
      {typeof document !== "undefined" &&
        createPortal(
          <DragOverlay>{activeItem ? <div className="ui-rotate-2 ui-opacity-90">{renderItem(activeItem)}</div> : null}</DragOverlay>,
          document.body
        )}
    </DndContext>
  );
}

function KanbanColumn<T>({
  column, getItemId, renderItem, renderColumnHeader,
}: {
  column: KanbanColumnData<T>;
  getItemId: (item: T) => string;
  renderItem: (item: T) => React.ReactNode;
  renderColumnHeader?: (column: KanbanColumnData<T>) => React.ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });
  const itemIds = column.items.map(getItemId);

  return (
    <div className="ui-flex ui-w-72 ui-shrink-0 ui-flex-col ui-rounded-[var(--ui-radius-lg)] ui-border ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg-subtle)]">
      <div className="ui-flex ui-items-center ui-justify-between ui-border-b ui-border-[var(--ui-border)] ui-px-3 ui-py-2.5">
        {renderColumnHeader ? (
          renderColumnHeader(column)
        ) : (
          <>
            <span className="ui-text-[var(--ui-text-sm)] ui-font-medium ui-text-[var(--ui-fg)]">{column.title}</span>
            <span className="ui-rounded-[var(--ui-radius-full)] ui-bg-[var(--ui-bg-muted)] ui-px-2 ui-py-0.5 ui-text-[var(--ui-text-xs)] ui-text-[var(--ui-fg-muted)]">
              {column.items.length}
            </span>
          </>
        )}
      </div>
      <div
        ref={setNodeRef}
        className={cn("ui-flex ui-min-h-[4rem] ui-flex-1 ui-flex-col ui-gap-2 ui-p-2 ui-transition-colors", isOver && "ui-bg-[color-mix(in_srgb,var(--ui-primary)_6%,transparent)]")}
      >
        <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
          {column.items.map((item) => (
            <KanbanCard key={getItemId(item)} id={getItemId(item)}>
              {renderItem(item)}
            </KanbanCard>
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

function KanbanCard({ id, children }: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
      className={cn(
        "ui-cursor-grab ui-touch-none ui-rounded-[var(--ui-radius-md)] ui-border ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg)] ui-p-3 ui-shadow-[var(--ui-shadow-sm)] active:ui-cursor-grabbing",
        "focus-visible:ui-outline-none focus-visible:ui-shadow-[var(--ui-focus-ring)]",
        isDragging && "ui-opacity-40"
      )}
    >
      {children}
    </div>
  );
}
