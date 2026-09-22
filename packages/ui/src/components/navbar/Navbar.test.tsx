import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu } from "./Navbar";

function Example() {
  return (
    <Navbar>
      <NavbarBrand>Labanaat</NavbarBrand>
      <NavbarContent>
        <NavbarItem href="/docs" active>Docs</NavbarItem>
        <NavbarItem href="/components">Components</NavbarItem>
      </NavbarContent>
      <NavbarMenuToggle />
      <NavbarMenu>
        <NavbarItem href="/docs">Docs</NavbarItem>
      </NavbarMenu>
    </Navbar>
  );
}

describe("Navbar", () => {
  it("marks the active item with aria-current", () => {
    render(<Example />);
    expect(screen.getByRole("link", { name: "Docs" })).toHaveAttribute("aria-current", "page");
  });

  it("mobile menu is closed by default and opens via the toggle", async () => {
    render(<Example />);
    const toggle = screen.getByRole("button", { name: "Open menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(toggle);
    expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute("aria-expanded", "true");
  });
});
