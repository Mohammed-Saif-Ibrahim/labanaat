import * as React from "react";
import { cn } from "../../utils/cn";

/**
 * Timeline — activity feeds, changelogs, order history. Pure composition:
 * compose Timeline.Item > (Timeline.Indicator + Timeline.Content) the same
 * way you'd compose Card. Connecting lines are handled per-item via
 * `isLast`, matching Stepper's pattern rather than introducing a second,
 * separate connector component to keep in sync.
 */
export const Timeline = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} role="list" className={cn("ui-flex ui-flex-col", className)} {...props} />
  )
);
Timeline.displayName = "Timeline";

export interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  isLast?: boolean;
}

export const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ className, isLast, children, ...props }, ref) => (
    <div ref={ref} role="listitem" className={cn("ui-flex ui-gap-4", className)} {...props}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child) && (child.type as { displayName?: string })?.displayName === "TimelineIndicator"
          ? React.cloneElement(child as React.ReactElement<{ isLast?: boolean }>, { isLast })
          : child
      )}
    </div>
  )
);
TimelineItem.displayName = "TimelineItem";

export interface TimelineIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  variant?: "default" | "primary" | "success" | "danger";
  isLast?: boolean;
}

export const TimelineIndicator = React.forwardRef<HTMLDivElement, TimelineIndicatorProps>(
  ({ className, icon, variant = "default", isLast, ...props }, ref) => (
    <div ref={ref} className={cn("ui-flex ui-flex-col ui-items-center ui-self-stretch", className)} {...props}>
      <span
        className={cn(
          "ui-flex ui-h-7 ui-w-7 ui-shrink-0 ui-items-center ui-justify-center ui-rounded-[var(--ui-radius-full)] ui-border-2 ui-bg-[var(--ui-bg)] ui-text-[var(--ui-text-xs)]",
          variant === "default" && "ui-border-[var(--ui-border-strong)] ui-text-[var(--ui-fg-muted)]",
          variant === "primary" && "ui-border-[var(--ui-primary)] ui-text-[var(--ui-primary)]",
          variant === "success" && "ui-border-[var(--ui-success)] ui-text-[var(--ui-success)]",
          variant === "danger" && "ui-border-[var(--ui-danger)] ui-text-[var(--ui-danger)]"
        )}
        aria-hidden="true"
      >
        {icon}
      </span>
      {!isLast && <div className="ui-my-1 ui-w-0.5 ui-flex-1 ui-bg-[var(--ui-border)]" aria-hidden="true" />}
    </div>
  )
);
TimelineIndicator.displayName = "TimelineIndicator";

export const TimelineContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("ui-flex-1 ui-pb-8", className)} {...props} />
);
TimelineContent.displayName = "TimelineContent";

export const TimelineTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("ui-text-[var(--ui-text-sm)] ui-font-medium ui-text-[var(--ui-fg)]", className)} {...props} />
  )
);
TimelineTitle.displayName = "TimelineTitle";

export const TimelineDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("ui-mt-0.5 ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg-muted)]", className)} {...props} />
  )
);
TimelineDescription.displayName = "TimelineDescription";

export const TimelineTime = React.forwardRef<HTMLTimeElement, React.TimeHTMLAttributes<HTMLTimeElement>>(
  ({ className, ...props }, ref) => (
    <time ref={ref} className={cn("ui-mt-1 ui-block ui-text-[var(--ui-text-xs)] ui-text-[var(--ui-fg-muted)]", className)} {...props} />
  )
);
TimelineTime.displayName = "TimelineTime";
