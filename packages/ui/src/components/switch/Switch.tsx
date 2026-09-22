import * as React from "react";
import * as RadixSwitch from "@radix-ui/react-switch";
import { cn } from "../../utils/cn";
import { useUiId } from "../../hooks";

export interface SwitchProps extends Omit<React.ComponentPropsWithoutRef<typeof RadixSwitch.Root>, "asChild"> {
  label?: React.ReactNode;
  description?: string;
}

/** Toggle switch for binary settings. Prefer over Checkbox when the change takes effect immediately. */
export const Switch = React.forwardRef<React.ElementRef<typeof RadixSwitch.Root>, SwitchProps>(
  ({ className, label, description, id, ...props }, ref) => {
    const autoId = useUiId("switch");
    const switchId = id ?? autoId;
    return (
      <div className="ui-flex ui-items-center ui-justify-between ui-gap-4">
        {(label || description) && (
          <div className="ui-grid ui-gap-0.5">
            {label && <label htmlFor={switchId} className="ui-text-[var(--ui-text-sm)] ui-font-medium ui-text-[var(--ui-fg)]">{label}</label>}
            {description && <p className="ui-text-[var(--ui-text-xs)] ui-text-[var(--ui-fg-muted)]">{description}</p>}
          </div>
        )}
        <RadixSwitch.Root
          ref={ref}
          id={switchId}
          className={cn(
            "ui-relative ui-h-5 ui-w-9 ui-shrink-0 ui-rounded-[var(--ui-radius-full)] ui-bg-[var(--ui-bg-muted)] ui-transition-colors",
            "data-[state=checked]:ui-bg-[var(--ui-primary)]",
            "focus-visible:ui-outline-none focus-visible:ui-shadow-[var(--ui-focus-ring)]",
            "disabled:ui-opacity-50 disabled:ui-cursor-not-allowed",
            className
          )}
          {...props}
        >
          <RadixSwitch.Thumb className="ui-block ui-h-4 ui-w-4 ui-translate-x-0.5 ui-rounded-[var(--ui-radius-full)] ui-bg-[var(--ui-bg)] ui-shadow-[var(--ui-shadow-sm)] ui-transition-transform data-[state=checked]:ui-translate-x-[18px]" />
        </RadixSwitch.Root>
      </div>
    );
  }
);
Switch.displayName = "Switch";
