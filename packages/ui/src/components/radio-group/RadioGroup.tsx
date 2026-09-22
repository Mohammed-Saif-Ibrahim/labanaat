import * as React from "react";
import * as RadixRadioGroup from "@radix-ui/react-radio-group";
import { cn } from "../../utils/cn";
import { useUiId } from "../../hooks";

export interface RadioGroupOption {
  value: string;
  label: React.ReactNode;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<React.ComponentPropsWithoutRef<typeof RadixRadioGroup.Root>, "asChild"> {
  options: RadioGroupOption[];
  label?: string;
}

/** Single-choice group of radio buttons with roving tabindex and arrow-key navigation provided by Radix. */
export const RadioGroup = React.forwardRef<React.ElementRef<typeof RadixRadioGroup.Root>, RadioGroupProps>(
  ({ className, options, label, ...props }, ref) => {
    const groupId = useUiId("radio-group");
    return (
      <RadixRadioGroup.Root ref={ref} className={cn("ui-flex ui-flex-col ui-gap-3", className)} aria-label={label} {...props}>
        {options.map((opt) => {
          const itemId = `${groupId}-${opt.value}`;
          return (
            <div key={opt.value} className="ui-flex ui-items-start ui-gap-2">
              <RadixRadioGroup.Item
                id={itemId}
                value={opt.value}
                disabled={opt.disabled}
                className={cn(
                  "ui-mt-0.5 ui-h-4 ui-w-4 ui-shrink-0 ui-rounded-[var(--ui-radius-full)] ui-border ui-border-[var(--ui-border-strong)]",
                  "focus-visible:ui-outline-none focus-visible:ui-shadow-[var(--ui-focus-ring)]",
                  "disabled:ui-opacity-50"
                )}
              >
                <RadixRadioGroup.Indicator className="ui-flex ui-h-full ui-w-full ui-items-center ui-justify-center after:ui-block after:ui-h-2 after:ui-w-2 after:ui-rounded-[var(--ui-radius-full)] after:ui-bg-[var(--ui-primary)]" />
              </RadixRadioGroup.Item>
              <div className="ui-grid ui-gap-0.5 ui-leading-none">
                <label htmlFor={itemId} className="ui-text-[var(--ui-text-sm)] ui-font-medium ui-text-[var(--ui-fg)]">{opt.label}</label>
                {opt.description && <p className="ui-text-[var(--ui-text-xs)] ui-text-[var(--ui-fg-muted)]">{opt.description}</p>}
              </div>
            </div>
          );
        })}
      </RadixRadioGroup.Root>
    );
  }
);
RadioGroup.displayName = "RadioGroup";
