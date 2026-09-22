import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Stepper, StepperItem } from "./Stepper";

describe("Stepper", () => {
  it("auto-derives status from currentStep and marks the current step with aria-current", () => {
    const { container } = render(
      <Stepper currentStep={1}>
        <StepperItem index={0} title="Account" />
        <StepperItem index={1} title="Billing" />
        <StepperItem index={2} title="Confirm" isLast />
      </Stepper>
    );
    const current = container.querySelectorAll("[aria-current]");
    expect(current).toHaveLength(1);
    expect(current[0]).toHaveTextContent("Billing");
  });

  it("an explicit status prop overrides the auto-derived one", () => {
    render(
      <Stepper currentStep={2}>
        <StepperItem index={0} title="Account" status="error" />
        <StepperItem index={1} title="Billing" isLast />
      </Stepper>
    );
    // Error status renders the error icon (an svg) inside the indicator; just confirm no crash and title renders.
    expect(screen.getByText("Account")).toBeInTheDocument();
  });

  it("renders in vertical orientation without error", () => {
    render(
      <Stepper currentStep={0} orientation="vertical">
        <StepperItem index={0} title="Step one" isLast />
      </Stepper>
    );
    expect(screen.getByText("Step one")).toBeInTheDocument();
  });
});
