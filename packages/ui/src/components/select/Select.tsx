import * as React from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { cn } from "../../utils/cn";
import { useUiContent } from "../../content";

export interface SelectOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  /** Visually hides the label while keeping it accessible via aria-label, matching Input/Textarea's convention. */
  hideLabel?: boolean;
  disabled?: boolean;
  name?: string;
  className?: string;
}

const ChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Custom-styled, fully accessible select built on Radix's Select primitive (listbox semantics, typeahead, keyboard nav). */
export function Select({ options, value, defaultValue, onValueChange, placeholder, label, hideLabel, disabled, name, className }: SelectProps) {
  const content = useUiContent();
  return (
    <div className={cn("ui-flex ui-flex-col ui-gap-1.5", className)}>
      {label && (
        <span className={cn("ui-text-[var(--ui-text-sm)] ui-font-medium ui-text-[var(--ui-fg)]", hideLabel && "ui-visually-hidden")}>
          {label}
        </span>
      )}
      <RadixSelect.Root value={value} defaultValue={defaultValue} onValueChange={onValueChange} disabled={disabled} name={name}>
        <RadixSelect.Trigger
          aria-label={label}
          className={cn(
            "ui-flex ui-h-10 ui-w-full ui-items-center ui-justify-between ui-gap-2 ui-rounded-[var(--ui-radius-md)] ui-border ui-border-[var(--ui-border-strong)] ui-bg-[var(--ui-bg)] ui-px-3 ui-text-[var(--ui-text-base)] ui-text-[var(--ui-fg)]",
            "focus-visible:ui-outline-none focus-visible:ui-shadow-[var(--ui-focus-ring)] disabled:ui-opacity-50 disabled:ui-cursor-not-allowed"
          )}
        >
          <RadixSelect.Value placeholder={placeholder ?? content.select.placeholder} />
          <RadixSelect.Icon><ChevronDown /></RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content className="ui-z-50 ui-overflow-hidden ui-rounded-[var(--ui-radius-md)] ui-border ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg)] ui-shadow-[var(--ui-shadow-lg)]">
            <RadixSelect.Viewport className="ui-p-1">
              {options.length === 0 && <div className="ui-px-2 ui-py-1.5 ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg-muted)]">{content.select.noResults}</div>}
              {options.map((opt) => (
                <RadixSelect.Item
                  key={opt.value}
                  value={opt.value}
                  disabled={opt.disabled}
                  className={cn(
                    "ui-relative ui-flex ui-cursor-pointer ui-select-none ui-items-center ui-rounded-[var(--ui-radius-sm)] ui-px-2 ui-py-1.5 ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg)] ui-outline-none",
                    "data-[highlighted]:ui-bg-[var(--ui-bg-subtle)] data-[disabled]:ui-opacity-50"
                  )}
                >
                  <RadixSelect.ItemText>{opt.label}</RadixSelect.ItemText>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </div>
  );
}
