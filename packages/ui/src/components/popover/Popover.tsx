import * as React from "react";
import * as RadixPopover from "@radix-ui/react-popover";
import { cn } from "../../utils/cn";

/**
 * Popover — generic floating panel for rich content (as opposed to Tooltip's
 * brief text hints, or DropdownMenu's list-of-actions semantics). Built on
 * Radix's Popover primitive for positioning, focus management, and
 * dismiss-on-outside-click/escape behavior.
 */
export const Popover = RadixPopover.Root;
export const PopoverTrigger = RadixPopover.Trigger;
export const PopoverAnchor = RadixPopover.Anchor;
export const PopoverClose = RadixPopover.Close;

export const PopoverContent = React.forwardRef<
  React.ElementRef<typeof RadixPopover.Content>,
  React.ComponentPropsWithoutRef<typeof RadixPopover.Content>
>(({ className, align = "center", sideOffset = 8, ...props }, ref) => (
  <RadixPopover.Portal>
    <RadixPopover.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "ui-z-50 ui-w-72 ui-rounded-[var(--ui-radius-md)] ui-border ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg)] ui-p-4 ui-shadow-[var(--ui-shadow-lg)] ui-outline-none",
        "data-[state=open]:ui-animate-in data-[state=open]:ui-fade-in data-[state=closed]:ui-animate-out data-[state=closed]:ui-fade-out",
        className
      )}
      {...props}
    >
      {props.children}
      <RadixPopover.Arrow className="ui-fill-[var(--ui-bg)]" />
    </RadixPopover.Content>
  </RadixPopover.Portal>
));
PopoverContent.displayName = "PopoverContent";

type PopoverComponent = typeof Popover & {
  Trigger: typeof PopoverTrigger;
  Anchor: typeof PopoverAnchor;
  Content: typeof PopoverContent;
  Close: typeof PopoverClose;
};
(Popover as PopoverComponent).Trigger = PopoverTrigger;
(Popover as PopoverComponent).Anchor = PopoverAnchor;
(Popover as PopoverComponent).Content = PopoverContent;
(Popover as PopoverComponent).Close = PopoverClose;
