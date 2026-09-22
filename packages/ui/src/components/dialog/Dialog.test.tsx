import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./Dialog";

function Example({ open, onOpenChange }: { open?: boolean; onOpenChange?: (o: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger>Open dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite member</DialogTitle>
          <DialogDescription>Send an invitation by email.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

describe("Dialog", () => {
  it("is closed by default and opens on trigger click", async () => {
    render(<Example />);
    expect(screen.queryByText("Invite member")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Open dialog" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Invite member")).toBeInTheDocument();
    expect(screen.getByText("Send an invitation by email.")).toBeInTheDocument();
  });

  it("closes via the built-in close button", async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole("button", { name: "Open dialog" }));
    await userEvent.click(screen.getByRole("button", { name: "Close dialog" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes on Escape", async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole("button", { name: "Open dialog" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("supports a fully controlled open state", async () => {
    const onOpenChange = vi.fn();
    render(<Example open={true} onOpenChange={onOpenChange} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("can hide the built-in close button via hideCloseButton", async () => {
    render(
      <Dialog open>
        <DialogContent hideCloseButton>
          <DialogTitle>No close button</DialogTitle>
        </DialogContent>
      </Dialog>
    );
    expect(screen.queryByRole("button", { name: "Close dialog" })).not.toBeInTheDocument();
  });
});
