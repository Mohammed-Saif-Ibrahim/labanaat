import * as React from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { cn } from "../../utils/cn";

export const TooltipProvider = RadixTooltip.Provider;
export const Tooltip = RadixTooltip.Root;
export const TooltipTrigger = RadixTooltip.Trigger;

export const TooltipContent = React.forwardRef<
  React.ElementRef<typeof RadixTooltip.Content>,
  React.ComponentPropsWithoutRef<typeof RadixTooltip.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <RadixTooltip.Portal>
    <RadixTooltip.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "ui-z-50 ui-rounded-[var(--ui-radius-sm)] ui-bg-[var(--ui-color-neutral-900)] ui-px-2.5 ui-py-1.5 ui-text-[var(--ui-text-xs)] ui-text-white ui-shadow-[var(--ui-shadow-md)]",
        "data-[state=delayed-open]:ui-animate-in data-[state=delayed-open]:ui-fade-in data-[state=closed]:ui-animate-out data-[state=closed]:ui-fade-out",
        className
      )}
      {...props}
    >
      {props.children}
      <RadixTooltip.Arrow className="ui-fill-[var(--ui-color-neutral-900)]" />
    </RadixTooltip.Content>
  </RadixTooltip.Portal>
));
TooltipContent.displayName = "TooltipContent";
