import * as React from "react";
import { cn } from "../../utils/cn";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Loading placeholder. Marked aria-hidden — pair it with a visually hidden
 * "Loading…" status (see Spinner, or your own live region) so screen
 * reader users get an equivalent announcement; the shimmer itself is
 * decorative and respects prefers-reduced-motion globally.
 */
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    aria-hidden="true"
    className={cn("ui-animate-pulse ui-rounded-[var(--ui-radius-md)] ui-bg-[var(--ui-bg-muted)]", className)}
    {...props}
  />
));
Skeleton.displayName = "Skeleton";
