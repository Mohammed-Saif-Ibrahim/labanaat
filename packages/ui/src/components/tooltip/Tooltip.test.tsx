import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "./Tooltip";

function Example() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Helpful detail</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

describe("Tooltip", () => {
  it("is hidden by default and appears on keyboard focus (the a11y-critical path — hover is a convenience, focus is what keyboard/screen-reader users rely on)", async () => {
    render(<Example />);
    expect(screen.queryByText("Helpful detail")).not.toBeInTheDocument();
    screen.getByRole("button", { name: "Hover me" }).focus();
    expect(await screen.findByText("Helpful detail", {}, { timeout: 80000 })).toBeInTheDocument();
  }, 90000);

  it("hides again once focus moves away", async () => {
    render(
      <>
        <Example />
        <button>Elsewhere</button>
      </>
    );
    screen.getByRole("button", { name: "Hover me" }).focus();
    await screen.findByText("Helpful detail", {}, { timeout: 80000 });
    screen.getByRole("button", { name: "Elsewhere" }).focus();
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(screen.queryByText("Helpful detail")).not.toBeInTheDocument();
  }, 90000);
});
