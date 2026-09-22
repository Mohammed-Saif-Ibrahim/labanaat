import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Calendar } from "./Calendar";

describe("Calendar", () => {
  it("renders a month grid with weekday headers and day buttons", () => {
    render(<Calendar defaultMonth={new Date(2026, 0, 1)} />);
    expect(screen.getByText("January 2026")).toBeInTheDocument();
    expect(screen.getByRole("grid")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "January 15, 2026" })).toBeInTheDocument();
  });

  it("gives every day button a full, unambiguous accessible name (not just the bare day number, which repeats across adjacent months in the same grid)", () => {
    render(<Calendar defaultMonth={new Date(2026, 0, 1)} />);
    expect(screen.queryAllByRole("button", { name: /^15$/ })).toHaveLength(0);
    expect(screen.getByRole("button", { name: "January 15, 2026" })).toBeInTheDocument();
  });

  it("selects a date on click and calls onSelect", async () => {
    const onSelect = vi.fn();
    render(<Calendar defaultMonth={new Date(2026, 0, 1)} onSelect={onSelect} />);
    await userEvent.click(screen.getByRole("button", { name: "January 15, 2026" }));
    expect(onSelect).toHaveBeenCalledTimes(1);
    const calledWith: Date = onSelect.mock.calls[0]![0];
    expect(calledWith.getDate()).toBe(15);
    // aria-selected lives on the gridcell (per the ARIA grid pattern), not the button —
    // a plain button role doesn't support aria-selected. Query via the button's
    // ancestor rather than the gridcell's computed name, since dom-accessibility-api
    // doesn't fully implement name-from-content for the gridcell role.
    const cell = screen.getByRole("button", { name: "January 15, 2026" }).closest('[role="gridcell"]');
    expect(cell).toHaveAttribute("aria-selected", "true");
  });

  it("moves focus with arrow keys (roving tabindex)", async () => {
    render(<Calendar defaultMonth={new Date(2026, 0, 1)} />);
    const day15 = screen.getByRole("button", { name: "January 15, 2026" });
    day15.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("button", { name: "January 16, 2026" })).toHaveFocus();
  });

  it("navigates to the next month with PageDown", async () => {
    render(<Calendar defaultMonth={new Date(2026, 0, 1)} />);
    const day15 = screen.getByRole("button", { name: "January 15, 2026" });
    day15.focus();
    await userEvent.keyboard("{PageDown}");
    expect(await screen.findByText("February 2026")).toBeInTheDocument();
  });

  it("disables dates outside the min/max range", () => {
    render(<Calendar defaultMonth={new Date(2026, 0, 1)} minDate={new Date(2026, 0, 10)} />);
    expect(screen.getByRole("button", { name: "January 5, 2026" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "January 15, 2026" })).not.toBeDisabled();
  });

  it("supports a fully controlled selected date", () => {
    const selected = new Date(2026, 0, 20);
    render(<Calendar month={new Date(2026, 0, 1)} selected={selected} onSelect={() => {}} onMonthChange={() => {}} />);
    const cell = screen.getByRole("button", { name: "January 20, 2026" }).closest('[role="gridcell"]');
    expect(cell).toHaveAttribute("aria-selected", "true");
  });

  describe("range mode", () => {
    it("first click sets the range start; second click sets the end", async () => {
      const onSelectRange = vi.fn();
      render(<Calendar mode="range" defaultMonth={new Date(2026, 0, 1)} onSelectRange={onSelectRange} />);
      await userEvent.click(screen.getByRole("button", { name: "January 10, 2026" }));
      expect(onSelectRange).toHaveBeenLastCalledWith({ from: expect.any(Date), to: undefined });
      await userEvent.click(screen.getByRole("button", { name: "January 15, 2026" }));
      const lastCall = onSelectRange.mock.calls[onSelectRange.mock.calls.length - 1]![0];
      expect(lastCall.from.getDate()).toBe(10);
      expect(lastCall.to.getDate()).toBe(15);
    });

    it("swaps from/to when the second click lands before the first", async () => {
      const onSelectRange = vi.fn();
      render(<Calendar mode="range" defaultMonth={new Date(2026, 0, 1)} onSelectRange={onSelectRange} />);
      await userEvent.click(screen.getByRole("button", { name: "January 15, 2026" }));
      await userEvent.click(screen.getByRole("button", { name: "January 10, 2026" }));
      const lastCall = onSelectRange.mock.calls[onSelectRange.mock.calls.length - 1]![0];
      expect(lastCall.from.getDate()).toBe(10);
      expect(lastCall.to.getDate()).toBe(15);
    });

    it("a third click starts a new range instead of extending the completed one", async () => {
      const onSelectRange = vi.fn();
      render(<Calendar mode="range" defaultMonth={new Date(2026, 0, 1)} onSelectRange={onSelectRange} />);
      await userEvent.click(screen.getByRole("button", { name: "January 10, 2026" }));
      await userEvent.click(screen.getByRole("button", { name: "January 15, 2026" }));
      await userEvent.click(screen.getByRole("button", { name: "January 20, 2026" }));
      const lastCall = onSelectRange.mock.calls[onSelectRange.mock.calls.length - 1]![0];
      expect(lastCall.from.getDate()).toBe(20);
      expect(lastCall.to).toBeUndefined();
    });

    it("marks the range endpoints and in-between days as aria-selected", () => {
      render(
        <Calendar
          mode="range"
          month={new Date(2026, 0, 1)}
          selectedRange={{ from: new Date(2026, 0, 10), to: new Date(2026, 0, 12) }}
          onSelectRange={() => {}}
          onMonthChange={() => {}}
        />
      );
      const start = screen.getByRole("button", { name: "January 10, 2026" }).closest('[role="gridcell"]');
      const middle = screen.getByRole("button", { name: "January 11, 2026" }).closest('[role="gridcell"]');
      const end = screen.getByRole("button", { name: "January 12, 2026" }).closest('[role="gridcell"]');
      const outside = screen.getByRole("button", { name: "January 13, 2026" }).closest('[role="gridcell"]');
      expect(start).toHaveAttribute("aria-selected", "true");
      expect(end).toHaveAttribute("aria-selected", "true");
      expect(middle).not.toHaveAttribute("aria-selected", "true");
      expect(outside).not.toHaveAttribute("aria-selected", "true");
    });
  });
});
