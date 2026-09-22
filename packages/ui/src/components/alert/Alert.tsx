import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

export const alertVariants = cva("ui-relative ui-w-full ui-rounded-[var(--ui-radius-md)] ui-border ui-p-4 ui-text-[var(--ui-text-sm)]", {
  variants: {
    variant: {
      neutral: "ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg-subtle)] ui-text-[var(--ui-fg)]",
      success: "ui-border-transparent ui-bg-[color-mix(in_srgb,var(--ui-success)_12%,transparent)] ui-text-[var(--ui-success)]",
      warning: "ui-border-transparent ui-bg-[color-mix(in_srgb,var(--ui-warning)_12%,transparent)] ui-text-[var(--ui-warning)]",
      danger: "ui-border-transparent ui-bg-[color-mix(in_srgb,var(--ui-danger)_12%,transparent)] ui-text-[var(--ui-danger)]",
    },
  },
  defaultVariants: { variant: "neutral" },
});

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof alertVariants> {
  /** Icon slot — pass any icon element; purely decorative (aria-hidden applied automatically to wrapper). */
  icon?: React.ReactNode;
  title?: React.ReactNode;
}

/** Inline status message. Uses role="alert" for danger/warning so assistive tech announces it immediately; others use role="status". */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, icon, title, children, ...props }, ref) => (
    <div
      ref={ref}
      role={variant === "danger" || variant === "warning" ? "alert" : "status"}
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      <div className="ui-flex ui-gap-3">
        {icon && <span aria-hidden="true" className="ui-mt-0.5">{icon}</span>}
        <div className="ui-flex-1">
          {title && <div className="ui-mb-1 ui-font-medium ui-leading-none">{title}</div>}
          {children && <div className="ui-text-[var(--ui-fg-muted)] [&:not(:first-child)]:ui-mt-0">{children}</div>}
        </div>
      </div>
    </div>
  )
);
Alert.displayName = "Alert";
