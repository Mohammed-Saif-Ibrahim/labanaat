"use client";

import * as React from "react";
import { Kanban, type KanbanColumnData } from "@labanaat/ui/kanban";
import { FilterBuilder, type FilterCondition } from "@labanaat/ui/filter-builder";

interface Task {
  id: string;
  title: string;
}

const initialColumns: KanbanColumnData<Task>[] = [
  { id: "todo", title: "To do", items: [{ id: "1", title: "Design review" }, { id: "2", title: "Write tests" }] },
  { id: "done", title: "Done", items: [{ id: "3", title: "Set up repo" }] },
];

/** The homepage's Kanban board is genuinely draggable, not a static screenshot — same component, same interactivity as the docs page. */
export function KanbanShowcase() {
  const [columns, setColumns] = React.useState(initialColumns);
  return (
    <Kanban
      columns={columns}
      onColumnsChange={setColumns}
      getItemId={(item) => item.id}
      renderItem={(item) => <span className="ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg)]">{item.title}</span>}
    />
  );
}

const initialConditions: FilterCondition[] = [{ id: "1", field: "status", operator: "eq", value: "Active" }];

/** Genuinely add/remove/edit conditions here, not a mockup. */
export function FilterBuilderShowcase() {
  const [logic, setLogic] = React.useState<"AND" | "OR">("AND");
  const [conditions, setConditions] = React.useState(initialConditions);
  return (
    <FilterBuilder
      fields={[{ value: "name", label: "Name" }, { value: "status", label: "Status" }, { value: "role", label: "Role" }]}
      conditions={conditions}
      onConditionsChange={setConditions}
      logic={logic}
      onLogicChange={setLogic}
    />
  );
}
