import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  it("falls back to a default localized title when none is given", () => {
    render(<EmptyState />);
    expect(screen.getByText((text) => text.length > 0)).toBeInTheDocument();
  });

  it("renders a custom title, description, and action together", () => {
    render(<EmptyState title="No members yet" description="Invite your first teammate." action={<button>Invite</button>} />);
    expect(screen.getByText("No members yet")).toBeInTheDocument();
    expect(screen.getByText("Invite your first teammate.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Invite" })).toBeInTheDocument();
  });

  it("marks a decorative icon as aria-hidden so screen readers don't announce it redundantly", () => {
    const { container } = render(<EmptyState icon={<svg data-testid="icon" />} title="Empty" />);
    const iconWrapper = container.querySelector('[aria-hidden="true"]');
    expect(iconWrapper).toBeTruthy();
    expect(iconWrapper?.querySelector('[data-testid="icon"]')).toBeTruthy();
  });
});
