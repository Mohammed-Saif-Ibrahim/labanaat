"use client";

import * as React from "react";
import Link from "next/link";
import { Github } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { ColorPicker } from "./color-picker";

const navLinks = [
  { href: "/docs/components", label: "Components" },
  { href: "/templates", label: "Templates" },
  { href: "/docs/introduction", label: "Docs" },
];

const MenuIcon = ({ open }: { open: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    {open ? (
      <path d="M4.5 4.5L13.5 13.5M13.5 4.5L4.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    ) : (
      <path d="M2.5 5H15.5M2.5 9H15.5M2.5 13H15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    )}
  </svg>
);

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <header className="ui-fixed ui-inset-x-0 ui-top-0 ui-z-40 ui-border-b ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg)]">
      <div className="ui-flex ui-h-16 ui-w-full ui-items-center ui-justify-between ui-px-4 sm:ui-px-6">
        <Link href="/" className="ui-flex ui-items-center ui-gap-2" onClick={() => setMobileOpen(false)}>
          <span className="ui-flex ui-h-7 ui-w-7 ui-shrink-0 ui-items-center ui-justify-center ui-rounded-[var(--ui-radius-md)] ui-bg-[var(--ui-primary)] ui-font-mono ui-text-[13px] ui-font-semibold ui-text-white ui-transition-colors">
            L
          </span>
          <span className="ui-font-semibold ui-text-[var(--ui-fg)]">Labanaat</span>
        </Link>
        <nav className="ui-hidden ui-items-center ui-gap-6 ui-text-[var(--ui-text-sm)] sm:ui-flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="ui-text-[var(--ui-fg-muted)] hover:ui-text-[var(--ui-fg)]">
              {link.label}
            </Link>
          ))}
          <a
            href="https://github.com/labanaat/labanaat-ui"
            className="ui-flex ui-items-center ui-gap-1.5 ui-text-[var(--ui-fg-muted)] hover:ui-text-[var(--ui-fg)]"
          >
            <Github size={15} />
            GitHub
          </a>
        </nav>
        <div className="ui-flex ui-items-center ui-gap-1 sm:ui-gap-2">
          <ColorPicker />
          <ThemeToggle />
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="ui-ml-1 ui-inline-flex ui-h-9 ui-w-9 ui-items-center ui-justify-center ui-rounded-[var(--ui-radius-md)] ui-text-[var(--ui-fg-muted)] hover:ui-bg-[var(--ui-bg-subtle)] hover:ui-text-[var(--ui-fg)] focus-visible:ui-outline-none focus-visible:ui-shadow-[var(--ui-focus-ring)] sm:ui-hidden"
          >
            <MenuIcon open={mobileOpen} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="ui-flex ui-flex-col ui-gap-1 ui-border-t ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg)] ui-px-4 ui-py-3 sm:ui-hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="ui-rounded-[var(--ui-radius-md)] ui-px-3 ui-py-2.5 ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg-muted)] hover:ui-bg-[var(--ui-bg-subtle)] hover:ui-text-[var(--ui-fg)]"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://github.com/labanaat/labanaat-ui"
            className="ui-flex ui-items-center ui-gap-1.5 ui-rounded-[var(--ui-radius-md)] ui-px-3 ui-py-2.5 ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg-muted)] hover:ui-bg-[var(--ui-bg-subtle)] hover:ui-text-[var(--ui-fg)]"
          >
            <Github size={15} />
            GitHub
          </a>
        </nav>
      )}
    </header>
  );
}
