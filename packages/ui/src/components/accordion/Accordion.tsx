import * as React from "react";
import * as RadixAccordion from "@radix-ui/react-accordion";
import { cn } from "../../utils/cn";

/**
 * Accordion — collapsible sections, built on Radix's Accordion primitive
 * for correct single/multiple expansion modes and keyboard navigation
 * between triggers (Home/End/Arrow keys).
 */
export const Accordion = RadixAccordion.Root;

export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof RadixAccordion.Item>,
  React.ComponentPropsWithoutRef<typeof RadixAccordion.Item>
>(({ className, ...props }, ref) => (
  <RadixAccordion.Item ref={ref} className={cn("ui-border-b ui-border-[var(--ui-border)]", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="ui-shrink-0 ui-transition-transform ui-duration-[var(--ui-duration-base)] group-data-[state=open]:ui-rotate-180">
    <path d="M3 5.5L7 9.5L11 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof RadixAccordion.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixAccordion.Trigger>
>(({ className, children, ...props }, ref) => (
  <RadixAccordion.Header className="ui-flex">
    <RadixAccordion.Trigger
      ref={ref}
      className={cn(
        "ui-group ui-flex ui-flex-1 ui-items-center ui-justify-between ui-gap-2 ui-py-4 ui-text-left ui-text-[var(--ui-text-sm)] ui-font-medium ui-text-[var(--ui-fg)]",
        "focus-visible:ui-outline-none focus-visible:ui-shadow-[var(--ui-focus-ring)]",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown />
    </RadixAccordion.Trigger>
  </RadixAccordion.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof RadixAccordion.Content>,
  React.ComponentPropsWithoutRef<typeof RadixAccordion.Content>
>(({ className, children, ...props }, ref) => (
  <RadixAccordion.Content
    ref={ref}
    className={cn(
      "ui-overflow-hidden ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg-muted)]",
      "data-[state=open]:ui-animate-accordion-down data-[state=closed]:ui-animate-accordion-up"
    )}
    {...props}
  >
    <div className={cn("ui-pb-4", className)}>{children}</div>
  </RadixAccordion.Content>
));
AccordionContent.displayName = "AccordionContent";

type AccordionComponent = typeof Accordion & {
  Item: typeof AccordionItem;
  Trigger: typeof AccordionTrigger;
  Content: typeof AccordionContent;
};
(Accordion as AccordionComponent).Item = AccordionItem;
(Accordion as AccordionComponent).Trigger = AccordionTrigger;
(Accordion as AccordionComponent).Content = AccordionContent;
