import * as React from "react";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { cn } from "../../utils/cn";
import { useUiId } from "../../hooks";

export interface CheckboxProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RadixCheckbox.Root>, "asChild"> {
  label?: React.ReactNode;
  description?: string;
}

/** Checkbox built on Radix's primitive for correct tri-state (checked/unchecked/indeterminate) semantics. */
export const Checkbox = React.forwardRef<React.ElementRef<typeof RadixCheckbox.Root>, CheckboxProps>(
  ({ className, label, description, id, ...props }, ref) => {
    const autoId = useUiId("checkbox");
    const checkboxId = id ?? autoId;
    return (
      <div className="ui-flex ui-items-start ui-gap-2">
        <RadixCheckbox.Root
          ref={ref}
          id={checkboxId}
          className={cn(
            "ui-mt-0.5 ui-h-4 ui-w-4 ui-shrink-0 ui-rounded-[var(--ui-radius-sm)] ui-border ui-border-[var(--ui-border-strong)] ui-bg-[var(--ui-bg)]",
            "data-[state=checked]:ui-bg-[var(--ui-primary)] data-[state=checked]:ui-border-[var(--ui-primary)]",
            "focus-visible:ui-outline-none focus-visible:ui-shadow-[var(--ui-focus-ring)]",
            "disabled:ui-opacity-50 disabled:ui-cursor-not-allowed",
            className
          )}
          {...props}
        >
          <RadixCheckbox.Indicator className="ui-flex ui-items-center ui-justify-center ui-text-[var(--ui-fg-on-primary)]">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M1 5L4 8L9 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
        {(label || description) && (
          <div className="ui-grid ui-gap-0.5 ui-leading-none">
            {label && <label htmlFor={checkboxId} className="ui-text-[var(--ui-text-sm)] ui-font-medium ui-text-[var(--ui-fg)]">{label}</label>}
            {description && <p className="ui-text-[var(--ui-text-xs)] ui-text-[var(--ui-fg-muted)]">{description}</p>}
          </div>
        )}
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";
