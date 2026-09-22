import * as React from "react";
import { cn } from "../../utils/cn";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
}

/** Determinate progress bar using native ARIA progressbar semantics (role, valuenow/min/max). */
export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, value, max = 100, label, showValue, ...props }, ref) => {
    const generatedId = React.useId();
    const labelId = label ? `progress-label-${generatedId}` : undefined;
    const pct = Math.min(100, Math.max(0, (value / max) * 100));
    return (
      <div className="ui-flex ui-flex-col ui-gap-1.5">
        {(label || showValue) && (
          <div className="ui-flex ui-justify-between ui-text-[var(--ui-text-sm)]">
            {label && <span id={labelId} className="ui-text-[var(--ui-fg)]">{label}</span>}
            {showValue && <span className="ui-text-[var(--ui-fg-muted)]">{Math.round(pct)}%</span>}
          </div>
        )}
        <div
          ref={ref}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-labelledby={labelId}
          aria-label={!label ? "Progress" : undefined}
          className={cn("ui-h-2 ui-w-full ui-overflow-hidden ui-rounded-[var(--ui-radius-full)] ui-bg-[var(--ui-bg-muted)]", className)}
          {...props}
        >
          <div
            className="ui-h-full ui-rounded-[var(--ui-radius-full)] ui-bg-[var(--ui-primary)] ui-transition-[width] ui-duration-[var(--ui-duration-slow)] ui-ease-[var(--ui-easing-standard)]"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    );
  }
);
ProgressBar.displayName = "ProgressBar";
