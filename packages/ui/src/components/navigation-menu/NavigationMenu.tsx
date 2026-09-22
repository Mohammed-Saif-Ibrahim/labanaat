import * as React from "react";
import * as RadixNavMenu from "@radix-ui/react-navigation-menu";
import { cn } from "../../utils/cn";

/**
 * NavigationMenu — for complex marketing/docs site nav with flyout
 * content (link lists, "mega menu" rich panels, etc.), built on Radix's
 * Navigation Menu primitive for correct hover/focus/keyboard flyout
 * behavior. A "mega menu" is just NavigationMenuContent holding a richer
 * layout — there's no separate component to maintain for that pattern.
 */
export const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof RadixNavMenu.Root>,
  React.ComponentPropsWithoutRef<typeof RadixNavMenu.Root>
>(({ className, children, ...props }, ref) => (
  <RadixNavMenu.Root ref={ref} className={cn("ui-relative ui-z-30 ui-flex ui-max-w-max ui-flex-1 ui-items-center ui-justify-center", className)} {...props}>
    {children}
    <NavigationMenuViewport />
  </RadixNavMenu.Root>
));
NavigationMenu.displayName = "NavigationMenu";

export const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof RadixNavMenu.List>,
  React.ComponentPropsWithoutRef<typeof RadixNavMenu.List>
>(({ className, ...props }, ref) => (
  <RadixNavMenu.List ref={ref} className={cn("ui-flex ui-list-none ui-items-center ui-gap-1", className)} {...props} />
));
NavigationMenuList.displayName = "NavigationMenuList";

export const NavigationMenuItem = RadixNavMenu.Item;

const triggerStyles =
  "ui-inline-flex ui-h-9 ui-items-center ui-gap-1 ui-rounded-[var(--ui-radius-md)] ui-px-3 ui-text-[var(--ui-text-sm)] ui-font-medium ui-text-[var(--ui-fg-muted)] ui-transition-colors hover:ui-bg-[var(--ui-bg-subtle)] hover:ui-text-[var(--ui-fg)] focus-visible:ui-outline-none focus-visible:ui-shadow-[var(--ui-focus-ring)] data-[state=open]:ui-bg-[var(--ui-bg-subtle)] data-[state=open]:ui-text-[var(--ui-fg)]";

const ChevronDown = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" className="ui-transition-transform ui-duration-[var(--ui-duration-base)] group-data-[state=open]:ui-rotate-180">
    <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof RadixNavMenu.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixNavMenu.Trigger>
>(({ className, children, ...props }, ref) => (
  <RadixNavMenu.Trigger ref={ref} className={cn(triggerStyles, "ui-group", className)} {...props}>
    {children}
    <ChevronDown />
  </RadixNavMenu.Trigger>
));
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

export const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof RadixNavMenu.Content>,
  React.ComponentPropsWithoutRef<typeof RadixNavMenu.Content>
>(({ className, ...props }, ref) => (
  <RadixNavMenu.Content
    ref={ref}
    className={cn(
      "ui-left-0 ui-top-0 ui-w-full data-[motion^=from-]:ui-animate-in data-[motion^=to-]:ui-animate-out data-[motion^=from-]:ui-fade-in data-[motion^=to-]:ui-fade-out sm:ui-w-auto",
      className
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = "NavigationMenuContent";

/** A plain link inside the menu — either a top-level item (no flyout) or a row inside NavigationMenuContent. */
export const NavigationMenuLink = React.forwardRef<
  React.ElementRef<typeof RadixNavMenu.Link>,
  React.ComponentPropsWithoutRef<typeof RadixNavMenu.Link> & { active?: boolean }
>(({ className, active, ...props }, ref) => (
  <RadixNavMenu.Link
    ref={ref}
    active={active}
    className={cn(
      triggerStyles,
      "ui-block ui-w-full ui-no-underline data-[active]:ui-bg-[color-mix(in_srgb,var(--ui-primary)_10%,transparent)] data-[active]:ui-text-[var(--ui-primary)]",
      className
    )}
    {...props}
  />
));
NavigationMenuLink.displayName = "NavigationMenuLink";

export const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof RadixNavMenu.Viewport>,
  React.ComponentPropsWithoutRef<typeof RadixNavMenu.Viewport>
>(({ className, ...props }, ref) => (
  <div className="ui-absolute ui-left-0 ui-top-full ui-flex ui-justify-center">
    <RadixNavMenu.Viewport
      ref={ref}
      className={cn(
        "ui-relative ui-mt-1.5 ui-h-[var(--radix-navigation-menu-viewport-height)] ui-w-full ui-overflow-hidden ui-rounded-[var(--ui-radius-lg)] ui-border ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg)] ui-shadow-[var(--ui-shadow-lg)] ui-transition-[width,height] ui-duration-[var(--ui-duration-base)] data-[state=open]:ui-animate-in data-[state=closed]:ui-animate-out data-[state=open]:ui-fade-in data-[state=closed]:ui-fade-out sm:ui-w-[var(--radix-navigation-menu-viewport-width)]",
        className
      )}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName = "NavigationMenuViewport";
