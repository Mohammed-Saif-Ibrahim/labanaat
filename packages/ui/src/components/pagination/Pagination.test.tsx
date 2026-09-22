import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("renders as a nav landmark with aria-current on the active page", () => {
    render(<Pagination page={2} totalPages={3} onPageChange={vi.fn()} />);
    expect(screen.getByRole("navigation", { name: "Pagination" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Page 2/ })).toHaveAttribute("aria-current", "page");
  });

  it("calls onPageChange with the clicked page number", async () => {
    const onPageChange = vi.fn();
    render(<Pagination page={1} totalPages={3} onPageChange={onPageChange} />);
    await userEvent.click(screen.getByRole("button", { name: /Page 3/ }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("disables Previous on the first page and Next on the last page", () => {
    render(<Pagination page={1} totalPages={3} onPageChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next page" })).not.toBeDisabled();
  });

  it("Next/Previous buttons move the page by one", async () => {
    const onPageChange = vi.fn();
    render(<Pagination page={2} totalPages={5} onPageChange={onPageChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Next page" }));
    expect(onPageChange).toHaveBeenCalledWith(3);
    await userEvent.click(screen.getByRole("button", { name: "Previous page" }));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it("collapses distant pages into an ellipsis when there are many pages", () => {
    render(<Pagination page={1} totalPages={20} onPageChange={vi.fn()} />);
    expect(screen.getByText("…")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Page 20/ })).toBeInTheDocument();
  });

  it("shows every page with no ellipsis when the total is small", () => {
    render(<Pagination page={1} totalPages={3} onPageChange={vi.fn()} />);
    expect(screen.queryByText("…")).not.toBeInTheDocument();
    for (const n of [1, 2, 3]) {
      expect(screen.getByRole("button", { name: new RegExp(`Page ${n}`) })).toBeInTheDocument();
    }
  });
});
