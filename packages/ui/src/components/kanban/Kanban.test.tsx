import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Kanban, type KanbanColumnData } from "./Kanban";

interface Task {
  id: string;
  title: string;
}

const columns: KanbanColumnData<Task>[] = [
  { id: "todo", title: "To do", items: [{ id: "1", title: "Design review" }, { id: "2", title: "Write tests" }] },
  { id: "done", title: "Done", items: [{ id: "3", title: "Set up repo" }] },
];

/**
 * Real pointer-based drag-and-drop can't be reliably simulated in jsdom
 * (dnd-kit's collision detection depends on getBoundingClientRect, which
 * jsdom always reports as zero-size) — the same class of limitation noted
 * for Carousel and Chart. These tests cover structure and data flow;
 * the actual drag interaction needs a real browser to verify.
 */
describe("Kanban", () => {
  it("renders each column with its title, item count, and cards", () => {
    render(<Kanban columns={columns} onColumnsChange={vi.fn()} getItemId={(t) => t.id} renderItem={(t) => t.title} />);
    expect(screen.getByText("To do")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument(); // To do count
    expect(screen.getByText("Design review")).toBeInTheDocument();
    expect(screen.getByText("Write tests")).toBeInTheDocument();
    expect(screen.getByText("Set up repo")).toBeInTheDocument();
  });

  it("supports a custom column header renderer", () => {
    render(
      <Kanban
        columns={columns}
        onColumnsChange={vi.fn()}
        getItemId={(t) => t.id}
        renderItem={(t) => t.title}
        renderColumnHeader={(col) => <span>{col.title.toUpperCase()} ({col.items.length})</span>}
      />
    );
    expect(screen.getByText("TO DO (2)")).toBeInTheDocument();
  });

  it("cards are keyboard-focusable (a prerequisite for dnd-kit's keyboard sensor to pick them up)", () => {
    render(<Kanban columns={columns} onColumnsChange={vi.fn()} getItemId={(t) => t.id} renderItem={(t) => t.title} />);
    const card = screen.getByText("Design review").closest('[tabindex]');
    expect(card).toHaveAttribute("tabindex", "0");
  });
});
