import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./Accordion";

function Example() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="a">
        <AccordionTrigger>Section A</AccordionTrigger>
        <AccordionContent>Content A</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Section B</AccordionTrigger>
        <AccordionContent>Content B</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

describe("Accordion", () => {
  it("starts fully collapsed and reveals content on trigger click", async () => {
    render(<Example />);
    expect(screen.queryByText("Content A")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Section A" }));
    expect(screen.getByText("Content A")).toBeVisible();
  });

  it("collapses the open item when its trigger is clicked again (collapsible mode)", async () => {
    render(<Example />);
    const trigger = screen.getByRole("button", { name: "Section A" });
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("supports arrow-key navigation between triggers", async () => {
    render(<Example />);
    const first = screen.getByRole("button", { name: "Section A" });
    const second = screen.getByRole("button", { name: "Section B" });
    first.focus();
    await userEvent.keyboard("{ArrowDown}");
    expect(second).toHaveFocus();
  });
});
