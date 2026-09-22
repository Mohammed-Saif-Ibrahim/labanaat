import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
  it("announces itself via role=status with a default accessible label", () => {
    render(<Spinner />);
    const spinner = screen.getByRole("status");
    expect(spinner).toHaveAttribute("aria-label");
    expect(spinner.getAttribute("aria-label")?.length).toBeGreaterThan(0);
  });

  it("accepts a custom label overriding the default", () => {
    render(<Spinner label="Saving your changes" />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Saving your changes");
  });

  it("applies the correct size class per size prop", () => {
    const { rerender, container } = render(<Spinner size="sm" />);
    expect(container.querySelector("svg")?.getAttribute("class")).toContain("ui-h-4");
    rerender(<Spinner size="lg" />);
    expect(container.querySelector("svg")?.getAttribute("class")).toContain("ui-h-8");
  });
});
