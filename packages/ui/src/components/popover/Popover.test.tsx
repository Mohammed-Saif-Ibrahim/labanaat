import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from "./Popover";

// See DropdownMenu.test.tsx for why pointerdown→pointerup→click is used
// instead of userEvent.click, and why the extended timeout is needed —
// same Radix Popper-based positioning slowness in this environment.
function openPopover(trigger: HTMLElement) {
  fireEvent.pointerDown(trigger, { button: 0, pointerId: 1 });
  fireEvent.pointerUp(trigger, { button: 0, pointerId: 1 });
  fireEvent.click(trigger);
}

describe("Popover", () => {
  it(
    "is closed by default and opens on trigger interaction",
    async () => {
      render(
        <Popover>
          <PopoverTrigger>Filters</PopoverTrigger>
          <PopoverContent>Filter options here.</PopoverContent>
        </Popover>
      );
      expect(screen.queryByText("Filter options here.")).not.toBeInTheDocument();
      openPopover(screen.getByRole("button", { name: "Filters" }));
      expect(await screen.findByText("Filter options here.", {}, { timeout: 20000 })).toBeInTheDocument();
    },
    25000
  );

  it(
    "closes via PopoverClose",
    async () => {
      render(
        <Popover>
          <PopoverTrigger>Filters</PopoverTrigger>
          <PopoverContent>
            <PopoverClose>Done</PopoverClose>
          </PopoverContent>
        </Popover>
      );
      openPopover(screen.getByRole("button", { name: "Filters" }));
      const closeBtn = await screen.findByRole("button", { name: "Done" }, { timeout: 20000 });
      fireEvent.pointerDown(closeBtn, { button: 0, pointerId: 1 });
      fireEvent.pointerUp(closeBtn, { button: 0, pointerId: 1 });
      fireEvent.click(closeBtn);
      expect(screen.queryByText("Done")).not.toBeInTheDocument();
    },
    25000
  );

  it(
    "supports a fully controlled open state",
    async () => {
      const onOpenChange = vi.fn();
      render(
        <Popover open={true} onOpenChange={onOpenChange}>
          <PopoverTrigger>Filters</PopoverTrigger>
          <PopoverContent>Filter options here.</PopoverContent>
        </Popover>
      );
      expect(await screen.findByText("Filter options here.", {}, { timeout: 20000 })).toBeInTheDocument();
    },
    25000
  );
});
