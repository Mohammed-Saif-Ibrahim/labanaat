"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar, SidebarHeader, SidebarHeaderTitle, SidebarContent, SidebarFooter,
  SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger,
} from "@labanaat/ui/sidebar";
import { Navbar } from "@labanaat/ui/navbar";
import { Avatar } from "@labanaat/ui/avatar";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@labanaat/ui/drawer";
import { SourceViewer, type SourceFile } from "./source-viewer";

export interface TemplateNavGroup {
  label: string;
  items: { href: string; label: string; icon: React.ReactNode }[];
}

const MenuIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2 4.5H14M2 8H14M2 11.5H14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

/**
 * Shared app-shell (fixed Sidebar + top bar) for every template — each
 * template supplies its own product name/letter/accent and nav structure,
 * but the layout mechanics (collapse, active-route highlighting, content
 * offset, mobile navigation) live here once instead of being rebuilt
 * three times.
 *
 * The desktop Sidebar hides itself below `md` by design (the standard
 * app-shell pattern — a persistent rail doesn't fit a phone-width
 * viewport). Below `md`, a hamburger button in the top bar opens the same
 * nav content in a Drawer instead. It's genuinely the same nav data
 * (`navGroups`), rendered twice with different presentation, not two
 * separate navs to keep in sync by hand.
 */
export function TemplateShell({
  productName,
  productLetter,
  accent,
  navGroups,
  userName,
  sourceFiles,
  children,
}: {
  productName: string;
  productLetter: string;
  /** [primary, hover, active] — each template gets its own fixed brand triad, independent of the main site's color picker, so it reads as its own product. */
  accent: [string, string, string];
  navGroups: TemplateNavGroup[];
  userName: string;
  sourceFiles: SourceFile[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [primary, hover, active] = accent;
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  // Close the mobile drawer automatically on route change.
  React.useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  return (
    <div
      className="ui-flex ui-min-h-screen"
      style={{
        ["--ui-primary" as string]: primary,
        ["--ui-primary-hover" as string]: hover,
        ["--ui-primary-active" as string]: active,
        ["--ui-ring" as string]: primary,
      }}
    >
      <Sidebar collapsed={collapsed} onCollapsedChange={setCollapsed}>
        <SidebarHeader>
          <SidebarTrigger />
          <Link
            href="/templates"
            className={`ui-flex ui-min-w-0 ui-items-center ui-gap-2 ui-overflow-hidden ui-transition-[opacity,width] ui-duration-[var(--ui-duration-slow)] ${collapsed ? "ui-w-0 ui-opacity-0" : ""}`}
          >
            <span className="ui-flex ui-h-6 ui-w-6 ui-shrink-0 ui-items-center ui-justify-center ui-rounded-[var(--ui-radius-md)] ui-bg-[var(--ui-primary)] ui-font-mono ui-text-[11px] ui-font-semibold ui-text-white">
              {productLetter}
            </span>
            <SidebarHeaderTitle>{productName}</SidebarHeaderTitle>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          {navGroups.map((group) => (
            <SidebarGroup key={group.label}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <Link href={item.href}>
                      <SidebarMenuButton active={pathname === item.href} icon={item.icon}>
                        {item.label}
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarFooter>
          <div className="ui-flex ui-items-center ui-gap-2">
            <Avatar name={userName} size="sm" />
            <span className="ui-truncate ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg)]">{userName}</span>
          </div>
        </SidebarFooter>
      </Sidebar>

      <div
        className={`ui-flex ui-min-w-0 ui-flex-1 ui-flex-col ui-transition-[margin-left] ui-duration-[var(--ui-duration-slow)] ${collapsed ? "md:ui-ml-16" : "md:ui-ml-64"}`}
      >
        <Navbar position="sticky" className="ui-border-b ui-border-[var(--ui-border)]">
          <div className="ui-flex ui-items-center ui-gap-3">
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open navigation"
              className="ui-inline-flex ui-h-8 ui-w-8 ui-items-center ui-justify-center ui-rounded-[var(--ui-radius-md)] ui-text-[var(--ui-fg-muted)] hover:ui-bg-[var(--ui-bg-subtle)] hover:ui-text-[var(--ui-fg)] focus-visible:ui-outline-none focus-visible:ui-shadow-[var(--ui-focus-ring)] md:ui-hidden"
            >
              <MenuIcon />
            </button>
            <Link href="/templates" className="ui-flex ui-shrink-0 ui-items-center ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg-muted)] hover:ui-text-[var(--ui-fg)]">
              <span aria-hidden="true">←</span>
              <span className="ui-ml-1.5 ui-hidden sm:ui-inline">Back to Labanaat UI</span>
              <span className="ui-ml-1.5 sm:ui-hidden">Back</span>
            </Link>
          </div>
          <SourceViewer files={sourceFiles} />
        </Navbar>
        <main className="ui-flex-1 ui-min-w-0 ui-overflow-x-hidden ui-p-4 sm:ui-p-6 md:ui-p-8">{children}</main>
      </div>

      <Drawer open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <DrawerContent side="left" className="ui-flex ui-w-72 ui-flex-col ui-p-0">
          <DrawerHeader className="ui-flex ui-flex-row ui-items-center ui-gap-2 ui-space-y-0 ui-border-b ui-border-[var(--ui-border)] ui-px-4 ui-py-4">
            <span className="ui-flex ui-h-6 ui-w-6 ui-shrink-0 ui-items-center ui-justify-center ui-rounded-[var(--ui-radius-md)] ui-bg-[var(--ui-primary)] ui-font-mono ui-text-[11px] ui-font-semibold ui-text-white">
              {productLetter}
            </span>
            <DrawerTitle className="ui-text-[var(--ui-text-base)]">{productName}</DrawerTitle>
          </DrawerHeader>
          <nav className="ui-flex ui-flex-1 ui-flex-col ui-gap-6 ui-overflow-y-auto ui-p-4">
            {navGroups.map((group) => (
              <div key={group.label}>
                <div className="ui-mb-1 ui-px-2.5 ui-text-[var(--ui-text-xs)] ui-font-medium ui-uppercase ui-tracking-wide ui-text-[var(--ui-fg-muted)]">
                  {group.label}
                </div>
                <div className="ui-flex ui-flex-col ui-gap-0.5">
                  {group.items.map((item) => {
                    const itemActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        aria-current={itemActive ? "page" : undefined}
                        className={
                          "ui-flex ui-items-center ui-gap-2.5 ui-rounded-[var(--ui-radius-md)] ui-px-2.5 ui-py-2 ui-text-[var(--ui-text-sm)] " +
                          (itemActive
                            ? "ui-bg-[color-mix(in_srgb,var(--ui-primary)_12%,transparent)] ui-font-medium ui-text-[var(--ui-primary)]"
                            : "ui-text-[var(--ui-fg-muted)] hover:ui-bg-[var(--ui-bg-subtle)] hover:ui-text-[var(--ui-fg)]")
                        }
                      >
                        <span aria-hidden="true">{item.icon}</span>
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
