import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { useUiContent } from "../../content";

const spinnerVariants = cva("ui-animate-spin", {
  variants: {
    size: { sm: "ui-h-4 ui-w-4", md: "ui-h-6 ui-w-6", lg: "ui-h-8 ui-w-8" },
  },
  defaultVariants: { size: "md" },
});

export interface SpinnerProps extends React.SVGAttributes<SVGSVGElement>, VariantProps<typeof spinnerVariants> {
  /** Accessible label announced to screen readers. Defaults to localized content string. */
  label?: string;
}

/** Loading indicator. Announces itself via role="status" without stealing visible focus. */
export const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, size, label, ...props }, ref) => {
    const content = useUiContent();
    return (
      <svg
        ref={ref}
        role="status"
        aria-label={label ?? content.loading.label}
        viewBox="0 0 24 24"
        fill="none"
        className={cn(spinnerVariants({ size }), className)}
        {...props}
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
        <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }
);
Spinner.displayName = "Spinner";
