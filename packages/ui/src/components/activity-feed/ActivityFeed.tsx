import * as React from "react";
import { cn } from "../../utils/cn";

/**
 * ActivityFeed — a chronological log of actor-driven events (audit logs,
 * "who did what" feeds), distinct from Timeline: avatar-centric rather
 * than status-dot-centric, matching how activity feeds actually read
 * ("Ada invited Grace") versus a Timeline's state progression ("Deploy
 * completed"). Pure composition, like Timeline and Card.
 */
export const ActivityFeed = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} role="feed" className={cn("ui-flex ui-flex-col ui-gap-5", className)} {...props} />
  )
);
ActivityFeed.displayName = "ActivityFeed";

export const ActivityItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} role="article" className={cn("ui-flex ui-items-start ui-gap-3", className)} {...props} />
  )
);
ActivityItem.displayName = "ActivityItem";

export const ActivityAvatar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("ui-shrink-0", className)} {...props} />
);
ActivityAvatar.displayName = "ActivityAvatar";

export const ActivityContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("ui-min-w-0 ui-flex-1 ui-pt-0.5", className)} {...props} />
);
ActivityContent.displayName = "ActivityContent";

export const ActivityText = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("ui-text-[var(--ui-text-sm)] ui-leading-relaxed ui-text-[var(--ui-fg)]", className)} {...props} />
  )
);
ActivityText.displayName = "ActivityText";

export const ActivityTime = React.forwardRef<HTMLTimeElement, React.TimeHTMLAttributes<HTMLTimeElement>>(
  ({ className, ...props }, ref) => (
    <time ref={ref} className={cn("ui-mt-0.5 ui-block ui-text-[var(--ui-text-xs)] ui-text-[var(--ui-fg-muted)]", className)} {...props} />
  )
);
ActivityTime.displayName = "ActivityTime";
