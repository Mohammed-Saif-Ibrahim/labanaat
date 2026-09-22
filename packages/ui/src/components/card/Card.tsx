import * as React from "react";
import { cn } from "../../utils/cn";

/**
 * Card — a composable container built from slot subcomponents
 * (Card.Header, Card.Title, Card.Description, Card.Content, Card.Footer)
 * rather than a monolithic props API. Compose only the parts you need.
 */
export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "ui-rounded-[var(--ui-radius-lg)] ui-border ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg)] ui-shadow-[var(--ui-shadow-sm)]",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("ui-flex ui-flex-col ui-gap-1.5 ui-p-6", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h3 ref={ref} className={cn("ui-text-[var(--ui-text-lg)] ui-font-semibold ui-leading-[var(--ui-leading-tight)]", className)} {...props}>
      {children}
    </h3>
  )
);
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg-muted)]", className)} {...props} />
  )
);
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("ui-p-6 ui-pt-0", className)} {...props} />
);
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("ui-flex ui-items-center ui-p-6 ui-pt-0", className)} {...props} />
  )
);
CardFooter.displayName = "CardFooter";

// Attach subcomponents so consumers can use the compound pattern:
// <Card><Card.Header><Card.Title>…</Card.Title></Card.Header></Card>
// The individual named exports remain available for direct imports.
type CardComponent = typeof Card & {
  Header: typeof CardHeader;
  Title: typeof CardTitle;
  Description: typeof CardDescription;
  Content: typeof CardContent;
  Footer: typeof CardFooter;
};

(Card as CardComponent).Header = CardHeader;
(Card as CardComponent).Title = CardTitle;
(Card as CardComponent).Description = CardDescription;
(Card as CardComponent).Content = CardContent;
(Card as CardComponent).Footer = CardFooter;
