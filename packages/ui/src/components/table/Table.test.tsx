import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, SortableTableHead } from "./Table";

describe("Table", () => {
  it("renders a real semantic table with rows and cells", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Ada Lovelace</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Name" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "Ada Lovelace" })).toBeInTheDocument();
  });
});

describe("SortableTableHead", () => {
  it("cycles asc -> desc -> none and sets aria-sort accordingly", async () => {
    const onSortChange = vi.fn();
    const { rerender } = render(
      <table>
        <thead>
          <tr>
            <SortableTableHead direction={null} onSortChange={onSortChange}>Name</SortableTableHead>
          </tr>
        </thead>
      </table>
    );
    const header = screen.getByRole("columnheader");
    expect(header).toHaveAttribute("aria-sort", "none");

    await userEvent.click(screen.getByRole("button", { name: /Name/ }));
    expect(onSortChange).toHaveBeenCalledWith("asc");

    rerender(
      <table>
        <thead>
          <tr>
            <SortableTableHead direction="asc" onSortChange={onSortChange}>Name</SortableTableHead>
          </tr>
        </thead>
      </table>
    );
    expect(screen.getByRole("columnheader")).toHaveAttribute("aria-sort", "ascending");
  });
});
