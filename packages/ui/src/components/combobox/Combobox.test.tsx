import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Combobox } from "./Combobox";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
];

describe("Combobox", () => {
  it("exposes combobox/listbox ARIA roles and filters options as the user types", async () => {
    render(<Combobox options={options} label="Fruit" />);
    const input = screen.getByRole("combobox", { name: "Fruit" });
    await userEvent.click(input);
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(3);

    await userEvent.type(input, "ban");
    const opts = screen.getAllByRole("option");
    expect(opts).toHaveLength(1);
    expect(opts[0]).toHaveTextContent("Banana");
  });

  it("commits a selection on click and calls onValueChange", async () => {
    const onValueChange = vi.fn();
    render(<Combobox options={options} label="Fruit" onValueChange={onValueChange} />);
    const input = screen.getByRole("combobox", { name: "Fruit" });
    await userEvent.click(input);
    await userEvent.click(screen.getByRole("option", { name: "Cherry" }));
    expect(onValueChange).toHaveBeenCalledWith("cherry");
    expect(input).toHaveValue("Cherry");
  });

  it("commits the highlighted option on Enter", async () => {
    const onValueChange = vi.fn();
    render(<Combobox options={options} label="Fruit" onValueChange={onValueChange} />);
    const input = screen.getByRole("combobox", { name: "Fruit" });
    await userEvent.click(input);
    await userEvent.keyboard("{ArrowDown}{Enter}");
    expect(onValueChange).toHaveBeenCalledWith("apple");
  });
});
