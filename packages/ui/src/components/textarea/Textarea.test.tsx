import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Textarea } from "./Textarea";

describe("Textarea", () => {
  it("associates the label with the field via htmlFor/id", () => {
    render(<Textarea label="Bio" />);
    expect(screen.getByLabelText("Bio")).toBeInTheDocument();
  });

  it("accepts typed input and reports it via onChange", async () => {
    const onChange = vi.fn();
    render(<Textarea label="Bio" onChange={onChange} />);
    await userEvent.type(screen.getByLabelText("Bio"), "Hi");
    expect(onChange).toHaveBeenCalled();
    expect(screen.getByLabelText("Bio")).toHaveValue("Hi");
  });

  it("wires the description as aria-describedby", () => {
    render(<Textarea label="Bio" description="Max 280 characters." />);
    const textarea = screen.getByLabelText("Bio");
    const descId = textarea.getAttribute("aria-describedby");
    expect(descId).toBeTruthy();
    expect(document.getElementById(descId!)).toHaveTextContent("Max 280 characters.");
  });

  it("marks the field invalid and shows the error as role=alert instead of the description", () => {
    render(<Textarea label="Bio" description="Max 280 characters." error="Too long" />);
    expect(screen.getByLabelText("Bio")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Too long");
    expect(screen.queryByText("Max 280 characters.")).not.toBeInTheDocument();
  });

  it("defaults to 4 rows", () => {
    render(<Textarea label="Bio" />);
    expect(screen.getByLabelText("Bio")).toHaveAttribute("rows", "4");
  });
});
