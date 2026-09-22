import * as React from "react";
import * as RadixDropdown from "@radix-ui/react-dropdown-menu";
import { cn } from "../../utils/cn";

export const DropdownMenu = RadixDropdown.Root;
export const DropdownMenuTrigger = RadixDropdown.Trigger;
export const DropdownMenuGroup = RadixDropdown.Group;
export const DropdownMenuSeparator = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof RadixDropdown.Separator>) => (
  <RadixDropdown.Separator className={cn("ui-my-1 ui-h-px ui-bg-[var(--ui-border)]", className)} {...props} />
);

export const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof RadixDropdown.Content>,
  React.ComponentPropsWithoutRef<typeof RadixDropdown.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <RadixDropdown.Portal>
    <RadixDropdown.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "ui-z-50 ui-min-w-[10rem] ui-overflow-hidden ui-rounded-[var(--ui-radius-md)] ui-border ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg)] ui-p-1 ui-shadow-[var(--ui-shadow-lg)]",
        "data-[state=open]:ui-animate-in data-[state=open]:ui-fade-in data-[state=closed]:ui-animate-out data-[state=closed]:ui-fade-out",
        className
      )}
      {...props}
    />
  </RadixDropdown.Portal>
));
DropdownMenuContent.displayName = "DropdownMenuContent";

export const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof RadixDropdown.Item>,
  React.ComponentPropsWithoutRef<typeof RadixDropdown.Item> & { destructive?: boolean }
>(({ className, destructive, ...props }, ref) => (
  <RadixDropdown.Item
    ref={ref}
    className={cn(
      "ui-relative ui-flex ui-cursor-pointer ui-select-none ui-items-center ui-gap-2 ui-rounded-[var(--ui-radius-sm)] ui-px-2 ui-py-1.5 ui-text-[var(--ui-text-sm)] ui-outline-none",
      "data-[highlighted]:ui-bg-[var(--ui-bg-subtle)] data-[disabled]:ui-opacity-50",
      destructive ? "ui-text-[var(--ui-danger)]" : "ui-text-[var(--ui-fg)]",
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = "DropdownMenuItem";
