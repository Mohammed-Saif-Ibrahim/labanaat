import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "../../utils/cn";
import { useControllableState } from "../../hooks";

export interface CommandPaletteProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** When set (e.g. "k"), pressing Cmd/Ctrl+<key> toggles the palette open — the standard "⌘K" pattern. */
  shortcut?: string;
  label?: string;
  children: React.ReactNode;
}

/**
 * CommandPalette — a searchable, keyboard-first command/navigation
 * overlay, built on `cmdk` (no accessible Radix primitive exists for
 * this pattern, the same situation as Combobox). The public API is
 * Labanaat's own — CommandPalette/CommandInput/CommandList/etc. — cmdk
 * is an internal implementation detail, same as Radix elsewhere in the
 * library.
 */
export function CommandPalette({ open, defaultOpen = false, onOpenChange, shortcut, label = "Command palette", children }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useControllableState<boolean>({ value: open, defaultValue: defaultOpen, onChange: onOpenChange });

  React.useEffect(() => {
    if (!shortcut) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key.toLowerCase() === shortcut!.toLowerCase() && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [shortcut, isOpen, setIsOpen]);

  if (!isOpen) return null;

  return (
    <div className="ui-fixed ui-inset-0 ui-z-50 ui-flex ui-items-start ui-justify-center ui-pt-[15vh]">
      <div
        aria-hidden="true"
        className="ui-fixed ui-inset-0 ui-bg-black/50 data-[state=open]:ui-animate-in data-[state=open]:ui-fade-in"
        onClick={() => setIsOpen(false)}
      />
      <CommandPrimitive
        label={label}
        className="ui-relative ui-z-10 ui-w-full ui-max-w-lg ui-overflow-hidden ui-rounded-[var(--ui-radius-lg)] ui-border ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg)] ui-shadow-[var(--ui-shadow-xl)]"
      >
        {children}
      </CommandPrimitive>
    </div>
  );
}

export const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="ui-flex ui-items-center ui-gap-2 ui-border-b ui-border-[var(--ui-border)] ui-px-4">
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true" className="ui-shrink-0 ui-text-[var(--ui-fg-muted)]">
      <path d="M6.5 11a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM13 13l-3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "ui-h-12 ui-w-full ui-bg-transparent ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg)] ui-outline-none placeholder:ui-text-[var(--ui-fg-muted)]",
        className
      )}
      {...props}
    />
  </div>
));
CommandInput.displayName = "CommandInput";

export const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List ref={ref} className={cn("ui-max-h-80 ui-overflow-y-auto ui-p-2", className)} {...props} />
));
CommandList.displayName = "CommandList";

export const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty ref={ref} className="ui-py-8 ui-text-center ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg-muted)]" {...props} />
));
CommandEmpty.displayName = "CommandEmpty";

export const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "ui-mb-1 [&_[cmdk-group-heading]]:ui-px-2 [&_[cmdk-group-heading]]:ui-py-1.5 [&_[cmdk-group-heading]]:ui-text-[var(--ui-text-xs)] [&_[cmdk-group-heading]]:ui-font-medium [&_[cmdk-group-heading]]:ui-uppercase [&_[cmdk-group-heading]]:ui-tracking-wide [&_[cmdk-group-heading]]:ui-text-[var(--ui-fg-muted)]",
      className
    )}
    {...props}
  />
));
CommandGroup.displayName = "CommandGroup";

export const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "ui-flex ui-cursor-pointer ui-items-center ui-gap-2 ui-rounded-[var(--ui-radius-sm)] ui-px-2 ui-py-2 ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg)] ui-outline-none",
      "data-[selected=true]:ui-bg-[color-mix(in_srgb,var(--ui-primary)_10%,transparent)] data-[selected=true]:ui-text-[var(--ui-primary)]",
      "data-[disabled=true]:ui-opacity-50",
      className
    )}
    {...props}
  />
));
CommandItem.displayName = "CommandItem";

export const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator ref={ref} className={cn("ui-my-1 ui-h-px ui-bg-[var(--ui-border)]", className)} {...props} />
));
CommandSeparator.displayName = "CommandSeparator";

export function CommandShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("ui-ml-auto ui-rounded ui-border ui-border-[var(--ui-border)] ui-px-1.5 ui-py-0.5 ui-font-mono ui-text-[10px] ui-text-[var(--ui-fg-muted)]", className)}
      {...props}
    />
  );
}
