import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DataGrid, DataGridEditableCell, type DataGridColumn } from "./DataGrid";

interface Row {
  id: string;
  name: string;
  role: string;
}

const rows: Row[] = [
  { id: "1", name: "Ada Lovelace", role: "Owner" },
  { id: "2", name: "Grace Hopper", role: "Admin" },
];

const columns: DataGridColumn<Row>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "role", header: "Role" },
];

describe("DataGrid", () => {
  it("renders rows and headers", () => {
    render(<DataGrid columns={columns} data={rows} />);
    expect(screen.getByText("Ada Lovelace")).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Name" })).toBeInTheDocument();
  });

  it("shows the empty state when data is empty", () => {
    render(<DataGrid columns={columns} data={[]} emptyTitle="No rows" />);
    expect(screen.getByText("No rows")).toBeInTheDocument();
  });

  it("shows skeleton placeholders while loading", () => {
    render(<DataGrid columns={columns} data={[]} isLoading emptyTitle="No rows" />);
    expect(screen.queryByText("No rows")).not.toBeInTheDocument();
  });

  it("exposes a keyboard-operable resize handle per resizable column", () => {
    render(<DataGrid columns={columns} data={rows} />);
    const handles = screen.getAllByRole("separator", { name: /Resize/ });
    expect(handles.length).toBe(columns.length);
    expect(handles[0]).toHaveAttribute("tabindex", "0");
  });
});

describe("DataGridEditableCell", () => {
  it("shows static text until clicked, then becomes an editable input", async () => {
    render(<DataGridEditableCell value="Ada" onCommit={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Ada" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Ada" }));
    expect(screen.getByDisplayValue("Ada")).toBeInTheDocument();
  });

  it("commits the new value on Enter", async () => {
    const onCommit = vi.fn();
    render(<DataGridEditableCell value="Ada" onCommit={onCommit} />);
    await userEvent.click(screen.getByRole("button", { name: "Ada" }));
    const input = screen.getByDisplayValue("Ada");
    await userEvent.clear(input);
    await userEvent.type(input, "Grace{Enter}");
    expect(onCommit).toHaveBeenCalledWith("Grace");
  });

  it("discards changes on Escape without calling onCommit", async () => {
    const onCommit = vi.fn();
    render(<DataGridEditableCell value="Ada" onCommit={onCommit} />);
    await userEvent.click(screen.getByRole("button", { name: "Ada" }));
    const input = screen.getByDisplayValue("Ada");
    await userEvent.type(input, "Grace{Escape}");
    expect(onCommit).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Ada" })).toBeInTheDocument();
  });
});
