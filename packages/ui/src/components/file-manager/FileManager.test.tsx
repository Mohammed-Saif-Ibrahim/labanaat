import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FileManager, type FileManagerItem } from "./FileManager";

const items: FileManagerItem[] = [
  { id: "1", name: "Reports", type: "folder" },
  { id: "2", name: "budget.xlsx", type: "file", size: 245000 },
];

describe("FileManager", () => {
  it("renders the breadcrumb path and all items", () => {
    render(<FileManager items={items} path={["Home", "Projects"]} onPathChange={vi.fn()} />);
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Reports")).toBeInTheDocument();
    expect(screen.getByText("budget.xlsx")).toBeInTheDocument();
  });

  it("shows an empty state when the folder has no items", () => {
    render(<FileManager items={[]} path={["Home"]} onPathChange={vi.fn()} />);
    expect(screen.getByText("This folder is empty")).toBeInTheDocument();
  });

  it("selects an item on click", async () => {
    const onSelectedChange = vi.fn();
    render(<FileManager items={items} path={["Home"]} onPathChange={vi.fn()} onSelectedChange={onSelectedChange} />);
    await userEvent.click(screen.getByText("Reports"));
    expect(onSelectedChange).toHaveBeenCalledWith(["1"]);
  });

  it("opens a folder on double-click, appending to the path", async () => {
    const onPathChange = vi.fn();
    const onOpen = vi.fn();
    render(<FileManager items={items} path={["Home"]} onPathChange={onPathChange} onOpen={onOpen} />);
    await userEvent.dblClick(screen.getByText("Reports"));
    expect(onOpen).toHaveBeenCalledWith(items[0]);
    expect(onPathChange).toHaveBeenCalledWith(["Home", "Reports"]);
  });

  it("opens a folder on Enter while focused (keyboard equivalent of double-click)", async () => {
    const onPathChange = vi.fn();
    render(<FileManager items={items} path={["Home"]} onPathChange={onPathChange} />);
    const folderCell = screen.getByText("Reports").closest('[role="option"]') as HTMLElement;
    folderCell.focus();
    await userEvent.keyboard("{Enter}");
    expect(onPathChange).toHaveBeenCalledWith(["Home", "Reports"]);
  });

  it("navigating via a breadcrumb segment truncates the path", async () => {
    const onPathChange = vi.fn();
    render(<FileManager items={items} path={["Home", "Projects", "2026"]} onPathChange={onPathChange} />);
    await userEvent.click(screen.getByText("Home"));
    expect(onPathChange).toHaveBeenCalledWith(["Home"]);
  });

  it("toggles between grid and list view", async () => {
    render(<FileManager items={items} path={["Home"]} onPathChange={vi.fn()} defaultView="grid" />);
    const listBtn = screen.getByRole("button", { name: "List view" });
    expect(listBtn).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(listBtn);
    expect(listBtn).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("239.3 KB")).toBeInTheDocument();
  });
});
