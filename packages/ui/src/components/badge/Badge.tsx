import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

export const badgeVariants = cva(
  "ui-inline-flex ui-items-center ui-gap-1 ui-rounded-[var(--ui-radius-full)] ui-px-2.5 ui-py-0.5 ui-text-[var(--ui-text-xs)] ui-font-medium",
  {
    variants: {
      variant: {
        neutral: "ui-bg-[var(--ui-bg-muted)] ui-text-[var(--ui-fg)]",
        primary: "ui-bg-[color-mix(in_srgb,var(--ui-primary)_15%,transparent)] ui-text-[var(--ui-primary)]",
        success: "ui-bg-[color-mix(in_srgb,var(--ui-success)_15%,transparent)] ui-text-[var(--ui-success)]",
        warning: "ui-bg-[color-mix(in_srgb,var(--ui-warning)_15%,transparent)] ui-text-[var(--ui-warning)]",
        danger: "ui-bg-[color-mix(in_srgb,var(--ui-danger)_15%,transparent)] ui-text-[var(--ui-danger)]",
        outline: "ui-border ui-border-[var(--ui-border-strong)] ui-text-[var(--ui-fg)]",
      },
    },
    defaultVariants: { variant: "neutral" },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

/** Small status/labeling element. Purely presentational — wrap in a live region yourself if it communicates state changes. */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({ className, variant, ...props }, ref) => (
  <span ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
));
Badge.displayName = "Badge";
