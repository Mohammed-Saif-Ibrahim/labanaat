"use client";

import { useState, useEffect, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navSections = [
  {
    label: "Getting started",
    links: [
      { href: "/docs/introduction", label: "Introduction" },
      { href: "/docs/installation", label: "Installation" },
      { href: "/docs/theming", label: "Theming" },
      { href: "/docs/accessibility", label: "Accessibility" },
      { href: "/docs/localization", label: "Localization" },
    ],
  },
  {
    label: "Foundational",
    links: [
      { href: "/docs/components/button", label: "Button" },
      { href: "/docs/components/badge", label: "Badge" },
      { href: "/docs/components/avatar", label: "Avatar" },
      { href: "/docs/components/spinner", label: "Spinner" },
      { href: "/docs/components/card", label: "Card" },
      { href: "/docs/components/alert", label: "Alert" },
      { href: "/docs/components/skeleton", label: "Skeleton" },
      { href: "/docs/components/separator", label: "Separator" },
    ],
  },
  {
    label: "Form",
    links: [
      { href: "/docs/components/input", label: "Input" },
      { href: "/docs/components/textarea", label: "Textarea" },
      { href: "/docs/components/checkbox", label: "Checkbox" },
      { href: "/docs/components/switch", label: "Switch" },
      { href: "/docs/components/radio-group", label: "RadioGroup" },
      { href: "/docs/components/select", label: "Select" },
      { href: "/docs/components/combobox", label: "Combobox" },
      { href: "/docs/components/date-picker", label: "DatePicker" },
      { href: "/docs/components/slider", label: "Slider" },
      { href: "/docs/components/file-upload", label: "FileUpload" },
    ],
  },
  {
    label: "Navigation",
    links: [
      { href: "/docs/components/tabs", label: "Tabs" },
      { href: "/docs/components/pagination", label: "Pagination" },
      { href: "/docs/components/breadcrumbs", label: "Breadcrumbs" },
      { href: "/docs/components/accordion", label: "Accordion" },
    ],
  },
  {
    label: "Overlay",
    links: [
      { href: "/docs/components/dialog", label: "Dialog" },
      { href: "/docs/components/drawer", label: "Drawer" },
      { href: "/docs/components/popover", label: "Popover" },
      { href: "/docs/components/tooltip", label: "Tooltip" },
      { href: "/docs/components/dropdown-menu", label: "DropdownMenu" },
    ],
  },
  {
    label: "Feedback & data",
    links: [
      { href: "/docs/components/toast", label: "Toast" },
      { href: "/docs/components/progress-bar", label: "ProgressBar" },
      { href: "/docs/components/empty-state", label: "EmptyState" },
      { href: "/docs/components/table", label: "Table" },
    ],
  },
  {
    label: "Application",
    links: [
      { href: "/docs/components/sidebar", label: "Sidebar" },
      { href: "/docs/components/navbar", label: "Navbar" },
      { href: "/docs/components/navigation-menu", label: "NavigationMenu" },
      { href: "/docs/components/stepper", label: "Stepper" },
      { href: "/docs/components/timeline", label: "Timeline" },
      { href: "/docs/components/command-palette", label: "CommandPalette" },
      { href: "/docs/components/data-table", label: "DataTable" },
      { href: "/docs/components/carousel", label: "Carousel" },
      { href: "/docs/components/calendar", label: "Calendar" },
      { href: "/docs/components/metric", label: "Metric" },
    ],
  },
  {
    label: "Advanced",
    links: [
      { href: "/docs/components/kanban", label: "Kanban" },
      { href: "/docs/components/filter-builder", label: "FilterBuilder" },
      { href: "/docs/components/activity-feed", label: "ActivityFeed" },
      { href: "/docs/components/file-manager", label: "FileManager" },
      { href: "/docs/components/data-grid", label: "DataGrid" },
      { href: "/docs/components/chart", label: "Chart" },
    ],
  },
];

/**
 * Fixed, independently-scrolling sidebar pinned to the true left edge of
 * the viewport (not just "leftmost inside a centered content column") —
 * so it never drifts as the article content scrolls, regardless of how
 * long a given docs page is.
 */
export default function DocsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Close the mobile nav automatically on route change, so navigating
  // to a new docs page doesn't leave the overlay sitting open on top of it.
  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  return (
    <div className="ui-flex">
      {mobileNavOpen && (
        <div
          aria-hidden="true"
          onClick={() => setMobileNavOpen(false)}
          className="ui-fixed ui-inset-0 ui-top-16 ui-z-30 ui-bg-black/50 md:ui-hidden"
        />
      )}
      <nav
        className={
          "ui-fixed ui-inset-y-0 ui-left-0 ui-top-16 ui-z-40 ui-flex ui-w-72 ui-flex-col ui-gap-6 ui-overflow-y-auto ui-border-r ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg)] ui-px-6 ui-py-8 ui-transition-transform ui-duration-[var(--ui-duration-base)] md:ui-w-64 md:ui-translate-x-0 " +
          (mobileNavOpen ? "ui-translate-x-0" : "ui--translate-x-full md:ui-translate-x-0")
        }
        style={{ height: "calc(100vh - 4rem)" }}
      >
        {navSections.map((section) => (
          <div key={section.label}>
            <div className="ui-mb-2 ui-text-[var(--ui-text-xs)] ui-font-medium ui-uppercase ui-tracking-wide ui-text-[var(--ui-fg-muted)]">
              {section.label}
            </div>
            <ul className="ui-flex ui-flex-col ui-gap-0.5">
              {section.links.map((link) => {
                const active = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={
                        "ui-block ui-rounded-[var(--ui-radius-sm)] ui-px-2.5 ui-py-1.5 ui-text-[var(--ui-text-sm)] ui-transition-colors " +
                        (active
                          ? "ui-bg-[color-mix(in_srgb,var(--ui-primary)_10%,transparent)] ui-font-medium ui-text-[var(--ui-primary)]"
                          : "ui-text-[var(--ui-fg-muted)] hover:ui-bg-[var(--ui-bg-subtle)] hover:ui-text-[var(--ui-fg)]")
                      }
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      <article className="ui-min-w-0 ui-flex-1 ui-px-6 ui-py-12 md:ui-ml-64">
        <button
          type="button"
          onClick={() => setMobileNavOpen(true)}
          aria-label="Open docs navigation"
          className="ui-mb-6 ui-inline-flex ui-items-center ui-gap-2 ui-rounded-[var(--ui-radius-md)] ui-border ui-border-[var(--ui-border)] ui-px-3 ui-py-1.5 ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg-muted)] hover:ui-text-[var(--ui-fg)] md:ui-hidden"
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
            <path d="M2 4H13M2 7.5H13M2 11H13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          Menu
        </button>
        <div className="ui-mx-auto ui-max-w-3xl ui-pb-24">{children}</div>
      </article>
    </div>
  );
}
