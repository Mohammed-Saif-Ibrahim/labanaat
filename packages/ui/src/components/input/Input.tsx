import * as React from "react";
import { cn } from "../../utils/cn";
import { useUiId } from "../../hooks";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  /** Visually hides the label while keeping it in the accessibility tree. Use when a placeholder or surrounding context already conveys purpose visually. */
  hideLabel?: boolean;
  description?: string;
  error?: string;
  startSlot?: React.ReactNode;
  endSlot?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

const sizeMap = { sm: "ui-h-8 ui-text-[var(--ui-text-sm)]", md: "ui-h-10 ui-text-[var(--ui-text-base)]", lg: "ui-h-12 ui-text-[var(--ui-text-lg)]" };

/**
 * Text input with built-in label/description/error wiring — all three are
 * connected via aria-describedby and aria-invalid automatically, so
 * consumers get correct a11y semantics without manual id plumbing.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, hideLabel, description, error, startSlot, endSlot, size = "md", id, ...props }, ref) => {
    const autoId = useUiId("input");
    const inputId = id ?? autoId;
    const descId = description ? `${inputId}-description` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;

    return (
      <div className="ui-flex ui-flex-col ui-gap-1.5">
        {label && (
          <label htmlFor={inputId} className={cn("ui-text-[var(--ui-text-sm)] ui-font-medium ui-text-[var(--ui-fg)]", hideLabel && "ui-visually-hidden")}>
            {label}
          </label>
        )}
        <div className="ui-relative ui-flex ui-items-center">
          {startSlot && <span className="ui-absolute ui-left-3 ui-text-[var(--ui-fg-muted)]" aria-hidden="true">{startSlot}</span>}
          <input
            ref={ref}
            id={inputId}
            aria-invalid={!!error || undefined}
            aria-describedby={cn(descId, errorId).trim() || undefined}
            className={cn(
              "ui-w-full ui-rounded-[var(--ui-radius-md)] ui-border ui-border-[var(--ui-border-strong)] ui-bg-[var(--ui-bg)] ui-px-3 ui-text-[var(--ui-fg)] ui-placeholder:text-[var(--ui-fg-muted)]",
              "ui-transition-colors focus-visible:ui-outline-none focus-visible:ui-shadow-[var(--ui-focus-ring)] focus-visible:ui-border-[var(--ui-ring)]",
              "disabled:ui-opacity-50 disabled:ui-cursor-not-allowed",
              error && "ui-border-[var(--ui-danger)]",
              sizeMap[size],
              startSlot && "ui-pl-9",
              endSlot && "ui-pr-9",
              className
            )}
            {...props}
          />
          {endSlot && <span className="ui-absolute ui-right-3 ui-text-[var(--ui-fg-muted)]">{endSlot}</span>}
        </div>
        {description && !error && <p id={descId} className="ui-text-[var(--ui-text-xs)] ui-text-[var(--ui-fg-muted)]">{description}</p>}
        {error && <p id={errorId} role="alert" className="ui-text-[var(--ui-text-xs)] ui-text-[var(--ui-danger)]">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
