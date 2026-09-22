import * as React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { useUiContent } from "../../content";

/**
 * Drawer (a.k.a. Sheet) — a side panel built on the same Radix Dialog
 * primitive as Dialog, reusing its focus trap and dismiss behavior, with
 * slide-in positioning instead of a centered modal.
 */
export const Drawer = RadixDialog.Root;
export const DrawerTrigger = RadixDialog.Trigger;
export const DrawerClose = RadixDialog.Close;

const drawerVariants = cva(
  "ui-fixed ui-z-50 ui-flex ui-flex-col ui-bg-[var(--ui-bg)] ui-p-6 ui-shadow-[var(--ui-shadow-xl)] focus-visible:ui-outline-none",
  {
    variants: {
      side: {
        right: "ui-inset-y-0 ui-right-0 ui-h-full ui-w-full ui-max-w-sm ui-border-l ui-border-[var(--ui-border)] data-[state=open]:ui-animate-in data-[state=open]:ui-slide-in-from-right data-[state=closed]:ui-animate-out data-[state=closed]:ui-slide-out-to-right",
        left: "ui-inset-y-0 ui-left-0 ui-h-full ui-w-full ui-max-w-sm ui-border-r ui-border-[var(--ui-border)] data-[state=open]:ui-animate-in data-[state=open]:ui-slide-in-from-left data-[state=closed]:ui-animate-out data-[state=closed]:ui-slide-out-to-left",
        bottom: "ui-inset-x-0 ui-bottom-0 ui-max-h-[80vh] ui-w-full ui-border-t ui-border-[var(--ui-border)] data-[state=open]:ui-animate-in data-[state=open]:ui-slide-in-from-bottom data-[state=closed]:ui-animate-out data-[state=closed]:ui-slide-out-to-bottom",
      },
    },
    defaultVariants: { side: "right" },
  }
);

export interface DrawerContentProps
  extends React.ComponentPropsWithoutRef<typeof RadixDialog.Content>,
    VariantProps<typeof drawerVariants> {
  hideCloseButton?: boolean;
}

export const DrawerContent = React.forwardRef<React.ElementRef<typeof RadixDialog.Content>, DrawerContentProps>(
  ({ className, side, children, hideCloseButton, ...props }, ref) => {
    const content = useUiContent();
    return (
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="ui-fixed ui-inset-0 ui-z-50 ui-bg-black/50 data-[state=open]:ui-animate-in data-[state=open]:ui-fade-in data-[state=closed]:ui-animate-out data-[state=closed]:ui-fade-out" />
        <RadixDialog.Content ref={ref} className={cn(drawerVariants({ side }), className)} {...props}>
          {children}
          {!hideCloseButton && (
            <RadixDialog.Close
              className="ui-absolute ui-right-4 ui-top-4 ui-rounded-[var(--ui-radius-sm)] ui-p-1 ui-text-[var(--ui-fg-muted)] hover:ui-bg-[var(--ui-bg-subtle)] focus-visible:ui-outline-none focus-visible:ui-shadow-[var(--ui-focus-ring)]"
              aria-label={content.drawer.close}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </RadixDialog.Close>
          )}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    );
  }
);
DrawerContent.displayName = "DrawerContent";

export const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("ui-mb-4 ui-flex ui-flex-col ui-gap-1", className)} {...props} />
);
export const DrawerTitle = React.forwardRef<React.ElementRef<typeof RadixDialog.Title>, React.ComponentPropsWithoutRef<typeof RadixDialog.Title>>(
  ({ className, ...props }, ref) => (
    <RadixDialog.Title ref={ref} className={cn("ui-text-[var(--ui-text-lg)] ui-font-semibold ui-text-[var(--ui-fg)]", className)} {...props} />
  )
);
DrawerTitle.displayName = "DrawerTitle";
export const DrawerDescription = React.forwardRef<React.ElementRef<typeof RadixDialog.Description>, React.ComponentPropsWithoutRef<typeof RadixDialog.Description>>(
  ({ className, ...props }, ref) => (
    <RadixDialog.Description ref={ref} className={cn("ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg-muted)]", className)} {...props} />
  )
);
DrawerDescription.displayName = "DrawerDescription";
export const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("ui-mt-auto ui-flex ui-justify-end ui-gap-2 ui-pt-6", className)} {...props} />
);

type DrawerComponent = typeof Drawer & {
  Trigger: typeof DrawerTrigger;
  Content: typeof DrawerContent;
  Header: typeof DrawerHeader;
  Title: typeof DrawerTitle;
  Description: typeof DrawerDescription;
  Footer: typeof DrawerFooter;
  Close: typeof DrawerClose;
};
(Drawer as DrawerComponent).Trigger = DrawerTrigger;
(Drawer as DrawerComponent).Content = DrawerContent;
(Drawer as DrawerComponent).Header = DrawerHeader;
(Drawer as DrawerComponent).Title = DrawerTitle;
(Drawer as DrawerComponent).Description = DrawerDescription;
(Drawer as DrawerComponent).Footer = DrawerFooter;
(Drawer as DrawerComponent).Close = DrawerClose;
