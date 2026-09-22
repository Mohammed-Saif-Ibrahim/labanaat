import * as React from "react";
import { cn } from "../../utils/cn";
import { useUiId } from "../../hooks";

export interface DatePickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
  description?: string;
  error?: string;
  /** ISO 8601 min/max, e.g. "2025-01-01". */
  min?: string;
  max?: string;
}

/**
 * DatePicker — built on the native `<input type="date">` rather than a
 * custom calendar grid. This is a deliberate trade-off: the native control
 * gets correct keyboard input, locale-aware formatting, and mobile date
 * wheels for free, at the cost of custom visual styling. A fully custom
 * calendar popover (for range selection, custom formats, etc.) is planned
 * as a separate `DateRangePicker` in a future release — see the roadmap.
 */
export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({ className, label, description, error, id, ...props }, ref) => {
    const autoId = useUiId("datepicker");
    const inputId = id ?? autoId;
    const descId = description ? `${inputId}-description` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;

    return (
      <div className="ui-flex ui-flex-col ui-gap-1.5">
        {label && (
          <label htmlFor={inputId} className="ui-text-[var(--ui-text-sm)] ui-font-medium ui-text-[var(--ui-fg)]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type="date"
          aria-invalid={!!error || undefined}
          aria-describedby={cn(descId, errorId).trim() || undefined}
          className={cn(
            "ui-h-10 ui-w-full ui-rounded-[var(--ui-radius-md)] ui-border ui-border-[var(--ui-border-strong)] ui-bg-[var(--ui-bg)] ui-px-3 ui-text-[var(--ui-text-base)] ui-text-[var(--ui-fg)]",
            "focus-visible:ui-outline-none focus-visible:ui-shadow-[var(--ui-focus-ring)] focus-visible:ui-border-[var(--ui-ring)]",
            "disabled:ui-opacity-50 disabled:ui-cursor-not-allowed",
            error && "ui-border-[var(--ui-danger)]",
            className
          )}
          {...props}
        />
        {description && !error && <p id={descId} className="ui-text-[var(--ui-text-xs)] ui-text-[var(--ui-fg-muted)]">{description}</p>}
        {error && <p id={errorId} role="alert" className="ui-text-[var(--ui-text-xs)] ui-text-[var(--ui-danger)]">{error}</p>}
      </div>
    );
  }
);
DatePicker.displayName = "DatePicker";
