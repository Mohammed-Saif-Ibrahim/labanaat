import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { CommandPalette, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "./CommandPalette";

function Example({ open, onOpenChange }: { open?: boolean; onOpenChange?: (o: boolean) => void }) {
  return (
    <CommandPalette open={open} onOpenChange={onOpenChange} label="Command menu">
      <CommandInput placeholder="Search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Pages">
          <CommandItem>Dashboard</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandPalette>
  );
}

describe("CommandPalette", () => {
  it("renders nothing when closed", () => {
    render(<Example open={false} />);
    expect(screen.queryByPlaceholderText("Search…")).not.toBeInTheDocument();
  });

  it("renders items when open and filters them by typing", async () => {
    render(<Example open={true} />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();

    await userEvent.type(screen.getByPlaceholderText("Search…"), "Dash");
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.queryByText("Settings")).not.toBeInTheDocument();
  });

  it("clicking the backdrop calls onOpenChange(false)", async () => {
    const onOpenChange = vi.fn();
    const { container } = render(<Example open={true} onOpenChange={onOpenChange} />);
    const backdrop = container.querySelector('[aria-hidden="true"]');
    expect(backdrop).toBeTruthy();
    await userEvent.click(backdrop!);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("toggles open via the configured keyboard shortcut", async () => {
    const onOpenChange = vi.fn();
    function ShortcutExample() {
      const [open, setOpen] = useState(false);
      return (
        <CommandPalette
          open={open}
          onOpenChange={(o: boolean) => {
            setOpen(o);
            onOpenChange(o);
          }}
          shortcut="k"
        >
          <CommandInput placeholder="Search…" />
          <CommandList>
            <CommandItem>Dashboard</CommandItem>
          </CommandList>
        </CommandPalette>
      );
    }
    render(<ShortcutExample />);
    expect(screen.queryByPlaceholderText("Search…")).not.toBeInTheDocument();
    await userEvent.keyboard("{Meta>}k{/Meta}");
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});
