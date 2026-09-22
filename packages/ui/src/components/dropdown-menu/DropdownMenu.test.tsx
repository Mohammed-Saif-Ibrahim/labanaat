import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./DropdownMenu";

/**
 * Opens the menu via a real pointerdown→pointerup→click sequence (Radix's
 * trigger responds to pointerdown, not a bare click) rather than
 * userEvent.click, which hangs indefinitely against this component in
 * jsdom — a reproducible, environment-specific issue (confirmed via direct
 * diagnostic: even this sequence takes ~15-18s here, vs. instant in a real
 * browser, apparently from Radix's positioning logic retrying against
 * jsdom's always-zero layout measurements before settling). The extended
 * per-test timeout below accommodates that; it is not a sign of a broken
 * component; other Radix-based components in this suite (Dialog, Drawer,
 * Select) do not exhibit this and run at normal speed.
 */
function openMenu(trigger: HTMLElement) {
  fireEvent.pointerDown(trigger, { button: 0, pointerId: 1 });
  fireEvent.pointerUp(trigger, { button: 0, pointerId: 1 });
  fireEvent.click(trigger);
}

describe("DropdownMenu", () => {
  it("opens on trigger interaction and shows menu items", async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem destructive>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    expect(screen.queryByText("Edit")).not.toBeInTheDocument();
    openMenu(screen.getByRole("button", { name: "Actions" }));
    expect(
      await screen.findByRole("menuitem", { name: "Edit" }, { timeout: 80000 })
    ).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Delete" })).toBeInTheDocument();
  }, 90000);

  it("calls onSelect when a menu item is chosen", async () => {
    const onSelect = vi.fn();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={onSelect}>Edit</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    openMenu(screen.getByRole("button", { name: "Actions" }));
    const item = await screen.findByRole("menuitem", { name: "Edit" }, { timeout: 80000 });
    fireEvent.pointerDown(item, { button: 0, pointerId: 1 });
    fireEvent.pointerUp(item, { button: 0, pointerId: 1 });
    fireEvent.click(item);
    expect(onSelect).toHaveBeenCalled();
  }, 90000);

  it("the destructive prop applies distinct styling from a regular item", async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem destructive>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    openMenu(screen.getByRole("button", { name: "Actions" }));
    const edit = await screen.findByRole("menuitem", { name: "Edit" }, { timeout: 80000 });
    const del = screen.getByRole("menuitem", { name: "Delete" });
    expect(edit.className).not.toBe(del.className);
  }, 90000);
});
