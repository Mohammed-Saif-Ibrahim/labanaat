import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Input } from "./Input";

describe("Input", () => {
  it("associates the label with the input via htmlFor/id", () => {
    render(<Input label="Email" />);
    const input = screen.getByLabelText("Email");
    expect(input).toBeInTheDocument();
  });

  it("connects description text via aria-describedby", () => {
    render(<Input label="Email" description="We'll never share this." />);
    const input = screen.getByLabelText("Email");
    const descId = input.getAttribute("aria-describedby");
    expect(descId).toBeTruthy();
    expect(document.getElementById(descId!)).toHaveTextContent("We'll never share this.");
  });

  it("marks the field invalid and surfaces the error via aria-describedby + role=alert", () => {
    render(<Input label="Email" error="Enter a valid email." />);
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Enter a valid email.");
  });

  it("accepts typed input as an uncontrolled field", async () => {
    render(<Input label="Email" />);
    const input = screen.getByLabelText("Email");
    await userEvent.type(input, "hi@example.com");
    expect(input).toHaveValue("hi@example.com");
  });
});
