import * as React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { cn } from "../../utils/cn";
import { useUiContent } from "../../content";

/**
 * Dialog — modal overlay built on Radix's Dialog primitive for proven focus
 * trapping, scroll locking, and escape/outside-click handling. The library
 * wraps it so the *public* API (Dialog.Root/Trigger/Content/Header/Footer)
 * and styling are ours; Radix stays an internal implementation detail.
 */
export const Dialog = RadixDialog.Root;
export const DialogTrigger = RadixDialog.Trigger;

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Content>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Content> & { hideCloseButton?: boolean }
>(({ className, children, hideCloseButton, ...props }, ref) => {
  const content = useUiContent();
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="ui-fixed ui-inset-0 ui-z-50 ui-bg-black/50 data-[state=open]:ui-animate-in data-[state=open]:ui-fade-in data-[state=closed]:ui-animate-out data-[state=closed]:ui-fade-out" />
      <RadixDialog.Content
        ref={ref}
        className={cn(
          "ui-fixed ui-left-1/2 ui-top-1/2 ui-z-50 ui-w-full ui-max-w-md ui--translate-x-1/2 ui--translate-y-1/2",
          "ui-rounded-[var(--ui-radius-lg)] ui-border ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg)] ui-p-6 ui-shadow-[var(--ui-shadow-xl)]",
          "focus-visible:ui-outline-none",
          className
        )}
        {...props}
      >
        {children}
        {!hideCloseButton && (
          <RadixDialog.Close
            className="ui-absolute ui-right-4 ui-top-4 ui-rounded-[var(--ui-radius-sm)] ui-p-1 ui-text-[var(--ui-fg-muted)] hover:ui-bg-[var(--ui-bg-subtle)] focus-visible:ui-outline-none focus-visible:ui-shadow-[var(--ui-focus-ring)]"
            aria-label={content.dialog.close}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </RadixDialog.Close>
        )}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
});
DialogContent.displayName = "DialogContent";

export const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("ui-mb-4 ui-flex ui-flex-col ui-gap-1", className)} {...props} />
);

export const DialogTitle = React.forwardRef<React.ElementRef<typeof RadixDialog.Title>, React.ComponentPropsWithoutRef<typeof RadixDialog.Title>>(
  ({ className, ...props }, ref) => (
    <RadixDialog.Title ref={ref} className={cn("ui-text-[var(--ui-text-lg)] ui-font-semibold ui-text-[var(--ui-fg)]", className)} {...props} />
  )
);
DialogTitle.displayName = "DialogTitle";

export const DialogDescription = React.forwardRef<React.ElementRef<typeof RadixDialog.Description>, React.ComponentPropsWithoutRef<typeof RadixDialog.Description>>(
  ({ className, ...props }, ref) => (
    <RadixDialog.Description ref={ref} className={cn("ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg-muted)]", className)} {...props} />
  )
);
DialogDescription.displayName = "DialogDescription";

export const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("ui-mt-6 ui-flex ui-justify-end ui-gap-2", className)} {...props} />
);

export const DialogClose = RadixDialog.Close;

type DialogComponent = typeof Dialog & {
  Trigger: typeof DialogTrigger;
  Content: typeof DialogContent;
  Header: typeof DialogHeader;
  Title: typeof DialogTitle;
  Description: typeof DialogDescription;
  Footer: typeof DialogFooter;
  Close: typeof DialogClose;
};

(Dialog as DialogComponent).Trigger = DialogTrigger;
(Dialog as DialogComponent).Content = DialogContent;
(Dialog as DialogComponent).Header = DialogHeader;
(Dialog as DialogComponent).Title = DialogTitle;
(Dialog as DialogComponent).Description = DialogDescription;
(Dialog as DialogComponent).Footer = DialogFooter;
(Dialog as DialogComponent).Close = DialogClose;
