import * as React from "react";

/** Hides content visually while keeping it in the accessibility tree. */
export const VisuallyHidden = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span ref={ref} className={`ui-visually-hidden ${className ?? ""}`} {...props} />
  )
);
VisuallyHidden.displayName = "VisuallyHidden";
