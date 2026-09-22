"use client";

import * as React from "react";
import { Kanban, type KanbanColumnData } from "@labanaat/ui/kanban";
import { Avatar } from "@labanaat/ui/avatar";
import { Badge } from "@labanaat/ui/badge";

interface Task {
  id: string;
  title: string;
  assignee: string;
  priority: "Low" | "Medium" | "High";
}

const initialColumns: KanbanColumnData<Task>[] = [
  {
    id: "backlog",
    title: "Backlog",
    items: [
      { id: "1", title: "Audit onboarding drop-off", assignee: "Grace Hopper", priority: "Medium" },
      { id: "2", title: "Draft Q3 roadmap", assignee: "Alan Turing", priority: "Low" },
    ],
  },
  {
    id: "in-progress",
    title: "In progress",
    items: [
      { id: "3", title: "Migrate billing to new provider", assignee: "Katherine Johnson", priority: "High" },
      { id: "4", title: "Rebuild settings page", assignee: "Ada Lovelace", priority: "Medium" },
    ],
  },
  {
    id: "review",
    title: "In review",
    items: [{ id: "5", title: "Fix pagination edge case", assignee: "Grace Hopper", priority: "High" }],
  },
  {
    id: "done",
    title: "Done",
    items: [{ id: "6", title: "Set up staging environment", assignee: "Alan Turing", priority: "Low" }],
  },
];

const priorityVariant = { Low: "neutral", Medium: "warning", High: "danger" } as const;

export default function BoardPage() {
  const [columns, setColumns] = React.useState(initialColumns);

  return (
    <div className="ui-flex ui-min-w-0 ui-flex-col ui-gap-6">
      <div>
        <h1 className="ui-text-2xl ui-font-semibold ui-text-[var(--ui-fg)]">Sprint 14</h1>
        <p className="ui-mt-1 ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg-muted)]">Drag cards to reorder or move them between columns.</p>
      </div>
      <Kanban
        columns={columns}
        onColumnsChange={setColumns}
        getItemId={(t) => t.id}
        renderItem={(t) => (
          <div className="ui-flex ui-flex-col ui-gap-2">
            <span className="ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg)]">{t.title}</span>
            <div className="ui-flex ui-items-center ui-justify-between">
              <Avatar name={t.assignee} size="sm" />
              <Badge variant={priorityVariant[t.priority]}>{t.priority}</Badge>
            </div>
          </div>
        )}
      />
    </div>
  );
}
