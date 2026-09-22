import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ToastProvider, ToastRegistry, ToastViewport, useToast } from "./Toast";

function TriggerButton({ variant }: { variant?: "default" | "success" | "danger" }) {
  const { toast } = useToast();
  return (
    <button onClick={() => toast({ title: "Saved", description: "Your changes were saved.", variant })}>
      Trigger
    </button>
  );
}

function Example({ variant }: { variant?: "default" | "success" | "danger" }) {
  return (
    <ToastProvider>
      <ToastRegistry>
        <TriggerButton variant={variant} />
      </ToastRegistry>
      <ToastViewport />
    </ToastProvider>
  );
}

describe("Toast", () => {
  it("shows nothing until toast() is called", () => {
    render(<Example />);
    expect(screen.queryByText("Saved")).not.toBeInTheDocument();
  });

  it("shows a toast with title and description after toast() is called", async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole("button", { name: "Trigger" }));
    expect(await screen.findByText("Saved")).toBeInTheDocument();
    expect(screen.getByText("Your changes were saved.")).toBeInTheDocument();
  });

  it("dismisses via the built-in close button", async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole("button", { name: "Trigger" }));
    await screen.findByText("Saved");
    await userEvent.click(screen.getByRole("button", { name: "Close notification" }));
    await waitFor(() => expect(screen.queryByText("Saved")).not.toBeInTheDocument());
  });

  it("throws a clear error when useToast is called outside ToastRegistry", () => {
    function Bare() {
      useToast();
      return null;
    }
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Bare />)).toThrow(/must be used within <ToastRegistry>/);
    spy.mockRestore();
  });
});
