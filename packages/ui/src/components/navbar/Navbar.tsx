import * as React from "react";
import { cn } from "../../utils/cn";
import { useControllableState } from "../../hooks";

interface NavbarContextValue {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const NavbarContext = React.createContext<NavbarContextValue | null>(null);

function useNavbarContext() {
  const ctx = React.useContext(NavbarContext);
  if (!ctx) throw new Error("Navbar subcomponents must be used within <Navbar>");
  return ctx;
}

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  /** Controlled mobile-menu open state. Omit to let Navbar manage it internally. */
  menuOpen?: boolean;
  defaultMenuOpen?: boolean;
  onMenuOpenChange?: (open: boolean) => void;
  position?: "static" | "sticky" | "fixed";
}

/**
 * Navbar — a top-level site/app header. Composition-based
 * (Navbar.Brand/Content/Item/MenuToggle/Menu), with a shared open/closed
 * context for the mobile menu so NavbarMenuToggle and NavbarMenu stay in
 * sync without prop drilling.
 */
export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className, menuOpen, defaultMenuOpen = false, onMenuOpenChange, position = "sticky", children, ...props }, ref) => {
    const [isOpen, setIsOpen] = useControllableState<boolean>({
      value: menuOpen,
      defaultValue: defaultMenuOpen,
      onChange: onMenuOpenChange,
    });

    const positionClass = {
      static: "",
      sticky: "ui-sticky ui-top-0",
      fixed: "ui-fixed ui-inset-x-0 ui-top-0",
    }[position];

    return (
      <NavbarContext.Provider value={{ menuOpen: isOpen, setMenuOpen: setIsOpen }}>
        <header
          ref={ref}
          className={cn(
            "ui-z-40 ui-flex ui-h-16 ui-w-full ui-items-center ui-border-b ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg)]",
            positionClass,
            className
          )}
          {...props}
        >
          <div className="ui-flex ui-w-full ui-items-center ui-justify-between ui-px-6">{children}</div>
        </header>
      </NavbarContext.Provider>
    );
  }
);
Navbar.displayName = "Navbar";

export const NavbarBrand = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("ui-flex ui-items-center ui-gap-2", className)} {...props} />
);
NavbarBrand.displayName = "NavbarBrand";

export const NavbarContent = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <nav ref={ref} className={cn("ui-hidden ui-items-center ui-gap-6 ui-text-[var(--ui-text-sm)] sm:ui-flex", className)} {...props} />
  )
);
NavbarContent.displayName = "NavbarContent";

export const NavbarItem = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement> & { active?: boolean }>(
  ({ className, active, children, ...props }, ref) => (
    <a
      ref={ref}
      aria-current={active ? "page" : undefined}
      className={cn(
        "ui-transition-colors",
        active ? "ui-font-medium ui-text-[var(--ui-fg)]" : "ui-text-[var(--ui-fg-muted)] hover:ui-text-[var(--ui-fg)]",
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
);
NavbarItem.displayName = "NavbarItem";

/** Hamburger button, visible only below the `sm` breakpoint — toggles the shared menuOpen state. */
export const NavbarMenuToggle = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    const { menuOpen, setMenuOpen } = useNavbarContext();
    return (
      <button
        ref={ref}
        type="button"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
        className={cn(
          "ui-inline-flex ui-h-9 ui-w-9 ui-items-center ui-justify-center ui-rounded-[var(--ui-radius-md)] ui-text-[var(--ui-fg-muted)] hover:ui-bg-[var(--ui-bg-subtle)] focus-visible:ui-outline-none focus-visible:ui-shadow-[var(--ui-focus-ring)] sm:ui-hidden",
          className
        )}
        {...props}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          {menuOpen ? (
            <path d="M4.5 4.5L13.5 13.5M13.5 4.5L4.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          ) : (
            <path d="M2.5 5H15.5M2.5 9H15.5M2.5 13H15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          )}
        </svg>
      </button>
    );
  }
);
NavbarMenuToggle.displayName = "NavbarMenuToggle";

/** Mobile dropdown panel — renders only while the shared menuOpen state is true. */
export const NavbarMenu = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { menuOpen } = useNavbarContext();
    if (!menuOpen) return null;
    return (
      <div
        ref={ref}
        className={cn(
          "ui-absolute ui-inset-x-0 ui-top-16 ui-z-30 ui-flex ui-flex-col ui-gap-1 ui-border-b ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg)] ui-p-4 ui-shadow-[var(--ui-shadow-lg)] sm:ui-hidden",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
NavbarMenu.displayName = "NavbarMenu";

export function useNavbar() {
  return useNavbarContext();
}
