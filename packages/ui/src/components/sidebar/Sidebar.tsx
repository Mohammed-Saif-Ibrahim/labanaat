import * as React from "react";
import { cn } from "../../utils/cn";
import { useControllableState } from "../../hooks";

interface SidebarContextValue {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

function useSidebarContext() {
  const ctx = React.useContext(SidebarContext);
  if (!ctx) throw new Error("Sidebar subcomponents must be used within <Sidebar>");
  return ctx;
}

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** Controlled collapsed state. Omit to let Sidebar manage it internally. */
  collapsed?: boolean;
  /** Initial collapsed state when uncontrolled. */
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Width when expanded. Accepts any CSS length. */
  width?: string;
  /** Width when collapsed (icon-only) mode. */
  collapsedWidth?: string;
}

/**
 * Sidebar — a persistent navigation column for dashboards and admin
 * layouts. Pure composition (Sidebar.Header/Content/Footer/Group/Menu),
 * like Card and Drawer, with a shared collapsed/expanded state context so
 * SidebarMenuButton and friends can adapt (hide labels, show tooltips)
 * without each consumer re-deriving that logic.
 *
 * Responsive by default: hidden below the `md` breakpoint unless toggled
 * open via SidebarTrigger, which renders a Sheet-like overlay on small
 * screens instead of pushing content.
 */
export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      className,
      collapsed,
      defaultCollapsed = false,
      onCollapsedChange,
      width = "16rem",
      collapsedWidth = "4rem",
      style,
      children,
      ...props
    },
    ref
  ) => {
    const [isCollapsed, setIsCollapsed] = useControllableState<boolean>({
      value: collapsed,
      defaultValue: defaultCollapsed,
      onChange: onCollapsedChange,
    });

    return (
      <SidebarContext.Provider value={{ collapsed: isCollapsed, setCollapsed: setIsCollapsed }}>
        <aside
          ref={ref}
          data-collapsed={isCollapsed || undefined}
          className={cn(
            "ui-fixed ui-inset-y-0 ui-left-0 ui-z-30 ui-hidden ui-flex-col ui-border-r ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg)] ui-transition-[width] ui-duration-[var(--ui-duration-slow)] ui-ease-[var(--ui-easing-standard)] md:ui-flex",
            className
          )}
          style={{ width: isCollapsed ? collapsedWidth : width, ...style }}
          {...props}
        >
          {children}
        </aside>
      </SidebarContext.Provider>
    );
  }
);
Sidebar.displayName = "Sidebar";

export const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("ui-flex ui-h-16 ui-shrink-0 ui-items-center ui-gap-2 ui-overflow-hidden ui-border-b ui-border-[var(--ui-border)] ui-px-4", className)} {...props} />
  )
);
SidebarHeader.displayName = "SidebarHeader";

/** Collapse-aware text for inside SidebarHeader (e.g. a workspace/company name) — fades out cleanly on collapse instead of being abruptly clipped by SidebarHeader's overflow-hidden, matching SidebarGroupLabel's pattern. */
export const SidebarHeaderTitle = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => {
    const { collapsed } = useSidebarContext();
    return (
      <span
        ref={ref}
        className={cn(
          "ui-truncate ui-font-semibold ui-text-[var(--ui-fg)] ui-transition-opacity",
          collapsed && "ui-opacity-0",
          className
        )}
        {...props}
      />
    );
  }
);
SidebarHeaderTitle.displayName = "SidebarHeaderTitle";

export const SidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("ui-flex ui-flex-1 ui-flex-col ui-gap-1 ui-overflow-y-auto ui-overflow-x-hidden ui-p-3", className)} {...props} />
  )
);
SidebarContent.displayName = "SidebarContent";

export const SidebarFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("ui-mt-auto ui-shrink-0 ui-overflow-hidden ui-border-t ui-border-[var(--ui-border)] ui-p-3", className)} {...props} />
  )
);
SidebarFooter.displayName = "SidebarFooter";

export const SidebarGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("ui-flex ui-flex-col ui-gap-0.5", className)} {...props} />
);
SidebarGroup.displayName = "SidebarGroup";

export const SidebarGroupLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { collapsed } = useSidebarContext();
    return (
      <div
        ref={ref}
        className={cn(
          "ui-mb-1 ui-truncate ui-px-2 ui-text-[var(--ui-text-xs)] ui-font-medium ui-uppercase ui-tracking-wide ui-text-[var(--ui-fg-muted)] ui-transition-opacity",
          collapsed && "ui-opacity-0",
          className
        )}
        {...props}
      />
    );
  }
);
SidebarGroupLabel.displayName = "SidebarGroupLabel";

export const SidebarMenu = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  ({ className, ...props }, ref) => <ul ref={ref} className={cn("ui-flex ui-flex-col ui-gap-0.5", className)} {...props} />
);
SidebarMenu.displayName = "SidebarMenu";

export const SidebarMenuItem = React.forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => <li ref={ref} className={className} {...props} />
);
SidebarMenuItem.displayName = "SidebarMenuItem";

export interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  active?: boolean;
  asChild?: boolean;
}

/** A single nav row. When the sidebar is collapsed, the label is visually hidden (icon-only) but stays in the accessibility tree via aria-label. */
export const SidebarMenuButton = React.forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
  ({ className, icon, active, children, ...props }, ref) => {
    const { collapsed } = useSidebarContext();
    const label = typeof children === "string" ? children : undefined;
    return (
      <button
        ref={ref}
        type="button"
        aria-current={active ? "page" : undefined}
        aria-label={collapsed ? label : undefined}
        title={collapsed ? label : undefined}
        className={cn(
          "ui-flex ui-w-full ui-items-center ui-gap-2.5 ui-overflow-hidden ui-rounded-[var(--ui-radius-md)] ui-px-2.5 ui-py-2 ui-text-[var(--ui-text-sm)] ui-transition-colors",
          "focus-visible:ui-outline-none focus-visible:ui-shadow-[var(--ui-focus-ring)]",
          active
            ? "ui-bg-[color-mix(in_srgb,var(--ui-primary)_12%,transparent)] ui-font-medium ui-text-[var(--ui-primary)]"
            : "ui-text-[var(--ui-fg-muted)] hover:ui-bg-[var(--ui-bg-subtle)] hover:ui-text-[var(--ui-fg)]",
          className
        )}
        {...props}
      >
        {icon && <span className="ui-shrink-0" aria-hidden="true">{icon}</span>}
        <span className={cn("ui-truncate ui-transition-opacity", collapsed && "ui-w-0 ui-opacity-0")}>{children}</span>
      </button>
    );
  }
);
SidebarMenuButton.displayName = "SidebarMenuButton";

export interface SidebarTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

/** Toggles collapsed state. Place anywhere — inside the sidebar itself, or in a page's top bar. */
export const SidebarTrigger = React.forwardRef<HTMLButtonElement, SidebarTriggerProps>(
  ({ className, label = "Toggle sidebar", ...props }, ref) => {
    const { collapsed, setCollapsed } = useSidebarContext();
    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        aria-pressed={collapsed}
        onClick={() => setCollapsed(!collapsed)}
        className={cn(
          "ui-inline-flex ui-h-8 ui-w-8 ui-shrink-0 ui-items-center ui-justify-center ui-rounded-[var(--ui-radius-md)] ui-text-[var(--ui-fg-muted)] hover:ui-bg-[var(--ui-bg-subtle)] hover:ui-text-[var(--ui-fg)] focus-visible:ui-outline-none focus-visible:ui-shadow-[var(--ui-focus-ring)]",
          className
        )}
        {...props}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M2 4H14M2 8H14M2 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    );
  }
);
SidebarTrigger.displayName = "SidebarTrigger";

export function useSidebar() {
  return useSidebarContext();
}
