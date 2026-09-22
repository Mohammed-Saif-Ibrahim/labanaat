import * as React from "react";
import { cn } from "../../utils/cn";

/** Metric — a single KPI/stat display, e.g. inside a Card on a dashboard. Pure composition, like Card. */
export const Metric = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("ui-flex ui-flex-col ui-gap-1", className)} {...props} />
);
Metric.displayName = "Metric";

export const MetricLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg-muted)]", className)} {...props} />
  )
);
MetricLabel.displayName = "MetricLabel";

export const MetricValue = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("ui-text-3xl ui-font-semibold ui-tracking-tight ui-text-[var(--ui-fg)]", className)} {...props} />
  )
);
MetricValue.displayName = "MetricValue";

export interface MetricDeltaProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  direction: "up" | "down" | "neutral";
  children: React.ReactNode;
}

const UpIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 9L9 2M9 2H4M9 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const DownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 3L9 10M9 10H4M9 10V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

/** Trend indicator. `direction` drives both the icon and color — "up" isn't hardcoded to green, since for some metrics (e.g. churn, error rate) a rise is bad; pair `direction` with what's actually good for your metric, not just the raw sign. */
export const MetricDelta = React.forwardRef<HTMLSpanElement, MetricDeltaProps>(
  ({ className, direction, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "ui-flex ui-w-fit ui-items-center ui-gap-0.5 ui-text-[var(--ui-text-xs)] ui-font-medium",
        direction === "up" && "ui-text-[var(--ui-success)]",
        direction === "down" && "ui-text-[var(--ui-danger)]",
        direction === "neutral" && "ui-text-[var(--ui-fg-muted)]",
        className
      )}
      {...props}
    >
      {direction === "up" && <UpIcon />}
      {direction === "down" && <DownIcon />}
      {children}
    </span>
  )
);
MetricDelta.displayName = "MetricDelta";

export const MetricDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("ui-text-[var(--ui-text-xs)] ui-text-[var(--ui-fg-muted)]", className)} {...props} />
  )
);
MetricDescription.displayName = "MetricDescription";
