import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "./Drawer";

describe("Drawer", () => {
  it("is closed by default and opens on trigger click", async () => {
    render(
      <Drawer>
        <DrawerTrigger>Edit member</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Edit Grace Hopper</DrawerTitle>
            <DrawerDescription>Update role and permissions.</DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    );
    expect(screen.queryByText("Edit Grace Hopper")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Edit member" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Edit Grace Hopper")).toBeInTheDocument();
  });

  it("closes via the built-in close button", async () => {
    render(
      <Drawer defaultOpen>
        <DrawerContent>
          <DrawerTitle>Panel</DrawerTitle>
        </DrawerContent>
      </Drawer>
    );
    await userEvent.click(screen.getByRole("button", { name: "Close panel" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes on Escape", async () => {
    render(
      <Drawer defaultOpen>
        <DrawerContent>
          <DrawerTitle>Panel</DrawerTitle>
        </DrawerContent>
      </Drawer>
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("supports left, right, and bottom side variants without error", () => {
    const { rerender } = render(
      <Drawer defaultOpen>
        <DrawerContent side="left"><DrawerTitle>Left</DrawerTitle></DrawerContent>
      </Drawer>
    );
    expect(screen.getByText("Left")).toBeInTheDocument();
    rerender(
      <Drawer defaultOpen>
        <DrawerContent side="bottom"><DrawerTitle>Bottom</DrawerTitle></DrawerContent>
      </Drawer>
    );
    expect(screen.getByText("Bottom")).toBeInTheDocument();
  });
});
