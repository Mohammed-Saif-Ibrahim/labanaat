import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DataTable, DataTableColumnHeader, type DataTableColumn } from "./DataTable";

interface Person {
  id: string;
  name: string;
  role: string;
}

const people: Person[] = [
  { id: "1", name: "Ada Lovelace", role: "Owner" },
  { id: "2", name: "Grace Hopper", role: "Admin" },
  { id: "3", name: "Alan Turing", role: "Member" },
];

const columns: DataTableColumn<Person>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader title="Name" column={column} />,
    cell: (info) => info.getValue(),
  },
  { accessorKey: "role", header: "Role", cell: (info) => info.getValue() },
];

describe("DataTable", () => {
  it("renders rows and column headers from data", () => {
    render(<DataTable columns={columns} data={people} />);
    expect(screen.getByText("Ada Lovelace")).toBeInTheDocument();
    expect(screen.getByText("Grace Hopper")).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /Name/ })).toBeInTheDocument();
  });

  it("shows the empty state when data is empty", () => {
    render(<DataTable columns={columns} data={[]} emptyTitle="No people" />);
    expect(screen.getByText("No people")).toBeInTheDocument();
  });

  it("shows skeleton placeholders while loading, not the empty state", () => {
    const { container } = render(<DataTable columns={columns} data={[]} isLoading emptyTitle="No people" />);
    expect(screen.queryByText("No people")).not.toBeInTheDocument();
    expect(container.querySelectorAll('[aria-hidden="true"]').length).toBeGreaterThan(0);
  });

  it("sorts rows when a sortable column header is clicked", async () => {
    render(<DataTable columns={columns} data={people} />);
    const header = screen.getByRole("button", { name: /Name/ });
    await userEvent.click(header);
    const cells = screen.getAllByRole("cell").map((c) => c.textContent);
    // First column of each row alternates name/role; just confirm Ada (alphabetically first) leads after ascending sort.
    expect(cells[0]).toBe("Ada Lovelace");
  });

  it("calls onSortingChange when controlled", async () => {
    const onSortingChange = vi.fn();
    render(<DataTable columns={columns} data={people} sorting={[]} onSortingChange={onSortingChange} />);
    await userEvent.click(screen.getByRole("button", { name: /Name/ }));
    expect(onSortingChange).toHaveBeenCalled();
  });

  it("paginates client-side when pageSize is set", () => {
    render(<DataTable columns={columns} data={people} pageSize={2} />);
    expect(screen.getByText("Ada Lovelace")).toBeInTheDocument();
    expect(screen.getByText("Grace Hopper")).toBeInTheDocument();
    expect(screen.queryByText("Alan Turing")).not.toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Pagination" })).toBeInTheDocument();
  });

  it("enables row selection with a leading checkbox column", async () => {
    render(<DataTable columns={columns} data={people} enableRowSelection />);
    const checkboxes = screen.getAllByRole("checkbox");
    // One "select all" header checkbox + one per row.
    expect(checkboxes.length).toBe(people.length + 1);
    await userEvent.click(checkboxes[1]!);
    expect(checkboxes[1]!).toBeChecked();
  });
});
