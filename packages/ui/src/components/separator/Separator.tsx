import * as React from "react";
import * as RadixSeparator from "@radix-ui/react-separator";
import { cn } from "../../utils/cn";

export interface SeparatorProps extends React.ComponentPropsWithoutRef<typeof RadixSeparator.Root> {}

/** Visual/semantic divider. `decorative` (default true) removes it from the accessibility tree when purely visual. */
export const Separator = React.forwardRef<React.ElementRef<typeof RadixSeparator.Root>, SeparatorProps>(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
    <RadixSeparator.Root
      ref={ref}
      orientation={orientation}
      decorative={decorative}
      className={cn(
        "ui-shrink-0 ui-bg-[var(--ui-border)]",
        orientation === "horizontal" ? "ui-h-px ui-w-full" : "ui-h-full ui-w-px",
        className
      )}
      {...props}
    />
  )
);
Separator.displayName = "Separator";
