import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FilterBuilder, type FilterCondition } from "./FilterBuilder";

const fields = [{ value: "name", label: "Name" }, { value: "status", label: "Status" }];

function Example({ conditions, onConditionsChange }: { conditions: FilterCondition[]; onConditionsChange: (c: FilterCondition[]) => void }) {
  return <FilterBuilder fields={fields} conditions={conditions} onConditionsChange={onConditionsChange} />;
}

describe("FilterBuilder", () => {
  it("renders one row per condition with field/operator/value controls", () => {
    render(<Example conditions={[{ id: "1", field: "name", operator: "eq", value: "" }]} onConditionsChange={vi.fn()} />);
    expect(screen.getByText("Where")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Value")).toBeInTheDocument();
  });

  it("adds a new condition when 'Add condition' is clicked", async () => {
    const onConditionsChange = vi.fn();
    render(<Example conditions={[{ id: "1", field: "name", operator: "eq", value: "" }]} onConditionsChange={onConditionsChange} />);
    await userEvent.click(screen.getByRole("button", { name: "+ Add condition" }));
    expect(onConditionsChange).toHaveBeenCalledTimes(1);
    const next = onConditionsChange.mock.calls[0]![0];
    expect(next).toHaveLength(2);
  });

  it("removes a condition when its remove button is clicked", async () => {
    const onConditionsChange = vi.fn();
    render(
      <Example
        conditions={[
          { id: "1", field: "name", operator: "eq", value: "" },
          { id: "2", field: "status", operator: "eq", value: "" },
        ]}
        onConditionsChange={onConditionsChange}
      />
    );
    const removeButtons = screen.getAllByRole("button", { name: "Remove condition" });
    await userEvent.click(removeButtons[0]!);
    expect(onConditionsChange).toHaveBeenCalledWith([{ id: "2", field: "status", operator: "eq", value: "" }]);
  });

  it("updates a condition's value on input", async () => {
    const onConditionsChange = vi.fn();
    render(<Example conditions={[{ id: "1", field: "name", operator: "eq", value: "" }]} onConditionsChange={onConditionsChange} />);
    await userEvent.type(screen.getByPlaceholderText("Value"), "A");
    expect(onConditionsChange).toHaveBeenCalled();
    const lastCall = onConditionsChange.mock.calls[onConditionsChange.mock.calls.length - 1]![0];
    expect(lastCall[0].value).toBe("A");
  });
});
