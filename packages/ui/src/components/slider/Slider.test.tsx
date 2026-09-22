import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Slider } from "./Slider";

describe("Slider", () => {
  it("updates the displayed value live via keyboard interaction (single thumb)", async () => {
    render(<Slider label="Volume" defaultValue={[50]} formatValue={(v) => `${v}%`} />);
    expect(screen.getByText("50%")).toBeInTheDocument();

    const thumb = screen.getByRole("slider", { name: "Volume" });
    thumb.focus();
    await userEvent.keyboard("{ArrowRight}{ArrowRight}{ArrowRight}");

    expect(screen.getByText("53%")).toBeInTheDocument();
    expect(screen.queryByText("50%")).not.toBeInTheDocument();
  });

  it("updates the displayed value live for both thumbs in range mode", async () => {
    render(<Slider label="Price range" defaultValue={[20, 80]} formatValue={(v) => `$${v}`} />);
    expect(screen.getByText("$20 – $80")).toBeInTheDocument();

    const thumbs = screen.getAllByRole("slider");
    thumbs[0]!.focus();
    await userEvent.keyboard("{ArrowRight}{ArrowRight}");

    expect(screen.getByText("$22 – $80")).toBeInTheDocument();
  });

  it("calls onValueChange with the live value as it changes", async () => {
    const onValueChange = vi.fn();
    render(<Slider label="Volume" defaultValue={[50]} onValueChange={onValueChange} />);
    const thumb = screen.getByRole("slider", { name: "Volume" });
    thumb.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(onValueChange).toHaveBeenCalledWith([51]);
  });

  it("respects a fully controlled value prop", () => {
    render(<Slider label="Volume" value={[75]} formatValue={(v) => `${v}%`} onValueChange={() => {}} />);
    expect(screen.getByText("75%")).toBeInTheDocument();
  });
});
