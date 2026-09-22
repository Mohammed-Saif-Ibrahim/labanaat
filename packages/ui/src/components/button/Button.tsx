import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../utils/cn";
import { Spinner } from "../spinner/Spinner";

export const buttonVariants = cva(
  [
    "ui-inline-flex ui-items-center ui-justify-center ui-gap-2 ui-whitespace-nowrap",
    "ui-rounded-[var(--ui-radius-md)] ui-font-medium ui-transition-colors",
    "ui-duration-[var(--ui-duration-base)] ui-ease-[var(--ui-easing-standard)]",
    "disabled:ui-opacity-50 disabled:ui-pointer-events-none",
    "focus-visible:ui-outline-none focus-visible:ui-shadow-[var(--ui-focus-ring)]",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "ui-bg-[var(--ui-primary)] ui-text-[var(--ui-fg-on-primary)] hover:ui-bg-[var(--ui-primary-hover)] active:ui-bg-[var(--ui-primary-active)]",
        secondary:
          "ui-bg-[var(--ui-bg-muted)] ui-text-[var(--ui-fg)] hover:ui-bg-[var(--ui-border)]",
        outline:
          "ui-border ui-border-[var(--ui-border-strong)] ui-bg-transparent ui-text-[var(--ui-fg)] hover:ui-bg-[var(--ui-bg-subtle)]",
        ghost: "ui-bg-transparent ui-text-[var(--ui-fg)] hover:ui-bg-[var(--ui-bg-subtle)]",
        danger:
          "ui-bg-[var(--ui-danger)] ui-text-[var(--ui-fg-on-primary)] hover:ui-bg-[var(--ui-danger-hover)]",
        link: "ui-bg-transparent ui-text-[var(--ui-primary)] ui-underline-offset-4 hover:ui-underline ui-p-0 ui-h-auto",
      },
      size: {
        sm: "ui-h-8 ui-px-3 ui-text-[var(--ui-text-sm)]",
        md: "ui-h-10 ui-px-4 ui-text-[var(--ui-text-base)]",
        lg: "ui-h-12 ui-px-6 ui-text-[var(--ui-text-lg)]",
        icon: "ui-h-10 ui-w-10 ui-p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as the child element instead of a <button> (composition, e.g. wrapping a <Link>). */
  asChild?: boolean;
  /** Shows a spinner and disables interaction while true. Button retains its width and label for screen readers. */
  isLoading?: boolean;
  /** Icon rendered before the label. Purely decorative — pass an accessible label via children/aria-label. */
  startIcon?: React.ReactNode;
  /** Icon rendered after the label. */
  endIcon?: React.ReactNode;
}

/**
 * Button — foundational interactive element.
 * Composable via `asChild` (renders your element, e.g. `<a>`, with button
 * styles/behavior merged on), supports loading and icon slots, and is
 * fully keyboard/focus-visible accessible out of the box.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild, isLoading, startIcon, endIcon, children, disabled, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {isLoading ? <Spinner size="sm" aria-hidden /> : startIcon}
            {children}
            {!isLoading && endIcon}
          </>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";
