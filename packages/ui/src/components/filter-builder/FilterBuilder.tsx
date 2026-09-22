import * as React from "react";
import { cn } from "../../utils/cn";
import { useUiId } from "../../hooks";
import { Select } from "../select/Select";
import { Input } from "../input/Input";
import { Button } from "../button/Button";

export interface FilterField {
  value: string;
  label: string;
}

export interface FilterOperator {
  value: string;
  label: string;
}

export interface FilterCondition {
  id: string;
  field: string;
  operator: string;
  value: string;
}

const DEFAULT_OPERATORS: FilterOperator[] = [
  { value: "eq", label: "is" },
  { value: "neq", label: "is not" },
  { value: "contains", label: "contains" },
  { value: "gt", label: "greater than" },
  { value: "lt", label: "less than" },
];

export interface FilterBuilderProps {
  fields: FilterField[];
  operators?: FilterOperator[];
  conditions: FilterCondition[];
  onConditionsChange: (conditions: FilterCondition[]) => void;
  logic?: "AND" | "OR";
  onLogicChange?: (logic: "AND" | "OR") => void;
  className?: string;
}

/**
 * FilterBuilder — an interactive query-condition builder (field +
 * operator + value rows, with AND/OR logic between them) for search and
 * data-table filtering UIs. Pure composition of Select/Input/Button —
 * no new dependency, since this is fundamentally a data-shape problem,
 * not an interaction-mechanics one like Kanban's drag-and-drop.
 *
 * Deliberately scoped to a flat condition list joined by one shared
 * AND/OR operator, not arbitrarily nested groups — covers the large
 * majority of real filter UIs without the complexity (and harder-to-use
 * UI) of a full recursive expression tree.
 */
export function FilterBuilder({ fields, operators = DEFAULT_OPERATORS, conditions, onConditionsChange, logic = "AND", onLogicChange, className }: FilterBuilderProps) {
  const idBase = useUiId("filter");

  function updateCondition(id: string, patch: Partial<FilterCondition>) {
    onConditionsChange(conditions.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  }

  function removeCondition(id: string) {
    onConditionsChange(conditions.filter((c) => c.id !== id));
  }

  function addCondition() {
    const nextId = `${idBase}-${conditions.length}-${Date.now()}`;
    onConditionsChange([...conditions, { id: nextId, field: fields[0]?.value ?? "", operator: operators[0]?.value ?? "", value: "" }]);
  }

  return (
    <div className={cn("ui-flex ui-flex-col ui-gap-3", className)}>
      {conditions.map((condition, i) => (
        <div key={condition.id} className="ui-flex ui-flex-wrap ui-items-end ui-gap-2">
          {i === 0 ? (
            <span className="ui-flex ui-h-10 ui-w-16 ui-shrink-0 ui-items-center ui-text-[var(--ui-text-sm)] ui-font-medium ui-text-[var(--ui-fg-muted)]">Where</span>
          ) : i === 1 && onLogicChange ? (
            <div className="ui-w-16 ui-shrink-0">
              <Select
                label="Logic"
                hideLabel
                value={logic}
                onValueChange={(v) => onLogicChange(v as "AND" | "OR")}
                options={[{ value: "AND", label: "And" }, { value: "OR", label: "Or" }]}
              />
            </div>
          ) : (
            <span className="ui-flex ui-h-10 ui-w-16 ui-shrink-0 ui-items-center ui-text-[var(--ui-text-sm)] ui-font-medium ui-text-[var(--ui-fg-muted)]">
              {logic === "AND" ? "And" : "Or"}
            </span>
          )}

          <div className="ui-w-40">
            <Select label="Field" hideLabel value={condition.field} onValueChange={(v) => updateCondition(condition.id, { field: v })} options={fields} />
          </div>
          <div className="ui-w-40">
            <Select label="Operator" hideLabel value={condition.operator} onValueChange={(v) => updateCondition(condition.id, { operator: v })} options={operators} />
          </div>
          <div className="ui-min-w-[10rem] ui-flex-1">
            <Input
              label="Value"
              hideLabel
              value={condition.value}
              onChange={(e) => updateCondition(condition.id, { value: e.target.value })}
              placeholder="Value"
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Remove condition"
            onClick={() => removeCondition(condition.id)}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3.5 3.5L10.5 10.5M10.5 3.5L3.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </Button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" className="ui-w-fit" onClick={addCondition}>
        + Add condition
      </Button>
    </div>
  );
}
