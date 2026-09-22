import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Sidebar, SidebarHeader, SidebarHeaderTitle, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from "./Sidebar";

function Example() {
  return (
    <Sidebar defaultCollapsed={false}>
      <SidebarTrigger />
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton active>Overview</SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>Members</SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}

describe("Sidebar", () => {
  it("marks the active menu item with aria-current", () => {
    render(<Example />);
    expect(screen.getByRole("button", { name: "Overview" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("button", { name: "Members" })).not.toHaveAttribute("aria-current");
  });

  it("toggles collapsed state via SidebarTrigger, uncontrolled", async () => {
    render(<Example />);
    const trigger = screen.getByRole("button", { name: "Toggle sidebar" });
    expect(trigger).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-pressed", "true");
  });

  it("supports controlled collapsed state via onCollapsedChange", async () => {
    const onCollapsedChange = vi.fn();
    render(
      <Sidebar collapsed={false} onCollapsedChange={onCollapsedChange}>
        <SidebarTrigger />
      </Sidebar>
    );
    await userEvent.click(screen.getByRole("button", { name: "Toggle sidebar" }));
    expect(onCollapsedChange).toHaveBeenCalledWith(true);
  });

  it("throws a clear error when subcomponents are used outside Sidebar", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<SidebarTrigger />)).toThrow(/must be used within <Sidebar>/);
    spy.mockRestore();
  });

  it("SidebarHeaderTitle fades out on collapse instead of being abruptly clipped (regression: SidebarHeader's overflow-hidden alone just chopped the text mid-character)", async () => {
    render(
      <Sidebar defaultCollapsed={false}>
        <SidebarTrigger />
        <SidebarHeader>
          <SidebarHeaderTitle>Acme Inc</SidebarHeaderTitle>
        </SidebarHeader>
      </Sidebar>
    );
    const title = screen.getByText("Acme Inc");
    expect(title.className).not.toContain("ui-opacity-0");
    await userEvent.click(screen.getByRole("button", { name: "Toggle sidebar" }));
    expect(title.className).toContain("ui-opacity-0");
  });
});
