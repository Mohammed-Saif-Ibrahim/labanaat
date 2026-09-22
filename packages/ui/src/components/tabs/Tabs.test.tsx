import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs";

function Example() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account settings</TabsContent>
      <TabsContent value="billing">Billing details</TabsContent>
    </Tabs>
  );
}

describe("Tabs", () => {
  it("shows the default tab's content and hides the others", () => {
    render(<Example />);
    expect(screen.getByText("Account settings")).toBeInTheDocument();
    expect(screen.queryByText("Billing details")).not.toBeInTheDocument();
  });

  it("switches content on tab click", async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole("tab", { name: "Billing" }));
    expect(screen.getByText("Billing details")).toBeInTheDocument();
    expect(screen.queryByText("Account settings")).not.toBeInTheDocument();
  });

  it("marks the active tab with aria-selected", async () => {
    render(<Example />);
    expect(screen.getByRole("tab", { name: "Account" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "Billing" })).toHaveAttribute("aria-selected", "false");
    await userEvent.click(screen.getByRole("tab", { name: "Billing" }));
    expect(screen.getByRole("tab", { name: "Billing" })).toHaveAttribute("aria-selected", "true");
  });

  it("supports arrow-key navigation between tabs", async () => {
    render(<Example />);
    screen.getByRole("tab", { name: "Account" }).focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Billing" })).toHaveFocus();
  });

  it("supports a fully controlled active tab", async () => {
    function Controlled() {
      return (
        <Tabs value="billing" onValueChange={() => {}}>
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>
          <TabsContent value="account">Account settings</TabsContent>
          <TabsContent value="billing">Billing details</TabsContent>
        </Tabs>
      );
    }
    render(<Controlled />);
    expect(screen.getByText("Billing details")).toBeInTheDocument();
  });
});
