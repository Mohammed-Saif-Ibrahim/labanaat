import * as React from "react";
import { cn } from "../../utils/cn";
import { useUiId } from "../../hooks";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hideLabel?: boolean;
  description?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, hideLabel, description, error, id, rows = 4, ...props }, ref) => {
    const autoId = useUiId("textarea");
    const textareaId = id ?? autoId;
    const descId = description ? `${textareaId}-description` : undefined;
    const errorId = error ? `${textareaId}-error` : undefined;

    return (
      <div className="ui-flex ui-flex-col ui-gap-1.5">
        {label && (
          <label htmlFor={textareaId} className={cn("ui-text-[var(--ui-text-sm)] ui-font-medium ui-text-[var(--ui-fg)]", hideLabel && "ui-visually-hidden")}>
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          aria-invalid={!!error || undefined}
          aria-describedby={cn(descId, errorId).trim() || undefined}
          className={cn(
            "ui-w-full ui-rounded-[var(--ui-radius-md)] ui-border ui-border-[var(--ui-border-strong)] ui-bg-[var(--ui-bg)] ui-px-3 ui-py-2 ui-text-[var(--ui-text-base)] ui-text-[var(--ui-fg)]",
            "ui-transition-colors focus-visible:ui-outline-none focus-visible:ui-shadow-[var(--ui-focus-ring)] focus-visible:ui-border-[var(--ui-ring)]",
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
Textarea.displayName = "Textarea";
