import * as React from "react";
import { cn } from "../../utils/cn";
import { useUiContent } from "../../content";

export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

/** Placeholder for empty lists/collections. Composable action slot accepts any Button/Link. */
export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon, title, description, action, ...props }, ref) => {
    const content = useUiContent();
    return (
      <div
        ref={ref}
        className={cn("ui-flex ui-flex-col ui-items-center ui-gap-3 ui-py-12 ui-text-center", className)}
        {...props}
      >
        {icon && <div aria-hidden="true" className="ui-text-[var(--ui-fg-muted)]">{icon}</div>}
        <div className="ui-flex ui-flex-col ui-gap-1">
          <p className="ui-text-[var(--ui-text-base)] ui-font-medium ui-text-[var(--ui-fg)]">{title ?? content.emptyState.defaultTitle}</p>
          {description && <p className="ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg-muted)]">{description}</p>}
        </div>
        {action}
      </div>
    );
  }
);
EmptyState.displayName = "EmptyState";
