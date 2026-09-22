import * as React from "react";
import * as RadixTabs from "@radix-ui/react-tabs";
import { cn } from "../../utils/cn";

export const Tabs = RadixTabs.Root;

export const TabsList = React.forwardRef<React.ElementRef<typeof RadixTabs.List>, React.ComponentPropsWithoutRef<typeof RadixTabs.List>>(
  ({ className, ...props }, ref) => (
    <RadixTabs.List
      ref={ref}
      className={cn("ui-inline-flex ui-items-center ui-gap-1 ui-rounded-[var(--ui-radius-md)] ui-bg-[var(--ui-bg-muted)] ui-p-1", className)}
      {...props}
    />
  )
);
TabsList.displayName = "TabsList";

export const TabsTrigger = React.forwardRef<React.ElementRef<typeof RadixTabs.Trigger>, React.ComponentPropsWithoutRef<typeof RadixTabs.Trigger>>(
  ({ className, ...props }, ref) => (
    <RadixTabs.Trigger
      ref={ref}
      className={cn(
        "ui-rounded-[var(--ui-radius-sm)] ui-px-3 ui-py-1.5 ui-text-[var(--ui-text-sm)] ui-font-medium ui-text-[var(--ui-fg-muted)] ui-transition-colors",
        "data-[state=active]:ui-bg-[var(--ui-bg)] data-[state=active]:ui-text-[var(--ui-fg)] data-[state=active]:ui-shadow-[var(--ui-shadow-sm)]",
        "focus-visible:ui-outline-none focus-visible:ui-shadow-[var(--ui-focus-ring)]",
        className
      )}
      {...props}
    />
  )
);
TabsTrigger.displayName = "TabsTrigger";

export const TabsContent = React.forwardRef<React.ElementRef<typeof RadixTabs.Content>, React.ComponentPropsWithoutRef<typeof RadixTabs.Content>>(
  ({ className, ...props }, ref) => (
    <RadixTabs.Content
      ref={ref}
      className={cn("ui-mt-3 focus-visible:ui-outline-none focus-visible:ui-shadow-[var(--ui-focus-ring)]", className)}
      {...props}
    />
  )
);
TabsContent.displayName = "TabsContent";
