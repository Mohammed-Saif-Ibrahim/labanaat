import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DatePicker } from "./DatePicker";

describe("DatePicker", () => {
  it("associates the label with a native type=date input", () => {
    render(<DatePicker label="Start date" />);
    const input = screen.getByLabelText("Start date");
    expect(input).toHaveAttribute("type", "date");
  });

  it("accepts a date value and reports changes via onChange", async () => {
    const onChange = vi.fn();
    render(<DatePicker label="Start date" onChange={onChange} />);
    const input = screen.getByLabelText("Start date");
    fireEvent.change(input, { target: { value: "2026-01-15" } });
    expect(onChange).toHaveBeenCalled();
    expect(input).toHaveValue("2026-01-15");
  });

  it("passes min/max through to the native input", () => {
    render(<DatePicker label="Start date" min="2026-01-01" max="2026-12-31" />);
    const input = screen.getByLabelText("Start date");
    expect(input).toHaveAttribute("min", "2026-01-01");
    expect(input).toHaveAttribute("max", "2026-12-31");
  });

  it("wires the description as aria-describedby", () => {
    render(<DatePicker label="Start date" description="Your subscription begins on this date." />);
    const input = screen.getByLabelText("Start date");
    const descId = input.getAttribute("aria-describedby");
    expect(document.getElementById(descId!)).toHaveTextContent("Your subscription begins on this date.");
  });

  it("marks the field invalid and shows the error as role=alert", () => {
    render(<DatePicker label="Start date" error="Date is required" />);
    expect(screen.getByLabelText("Start date")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Date is required");
  });
});
